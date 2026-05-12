# Aviation Data Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Detect accounts whose Supabase progress contains data from the old PilotPath build (aviation course IDs in `weakAreas`, `testResults`, or `courses`) and replace their progress with the default starting state on next load.

**Architecture:** A pure utility module (`src/utils/progressMigration.ts`) exposes `hasAviationData` and `sanitizeProgress`. `useProgress` calls `sanitizeProgress` at two points: the initial cached-state `useState` initializer (so we never render aviation data even if the localStorage cache is contaminated), and the post-Supabase-fetch effect (which also pushes the cleaned default back to Supabase so the data is permanently clean).

**Tech Stack:** React 18, TypeScript, Vite, Supabase JS client. No test framework — verification is `npx tsc --noEmit`, `npm run build`, and manual sign-in checks.

---

## File Structure

**Create:**
- `src/utils/progressMigration.ts` — two pure functions: `hasAviationData(progress, validCourseIds)` and `sanitizeProgress(progress, validCourseIds, defaultProgress)`.

**Modify:**
- `src/hooks/useProgress.ts` — import the helper + `COURSES`, derive a module-scope `validCourseIds` set, sanitize at the two invocation points described in the spec.

**No changes needed:**
- `src/types/index.ts` — no shape changes.
- `src/utils/index.ts` — keeping the migration helper separate (different responsibility from the existing display/format helpers).
- Pages (Home / WeakAreas / Progress) — they read `progress` through `useProgress`, which is now sanitized. No call-site changes.

---

## Task 1: Create the progressMigration utility

**Files:**
- Create: `src/utils/progressMigration.ts`

- [ ] **Step 1: Create the file with both functions**

Create `/Users/sarahokeefe/Documents/Workspace/cadence/src/utils/progressMigration.ts` with EXACTLY these contents:

```ts
import type { UserProgress } from '../types'

/**
 * Returns true if the progress object contains data tied to a course ID
 * that is not in the current valid set. Used to detect accounts left
 * behind by the rebrand from the prior PilotPath build.
 *
 * Detection is courseId-based only — question IDs are NOT used as a
 * signal, because content edits within a current course should not
 * trigger a wipe.
 */
export function hasAviationData(
  progress: UserProgress,
  validCourseIds: Set<string>
): boolean {
  for (const entry of Object.values(progress.weakAreas)) {
    if (!validCourseIds.has(entry.courseId)) return true
  }
  for (const result of progress.testResults) {
    if (!validCourseIds.has(result.courseId)) return true
  }
  for (const id of Object.keys(progress.courses)) {
    if (!validCourseIds.has(id)) return true
  }
  return false
}

/**
 * If the progress object is aviation-contaminated, returns the supplied
 * defaultProgress. Otherwise returns the input reference unchanged so
 * callers can use reference equality (`result !== input`) to detect
 * whether a wipe occurred.
 */
export function sanitizeProgress(
  progress: UserProgress,
  validCourseIds: Set<string>,
  defaultProgress: UserProgress
): UserProgress {
  return hasAviationData(progress, validCourseIds) ? defaultProgress : progress
}
```

- [ ] **Step 2: Verify type-check**

Run:
```bash
cd /Users/sarahokeefe/Documents/Workspace/cadence && npx tsc --noEmit
```

Expected: exit code 0, no errors. The new file imports only the existing `UserProgress` type — no other dependencies, so it compiles in isolation.

- [ ] **Step 3: Commit**

```bash
git add src/utils/progressMigration.ts
git commit -m "feat(utils): add aviation-data detection and sanitize helpers

Pure functions used by useProgress to detect accounts with data
tied to course IDs from the old PilotPath build, and replace their
progress with defaults on next load."
```

---

## Task 2: Wire sanitization into useProgress

**Files:**
- Modify: `src/hooks/useProgress.ts`

Read `/Users/sarahokeefe/Documents/Workspace/cadence/src/hooks/useProgress.ts` first to confirm current structure. Relevant landmarks:
- Imports at the top (around lines 1-7).
- `defaultProgress` constant declared in the file.
- `useProgress` function with a `useState` initializer (around lines 80-84) and a load `useEffect` (around lines 88-109).

- [ ] **Step 1: Add imports and the valid-course-ID set**

In `src/hooks/useProgress.ts`, locate the existing imports at the top of the file:

```ts
import { useCallback, useEffect, useState } from 'react'
import { useStorage } from './useStorage'
import type { UserProgress, Question, TestResult } from '../types'
import { getTodayDateString, isToday, isYesterday } from '../utils'
import { supabase, supabaseEnabled } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
```

Add the following two imports immediately after that block:

```ts
import { COURSES } from '../data/courses'
import { sanitizeProgress } from '../utils/progressMigration'
```

Then, just below the imports (above the `pushProgressToSupabase` function), add a module-scope constant:

```ts
const VALID_COURSE_IDS: Set<string> = new Set(COURSES.map((c) => c.id))
```

- [ ] **Step 2: Sanitize the initial cached state**

In `src/hooks/useProgress.ts`, locate the existing `useState` initializer (around lines 80-84):

