# Aviation Data Cleanup — Design Spec

**Date:** 2026-05-12
**Status:** Proposed

## Problem

Accounts created during the prior PilotPath (flight training) build have stale aviation data in their `UserProgress` object. The most visible symptom is the "Needs Review" card on Home showing `3 topics to review: Airspace, Airspace, Airspace`, and the Review tab listing three aviation questions ("Class E airspace…", "Class G airspace at night…", "ADIZ…"). The stale data also includes test results with aviation course IDs and orphaned `progress.courses` entries that contribute to `totalXP`.

The data is keyed by IDs from the old aviation course catalog. Current course IDs are music-theory only: `notation-basics`, `rhythm-and-meter`, `scales-and-keys`, `intervals`, `chords`. Anything else in the progress object is leftover.

## Goal

Detect aviation-contaminated accounts at load time and reset their progress to the default starting state. The data is wiped permanently — the next Supabase sync writes back a clean object.

## Non-goals

- Per-entry filtering. The user wants a full reset; preserving partial state across the music-theory rebrand is not desired.
- Migrating aviation data to music-theory equivalents (impossible — different subject area).
- Tracking which accounts were affected for analytics or audit.
- Preserving streak, XP, or any other derived data across the wipe. A full nuke means a full nuke.
- A user-facing reset button in Settings (out of scope; this fix is automatic).

## Detection criteria

An account is **aviation-contaminated** if **any** of the following hold:

1. `progress.weakAreas` contains an entry whose `courseId` is not in the current valid course-ID set.
2. `progress.testResults` contains an entry whose `courseId` is not in the current valid course-ID set.
3. `progress.courses` has a key that is not in the current valid course-ID set.

The valid set is derived once from `COURSES.map(c => c.id)` — a `Set<string>`.

Question IDs are **not** used as a contamination signal: question content can legitimately churn within a current course (typos fixed, questions reworded), and we don't want routine content edits to wipe valid progress.

## Cleanup behavior

When an account is detected as contaminated:

- Replace the entire `UserProgress` object with `defaultProgress` (already exported from [src/hooks/useProgress.ts](../../../src/hooks/useProgress.ts)).
- This resets: `courses: {}`, `weakAreas: {}`, `testResults: []`, `totalXP: 0`, `streak: { current: 0, longest: 0, lastStudied: null }`, `lastActivity: null`, `badges: []`, `dailyGoal: 3`, `dailyGoalProgress: 0`, `dailyGoalDate: null`, `level: 1`. `placementResult` (if present) is also dropped because `defaultProgress` doesn't include it.

## Where the cleanup runs

Two invocation points in [src/hooks/useProgress.ts](../../../src/hooks/useProgress.ts), both calling the same `sanitizeProgress` helper:

1. **Initial cached state** — the `useState` initializer that currently merges `cachedProgress` from localStorage. Sanitize before merging so the very first render doesn't show aviation data if the local cache happens to be contaminated. (Important on mobile/PWA where Supabase fetch may lag.)

2. **Remote load `useEffect`** — after `fetchProgressFromSupabase` returns a non-null result, sanitize. If the result changed (i.e. it was contaminated), `pushProgressToSupabase` is called with the cleaned object so the database is permanently clean. If the result was already clean, no extra write.

## Implementation

### New file: `src/utils/progressMigration.ts`

```ts
import type { UserProgress } from '../types'

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

export function sanitizeProgress(
  progress: UserProgress,
  validCourseIds: Set<string>,
  defaultProgress: UserProgress
): UserProgress {
  return hasAviationData(progress, validCourseIds) ? defaultProgress : progress
}
```

Pure functions, no side effects, easy to reason about.

### Modified: `src/hooks/useProgress.ts`

1. Import `sanitizeProgress` and `COURSES`.
2. Build `validCourseIds = new Set(COURSES.map(c => c.id))` at module scope (top-level constant, computed once).
3. The `useState` initializer becomes:
   ```ts
   const [progress, setProgressState] = useState<UserProgress>(() => {
     const merged = {
       ...defaultProgress,
       ...cachedProgress,
       streak: { ...defaultProgress.streak, ...cachedProgress.streak },
     }
     return sanitizeProgress(merged, validCourseIds, defaultProgress)
   })
   ```
4. In the load `useEffect`, after `fetchProgressFromSupabase` returns a non-null `remote`:
   ```ts
   const merged = { ...defaultProgress, ...remote, streak: { ...defaultProgress.streak, ...remote.streak } }
   const sanitized = sanitizeProgress(merged, validCourseIds, defaultProgress)
   setProgressState(sanitized)
   setCachedProgress(sanitized)
   if (sanitized !== merged) {
     // contamination was detected — push the cleaned default back to Supabase
     pushProgressToSupabase(user!.id, sanitized).catch(() => {})
   }
   ```

The `sanitized !== merged` reference check works because `sanitizeProgress` returns either the input reference or `defaultProgress` — no defensive cloning needed.

## Edge cases

- **Offline / no auth:** The `useState` initializer still sanitizes the cache, so an offline contaminated user sees a clean state. When they next sign in and Supabase loads, the cleanup writes back.
- **Supabase write fails:** The `.catch(() => {})` matches the existing pattern in `pushProgressToSupabase`. Local state is already clean; next successful write completes the cleanup.
- **Mid-session course removal:** If we ever remove a course from `COURSES` (e.g., retire `intervals`), all existing accounts would suddenly be detected as contaminated. **Mitigation:** treat this as a known constraint. If we ever remove a course, the migration would need to be updated or we'd accept the wipe. Not adding hidden grandfathering logic now.
- **Valid users:** Unaffected — `sanitizeProgress` returns the input reference unchanged, no Supabase write triggered.

## Testing

No test framework installed. Verification is manual:

1. Sign in with the existing aviation-contaminated account.
   - Home should show 0 XP, Level 1, 0 streak, all topics "Not started", no Needs Review section.
   - Review tab should show the empty state.
   - Progress tab should have no Recent Tests entries.
   - Refresh → state remains clean (Supabase is now clean).
2. Sign out and sign in with a fresh test account or guest browse → no behavior change vs. main.
3. Complete a music theory lesson → XP and streak start counting normally.
4. `npx tsc --noEmit` and `npm run build` must pass.

## Files changed

- Create: `src/utils/progressMigration.ts`
- Modify: `src/hooks/useProgress.ts`

Two-file diff. Minimal surface area.
