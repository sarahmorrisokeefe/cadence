# Guest Browsing — Design Spec

**Date:** 2026-05-12
**Status:** Proposed

## Problem

The "Skip for now — browse without an account" button on the [Auth page](../../../src/pages/Auth.tsx) reloads instead of entering the app. The recent commit `9fb44e1 feat(cadence): require authentication to use app` added a route guard in [App.tsx:53-60](../../../src/App.tsx#L53-L60) that redirects every path back to `/auth` when there is no signed-in user — so `navigate('/')` from the skip button bounces straight back. The button is now dead UI.

## Goal

Let unauthenticated visitors explore the app's structure and content (home, course list, course → module navigation) so they can decide whether to sign up. Block actions that require persistent state (starting a lesson, taking a quiz, viewing progress/review, opening profile/settings) behind a friendly toast prompt with inline "Sign in" / "Sign up" actions.

## Non-goals

- Persisting any guest progress (XP, streaks, quiz history). Guest sessions are read-only browsing.
- Reworking desktop layout (tracked separately).
- Cleaning up airspace data leaking from the old aviation app (tracked separately).
- Email-link magic auth, OAuth providers, or any new auth flows.

## High-level approach

1. Remove the blanket "redirect everything to /auth" guard. Render the full route table for everyone, signed-in or not.
2. Add a `useRequireAuth()` hook that returns a `gate(action)` function. Signed-in callers run `action` directly; signed-out callers see a toast with Sign in / Sign up actions.
3. Wrap protected click handlers with `gate(...)`. For protected *routes* visited directly via URL, render a redirect-to-`/auth` component that fires the same toast on mount.
4. Give the Home page a guest-specific hero card that pitches sign-up instead of showing 0 XP / Level 1 / 0 streak.
5. Show the avatar + settings buttons in the header for guests as a single "Sign in" pill that links to `/auth`.

## Routing changes — [src/App.tsx](../../../src/App.tsx)

Delete the `if (!user)` block (lines 53-60). The route table below becomes the only one and is rendered for all users:

| Path | Component | Auth required to render? |
|---|---|---|
| `/` | `Home` | No |
| `/learn` | `Courses` | No |
| `/learn/:courseId` | `CourseDetail` | No |
| `/learn/:courseId/modules/:moduleId` | `ModuleDetail` | No |
| `/auth` | `Auth` | No |
| `/learn/:courseId/modules/:moduleId/lessons/:lessonId` | `Lesson` | **Yes** |
| `/practice` | `PracticeTest` | **Yes** |
| `/review` | `WeakAreas` | **Yes** |
| `/progress` | `Progress` | **Yes** |
| `/settings` | `Settings` | **Yes** |
| `/placement` | `PlacementTest` | **Yes** |
| `*` | `<Navigate to="/" replace />` | No |

For auth-required routes, wrap the element in a `<RequireAuth>` component (new). When `user` is null, `RequireAuth` calls `gate(...)` via the same hook (so the toast appears) and renders `<Navigate to="/auth" replace />`. When `user` is present, it renders its children.

The `loading` spinner branch in `AppRoutes` stays as-is.

## New: `useRequireAuth` hook — `src/hooks/useRequireAuth.ts`

```ts
// Pseudocode shape
function useRequireAuth() {
  const { user } = useAuth()
  const { showAuthPrompt } = useAuthPrompt() // toast context, see below
  return {
    user,
    gate: (action: () => void, message?: string) => {
      if (user) action()
      else showAuthPrompt(message ?? 'Sign in to keep your progress')
    },
  }
}
```

The `gate` wrapper is the only API callers need. Default message is generic; pages pass a context-specific one (e.g. "Sign in to start lessons", "Sign in to track your progress").

## New: `AuthPromptProvider` — `src/context/AuthPromptContext.tsx`

A toast lives near the app root so any page can trigger it without juggling its own state. The provider exposes `showAuthPrompt(message)` and renders a single `<Toast>` with two inline actions: **Sign in** → `/auth` (signin mode), **Sign up** → `/auth?mode=signup`. Wrap `<AppRoutes />` inside `<AuthPromptProvider>` in `App.tsx`.

Auth page already supports `signin` and `signup` modes via state; we extend [Auth.tsx](../../../src/pages/Auth.tsx) to read `?mode=signup` from the URL on mount and set initial mode accordingly.

## Toast component — [src/components/ui/Toast.tsx](../../../src/components/ui/Toast.tsx)

Current Toast supports a single `actionLabel` + `actionPath`. Extend it to optionally accept an `actions: { label: string; path: string }[]` array (rendered as multiple buttons separated by a thin divider). Keep the existing `actionLabel`/`actionPath` props for backward compatibility with the two existing callers in `ModuleDetail` and `Lesson`.

Layout sketch:
```
┌──────────────────────────────────────────────┐
│ Sign in to start lessons    Sign in │ Sign up │
└──────────────────────────────────────────────┘
```

## Per-page gating

### [Home.tsx](../../../src/pages/Home.tsx)
- Replace the Hero Card (lines 60-106) for guest users with a **sign-in promo card**: same gradient styling, content like "♩ Track your progress — sign in to earn XP, build streaks, and resume lessons" with "Sign in" + "Sign up" buttons inline.
- "Continue Learning" card (lines 109-145): wrap `onClick` with `gate`. For a guest, no lesson is "in progress" so we show the first lesson of the first course as the suggested start — clicking triggers the auth prompt rather than navigating.
- Topic cards (lines 161-198): leave as-is — these go to `/learn/:courseId`, which is browsable.
- "Needs Review" card (lines 202-229): won't render for guests (no weak areas exist) — no change needed.
- "All done state" "Practice Quiz" button (lines 240-245): wrap with `gate`. Guests effectively never see this branch (no progress), but defend in depth.

### [Courses.tsx](../../../src/pages/Courses.tsx), [CourseDetail.tsx](../../../src/pages/CourseDetail.tsx), [ModuleDetail.tsx](../../../src/pages/ModuleDetail.tsx)
- Course list and course/module browsing remain accessible.
- Inside `ModuleDetail`, the lesson-row click handler must be wrapped with `gate('Sign in to start lessons')`.
- Any existing "next lesson" CTA buttons inside CourseDetail/ModuleDetail follow the same rule.

### [BottomNav.tsx](../../../src/components/layout/BottomNav.tsx)
- Home and Learn tabs: stay normal.
- Practice, Review, Progress tabs: when guest taps, call `gate('Sign in to <do this>')` instead of navigating. Use a per-tab message. Tab still renders so the user knows the feature exists; clicking just prompts.

### [Layout.tsx](../../../src/components/layout/Layout.tsx) header
- Current header shows avatar + gear icon for signed-in users only.
- For guests, render a single small "Sign in" pill where the avatar would go, linking to `/auth`. No gear icon (settings is auth-only anyway).

### [Auth.tsx](../../../src/pages/Auth.tsx)
- Read `?mode=signup` from the URL on mount and initialize `mode` state accordingly.
- The existing "Skip for now" button at the bottom keeps `navigate('/')`. With the routing change, that now lands on Home as a guest. No code change to the button itself other than confirming it works.

## Data / hook safety check

[useProgress](../../../src/hooks/useProgress.ts) is used by Home and elsewhere. It needs to return a sensible empty/default `progress` object when there is no signed-in user (no Supabase fetch, no write attempts). If it already does, no change. If it currently assumes a user, add an early return that yields a default-zero `progress` object and a no-op setter. Verify before relying on it.

Same check for any other hook touched by browsable pages (`useDailyGoal`, etc., if they read or write Supabase).

## Testing

Manual checks (browser):
1. Open `/auth` → click "Skip for now" → lands on `/` (Home), no redirect loop.
2. Home renders the sign-in promo hero, the topic grid, no "Needs Review" section. No console errors.
3. Click a topic card → `/learn/:courseId` loads.
4. Click a module → `/learn/:courseId/modules/:moduleId` loads with lesson list.
5. Click a lesson row → toast appears with Sign in / Sign up actions; URL stays on module page.
6. Tap Practice / Review / Progress in bottom nav → toast appears, URL doesn't change.
7. Tap "Sign in" pill in header → lands on `/auth` signin mode.
8. Visit `/practice` directly via URL → redirected to `/auth`, toast shown.
9. Visit `/progress` directly via URL → redirected to `/auth`, toast shown.
10. Sign in via the toast's "Sign in" or "Sign up" button → after auth, lands on the protected destination's natural starting page.
11. Sign out from Settings (signed-in flow) → back to guest browsing, no crash.

## Out of scope (tracked separately by user)

- Desktop layout: too much whitespace, looks like mobile design on desktop.
- Aviation/airspace data leaking through `useProgress` for accounts that used the prior PilotPath build. Affects "Needs Review" on Home and the Review tab.