```ts
  const [progress, setProgressState] = useState<UserProgress>({
    ...defaultProgress,
    ...cachedProgress,
    streak: { ...defaultProgress.streak, ...cachedProgress.streak },
  })
```

Replace with a lazy initializer that also sanitizes:

```ts
  const [progress, setProgressState] = useState<UserProgress>(() => {
    const merged = {
      ...defaultProgress,
      ...cachedProgress,
      streak: { ...defaultProgress.streak, ...cachedProgress.streak },
    }
    return sanitizeProgress(merged, VALID_COURSE_IDS, defaultProgress)
  })
```

This converts the eager object literal to a lazy function form so the merge + sanitize only run once on mount, not on every render.

- [ ] **Step 3: Sanitize the remote load and push back if cleaned**

In `src/hooks/useProgress.ts`, locate the `load` async function inside the `useEffect` (currently around lines 92-105):

```ts
    async function load() {
      const remote = await fetchProgressFromSupabase(user!.id)
      if (cancelled) return
      if (remote) {
        const merged = {
          ...defaultProgress,
          ...remote,
          streak: { ...defaultProgress.streak, ...remote.streak },
        }
        setProgressState(merged)
        setCachedProgress(merged) // update local cache
      }
      setLoaded(true)
    }
```

Replace with:

```ts
    async function load() {
      const remote = await fetchProgressFromSupabase(user!.id)
      if (cancelled) return
      if (remote) {
        const merged = {
          ...defaultProgress,
          ...remote,
          streak: { ...defaultProgress.streak, ...remote.streak },
        }
        const sanitized = sanitizeProgress(merged, VALID_COURSE_IDS, defaultProgress)
        setProgressState(sanitized)
        setCachedProgress(sanitized) // update local cache
        if (sanitized !== merged) {
          // Aviation contamination detected — push the cleaned default
          // back to Supabase so the account is permanently clean.
          pushProgressToSupabase(user!.id, sanitized).catch(() => {
            // Offline — next successful write will complete the cleanup.
          })
        }
      }
      setLoaded(true)
    }
```

The `sanitized !== merged` reference check works because `sanitizeProgress` either returns `defaultProgress` (different reference) or returns its input (same reference). No defensive cloning needed.

- [ ] **Step 4: Verify type-check and build**

Run:
```bash
cd /Users/sarahokeefe/Documents/Workspace/cadence && npx tsc --noEmit && npm run build
```

Expected: `tsc` exits 0, `vite build` succeeds (vexflow chunk-size warning is pre-existing and unrelated).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useProgress.ts
git commit -m "feat(progress): wipe aviation-contaminated accounts on load

Calls sanitizeProgress at two points in useProgress: the initial
cached-state initializer (prevents flash of stale data while
Supabase loads) and the post-fetch effect (pushes the cleaned
default back to Supabase). Accounts with no aviation data pass
through unchanged."
```

---

## Task 3: End-to-end manual verification

No code changes — confirm the cleanup works in the running app.

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/sarahokeefe/Documents/Workspace/cadence && npm run dev
```

- [ ] **Step 2: Verify the contaminated account is wiped**

In a browser, sign in with the account that previously showed "3 topics to review: Airspace, Airspace, Airspace".

Confirm each of the following:

- Home hero shows `Total XP: 0`, `Level: 1`, `Streak: 0 days`.
- Daily goal bar reads `0 of 3 quizzes`.
- "Continue Learning" card points to the very first lesson (no prior progress).
- All topic cards in the grid show "Not started".
- No "Needs Review" section renders.
- Tap the Review tab — empty state ("Nothing to review yet" or equivalent — no aviation questions listed).
- Tap the Progress tab — no Recent Tests entries.
- Hard-refresh the page (Cmd+Shift+R). State remains clean — confirms the Supabase write back happened.

- [ ] **Step 3: Verify clean accounts are unaffected**

Sign out and either:
- (a) Sign in with a different account that has only music-theory progress, OR
- (b) Use "Skip for now" to browse as a guest, then sign up a brand-new test account and complete one lesson to seed valid progress.

Confirm:
- Existing music-theory progress is preserved (XP, streak, completed lessons all intact for option a).
- For option b: complete a lesson → XP/streak increment normally → refresh → state persists.
- No errors in the browser console related to progress loading.

- [ ] **Step 4: Production build sanity check**

Stop the dev server.

```bash
cd /Users/sarahokeefe/Documents/Workspace/cadence && npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit (only if anything was fixed during verification)**

If everything passed first try, no commit needed. If you found and fixed an issue, commit it now with a clear message describing what was wrong and how you fixed it.

---

## Spec coverage check

| Spec section | Task |
|---|---|
| Detection criteria (weakAreas / testResults / courses courseId mismatch) | Task 1 |
| `hasAviationData` and `sanitizeProgress` helpers | Task 1 |
| Sanitize the initial cached state | Task 2, Step 2 |
| Sanitize after Supabase fetch + push back when contaminated | Task 2, Step 3 |
| Reference-equality detection of wipe | Task 2, Step 3 |
| `validCourseIds` derived from `COURSES.map(c => c.id)` | Task 2, Step 1 |
| Manual verification of contaminated + clean accounts | Task 3 |
