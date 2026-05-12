# Guest Browsing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the "Skip for now" flow on the Auth page so unauthenticated visitors can browse Home / Learn / Course / Module pages, while protected actions (start lesson, take quiz, view progress, view review, open profile) prompt with a Sign in / Sign up toast.

**Architecture:** A shared `AuthPromptProvider` mounted at the app root owns a single Toast and exposes `showAuthPrompt(message)`. A `useRequireAuth()` hook returns `{ user, gate(action, message?) }` that runs the action when signed in or fires the prompt otherwise. Public routes render for everyone; protected routes wrap their element with a `<RequireAuth>` guard that calls `showAuthPrompt` and navigates to `/auth` for anon users. The `Toast` component is extended to support two inline actions (back-compat with existing single-action callers).

**Tech Stack:** React 18, react-router-dom v6, Vite, TypeScript, Tailwind, framer-motion. No test framework installed; verification is `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual browser checks.

---

## File Structure

**Create:**
- `src/context/AuthPromptContext.tsx` — provider + `useAuthPrompt` hook; owns single Toast instance
- `src/hooks/useRequireAuth.ts` — small hook returning `{ user, gate }`
- `src/components/auth/RequireAuth.tsx` — route guard for protected routes

**Modify:**
- `src/components/ui/Toast.tsx` — add optional `actions` prop (two-button support)
- `src/App.tsx` — wrap routes with `AuthPromptProvider`; remove `!user` route block; wrap protected routes in `RequireAuth`
- `src/pages/Auth.tsx` — read `?mode=signup` from URL on mount
- `src/pages/Home.tsx` — guest hero card; gate `Continue Learning` and `Practice Quiz` button
- `src/pages/CourseDetail.tsx` — gate "Full Practice Test" button
- `src/pages/ModuleDetail.tsx` — replace local `showAuthToast` state with `useRequireAuth().gate(...)`
- `src/pages/Lesson.tsx` — replace anon redirect-to-module logic with redirect-to-`/auth` via prompt
- `src/components/layout/BottomNav.tsx` — gate Practice / Review / Progress taps
- `src/components/layout/Layout.tsx` — replace signed-in-only avatar/gear with a "Sign in" pill for guests

**No changes needed:**
- `src/hooks/useProgress.ts` — already no-ops for anon users (line 88: `if (!user) return`); returns default-zero progress.
- `src/pages/Courses.tsx` — no protected actions; just renders `CourseCard`s.
- `src/pages/Progress.tsx`, `src/pages/WeakAreas.tsx`, `src/pages/PracticeTest.tsx`, `src/pages/Settings.tsx`, `src/pages/PlacementTest.tsx` — protected at the route level via `RequireAuth`.

---

## Task 1: Extend Toast with optional two-action support

**Files:**
- Modify: `src/components/ui/Toast.tsx`

The existing Toast supports one action via `actionLabel` + `actionPath`. We add an optional `actions` array for callers that need two buttons (Sign in / Sign up). Existing callers in `ModuleDetail.tsx` and `Lesson.tsx` keep working unchanged.

- [ ] **Step 1: Replace the `ToastProps` interface and component**

Open `src/components/ui/Toast.tsx` and replace the entire file contents with:

```tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export interface ToastAction {
  label: string
  path: string
}

interface ToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
  /** Single action (legacy). Use `actions` for multiple. */
  actionLabel?: string
  actionPath?: string
  /** Optional list of actions. If provided, overrides actionLabel/actionPath. */
  actions?: ToastAction[]
  duration?: number
}

export function Toast({
  message,
  visible,
  onDismiss,
  actionLabel,
  actionPath,
  actions,
  duration = 4000,
}: ToastProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onDismiss])

  const resolvedActions: ToastAction[] =
    actions && actions.length > 0
      ? actions
      : actionLabel && actionPath
      ? [{ label: actionLabel, path: actionPath }]
      : []

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <div className="bg-slate-900 dark:bg-slate-700 text-white rounded-xl px-4 py-3 shadow-lg flex items-center justify-between gap-3">
            <p className="text-sm font-medium flex-1">{message}</p>
            {resolvedActions.length > 0 && (
              <div className="flex items-center gap-2">
                {resolvedActions.map((a, i) => (
                  <button
                    key={`${a.label}-${i}`}
                    onClick={() => {
                      onDismiss()
                      navigate(a.path)
                    }}
                    className="text-sky-400 text-sm font-bold whitespace-nowrap touch-manipulation"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Existing callers (`ModuleDetail`, `Lesson`) still compile because the old props are still optional.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Toast.tsx
git commit -m "feat(toast): support multiple inline actions

Adds an optional 'actions' array prop alongside the existing
actionLabel/actionPath props (kept for back-compat). Enables
toasts like 'Sign in to continue' with both Sign in and Sign up
buttons."
```

---

## Task 2: AuthPromptContext — single source of truth for the auth toast

**Files:**
- Create: `src/context/AuthPromptContext.tsx`

A provider that owns a single Toast instance and exposes `showAuthPrompt(message)`. Mounted once near the app root.

- [ ] **Step 1: Create the file**

Create `src/context/AuthPromptContext.tsx`:

```tsx
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { Toast } from '../components/ui/Toast'

interface AuthPromptContextValue {
  /** Show the auth prompt toast with a context-specific message. */
  showAuthPrompt: (message?: string) => void
}

const AuthPromptContext = createContext<AuthPromptContextValue | null>(null)

const DEFAULT_MESSAGE = 'Sign in to keep your progress'

export function AuthPromptProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)

  const showAuthPrompt = useCallback((msg?: string) => {
    setMessage(msg ?? DEFAULT_MESSAGE)
    setVisible(true)
  }, [])

  const dismiss = useCallback(() => setVisible(false), [])

  return (
    <AuthPromptContext.Provider value={{ showAuthPrompt }}>
      {children}
      <Toast
        message={message}
        visible={visible}
        onDismiss={dismiss}
        actions={[
          { label: 'Sign In', path: '/auth' },
          { label: 'Sign Up', path: '/auth?mode=signup' },
        ]}
      />
    </AuthPromptContext.Provider>
  )
}

export function useAuthPrompt(): AuthPromptContextValue {
  const ctx = useContext(AuthPromptContext)
  if (!ctx) throw new Error('useAuthPrompt must be used within <AuthPromptProvider>')
  return ctx
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. (Provider isn't wired up yet — that happens in Task 4.)

- [ ] **Step 3: Commit**

```bash
git add src/context/AuthPromptContext.tsx
git commit -m "feat(auth): add AuthPromptProvider with shared sign-in toast

A single Toast instance lives near the app root and is triggered
via the useAuthPrompt() hook. Default message and two inline
actions (Sign In / Sign Up) give every prompt a consistent look."
```

---

## Task 3: useRequireAuth hook

**Files:**
- Create: `src/hooks/useRequireAuth.ts`

Tiny wrapper around `useAuth` + `useAuthPrompt`. Returns `{ user, gate }`.

- [ ] **Step 1: Create the file**

Create `src/hooks/useRequireAuth.ts`:

```ts
import { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAuthPrompt } from '../context/AuthPromptContext'

/**
 * Wrap protected click handlers. If the user is signed in, the action runs.
 * Otherwise the auth prompt toast appears with the given message.
 */
export function useRequireAuth() {
  const { user } = useAuth()
  const { showAuthPrompt } = useAuthPrompt()

  const gate = useCallback(
    (action: () => void, message?: string) => {
      if (user) action()
      else showAuthPrompt(message)
    },
    [user, showAuthPrompt]
  )

  return { user, gate }
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useRequireAuth.ts
git commit -m "feat(auth): add useRequireAuth().gate helper

Wraps protected click handlers — runs the action when signed in,
fires the shared auth prompt toast when not."
```

---

## Task 4: RequireAuth route guard component

**Files:**
- Create: `src/components/auth/RequireAuth.tsx`

A wrapper that renders its children when a user exists, otherwise fires the auth prompt on mount and navigates to `/auth`. Used for routes that should be inaccessible via direct URL to anon users.

- [ ] **Step 1: Create the directory and file**

Create `src/components/auth/RequireAuth.tsx`:

```tsx
import { useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAuthPrompt } from '../../context/AuthPromptContext'

interface RequireAuthProps {
  children: ReactNode
  /** Message to show in the auth prompt toast on redirect. */
  message?: string
}

/**
 * Route guard. If signed in, renders children. If not, fires the auth
 * prompt toast and redirects to /auth.
 */
export function RequireAuth({ children, message }: RequireAuthProps) {
  const { user } = useAuth()
  const { showAuthPrompt } = useAuthPrompt()

  useEffect(() => {
    if (!user) showAuthPrompt(message)
  }, [user, message, showAuthPrompt])

  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/auth/RequireAuth.tsx
git commit -m "feat(auth): add RequireAuth route guard

Routes wrapped in RequireAuth fire the shared auth prompt and
redirect to /auth when accessed by an anonymous user."
```

---

## Task 5: Wire AuthPromptProvider and update routing in App.tsx

**Files:**
- Modify: `src/App.tsx`

Wrap routes in `AuthPromptProvider`. Remove the blanket `!user` route block. Wrap each protected route element in `<RequireAuth>`.

- [ ] **Step 1: Update imports**

In `src/App.tsx`, add the following imports near the existing imports (top of file, after the existing `useAuth` import):

```tsx
import { AuthPromptProvider } from './context/AuthPromptContext'
import { RequireAuth } from './components/auth/RequireAuth'
```

- [ ] **Step 2: Remove the anon route block**

In `src/App.tsx`, locate lines 52-60:

```tsx
  // Not signed in — show auth page only
  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    )
  }
```

Delete that entire block (including the comment). The full route table below will now render for everyone.

- [ ] **Step 3: Wrap protected routes**

In `src/App.tsx`, replace the remaining `Routes` block (the "Signed in — show full app" block, now the only one) with:

```tsx
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Courses />} />
      <Route path="/learn/:courseId" element={<CourseDetail />} />
      <Route path="/learn/:courseId/modules/:moduleId" element={<ModuleDetail />} />
      <Route
        path="/learn/:courseId/modules/:moduleId/lessons/:lessonId"
        element={
          <RequireAuth message="Sign in to start lessons">
            <Lesson />
          </RequireAuth>
        }
      />
      <Route
        path="/practice"
        element={
          <RequireAuth message="Sign in to take practice quizzes">
            <PracticeTest />
          </RequireAuth>
        }
      />
      <Route
        path="/review"
        element={
          <RequireAuth message="Sign in to review weak areas">
            <WeakAreas />
          </RequireAuth>
        }
      />
      <Route
        path="/progress"
        element={
          <RequireAuth message="Sign in to track your progress">
            <Progress />
          </RequireAuth>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/placement"
        element={
          <RequireAuth message="Sign in to take the placement test">
            <PlacementTest />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth message="Sign in to access settings">
            <Settings />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
```

Also delete the comment line `// Signed in — show full app` that preceded this block.

- [ ] **Step 4: Wrap AppRoutes with AuthPromptProvider**

In `src/App.tsx`, replace the existing `App` root export at the bottom of the file:

```tsx
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Analytics />
      </AuthProvider>
      <SpeedInsights />
    </BrowserRouter>
  )
}
```

with:

```tsx
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthPromptProvider>
          <AppRoutes />
          <Analytics />
        </AuthPromptProvider>
      </AuthProvider>
      <SpeedInsights />
    </BrowserRouter>
  )
}
```

Order matters: `AuthProvider` wraps `AuthPromptProvider` because `useAuth` is consumed by `RequireAuth` which lives below `AuthPromptProvider`. Both must be inside `BrowserRouter` because Toast uses `useNavigate`.

- [ ] **Step 5: Type-check, lint, build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass. The app should compile cleanly.

- [ ] **Step 6: Manual smoke test**

```bash
npm run dev
```

Then in a browser:
- Open the dev URL — if you're signed out, you should land on `/auth`.
- Click "Skip for now — browse without an account".
- Expected: lands on Home (`/`). No redirect loop. Home renders (XP/Streak hero will still be the signed-in version at this point — guest hero comes in Task 7).
- Visit `/practice` directly — should redirect to `/auth` and show the toast "Sign in to take practice quizzes" with Sign In / Sign Up buttons.
- Visit `/progress` directly — same, with appropriate message.

Stop the dev server when done.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat(routing): allow anon browsing, guard protected routes

Removes the blanket redirect-everything-to-/auth guard. Anon
users can now reach /, /learn, /learn/:courseId, and
/learn/:courseId/modules/:moduleId. Lesson, practice, review,
progress, settings, and placement routes are wrapped in
RequireAuth, which fires the shared auth prompt and redirects
to /auth."
```

---

## Task 6: Support `?mode=signup` in Auth page

**Files:**
- Modify: `src/pages/Auth.tsx`

The toast's "Sign Up" action navigates to `/auth?mode=signup`. Make Auth read that param and initialize its mode accordingly.

- [ ] **Step 1: Add useSearchParams**

In `src/pages/Auth.tsx`, update the `react-router-dom` import on line 2:

```tsx
import { useNavigate, useSearchParams } from 'react-router-dom'
```

- [ ] **Step 2: Initialize mode from the URL**

In `src/pages/Auth.tsx`, replace the existing state init block (lines 11-14):

```tsx
  const { user, signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('signin')
```

with:

```tsx
  const { user, signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialMode: Mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  const [mode, setMode] = useState<Mode>(initialMode)
```

- [ ] **Step 3: Type-check, lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

- Open `/auth?mode=signup` directly — should land on the Sign Up tab (selected by default, password + confirm-password fields visible).
- Open `/auth` (no query) — should land on Sign In as before.

Stop the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Auth.tsx
git commit -m "feat(auth): honor ?mode=signup query param

Lets the auth-prompt toast link directly to the Sign Up tab via
/auth?mode=signup."
```

---

## Task 7: Guest hero card on Home

**Files:**
- Modify: `src/pages/Home.tsx`

Replace the XP/Level/Streak hero with a sign-up promo when there is no user. Also gate "Continue Learning" and the "Practice Quiz" CTA.

- [ ] **Step 1: Add auth imports and gate helper**

In `src/pages/Home.tsx`, replace the existing import block at lines 1-9:

```tsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { getTopWeakAreas, getCourseCompletion, getTodayDateString, getLiveStreak } from '../utils'
```

with:

```tsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { COURSES } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { getTopWeakAreas, getCourseCompletion, getTodayDateString, getLiveStreak } from '../utils'
```

- [ ] **Step 2: Use the hook inside the component**

In `src/pages/Home.tsx`, in the `Home` function, replace the existing line:

```tsx
  const navigate = useNavigate()
  const { progress } = useProgress()
```

with:

```tsx
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { user, gate } = useRequireAuth()
```

- [ ] **Step 3: Conditionally render the guest hero**

In `src/pages/Home.tsx`, find the `{/* Hero Card */}` section (currently lines 60-106 — a `motion.div` containing the XP/Level/Streak `Card`).

Replace the entire `{/* Hero Card */}` `motion.div variants={item}` block with this conditional version:

```tsx
        {/* Hero Card — guest promo or progress stats */}
        <motion.div variants={item}>
          {!user ? (
            <Card className="bg-gradient-to-br from-cadence-800 to-cadence-600 border-0 text-white" padding="lg">
              <div className="flex items-center gap-3">
                <div className="text-4xl">♩</div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-lg leading-tight">Track your progress</p>
                  <p className="text-cadence-100 text-sm mt-0.5">
                    Sign in to earn XP, build streaks, and resume lessons.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => navigate('/auth')}
                  className="flex-1 bg-white text-cadence-800 font-bold text-sm py-2.5 rounded-xl touch-manipulation"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="flex-1 bg-cadence-900/40 text-white border border-white/30 font-bold text-sm py-2.5 rounded-xl touch-manipulation"
                >
                  Sign Up
                </button>
              </div>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-cadence-800 to-cadence-600 border-0 text-white" padding="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cadence-100 text-sm font-medium">Total XP</p>
                  <p className="text-4xl font-black mt-0.5">{progress.totalXP}</p>
                </div>
                <div className="text-center">
                  <p className="text-cadence-100 text-sm font-medium">Level</p>
                  <p className="text-4xl font-black mt-0.5">{level}</p>
                </div>
                <div className="text-right">
                  <p className="text-cadence-100 text-sm font-medium">Streak</p>
                  <p className="text-4xl font-black mt-0.5">
                    {liveStreakCount}
                    <span className="text-lg font-normal text-cadence-200 ml-1">{liveStreakCount === 1 ? 'day' : 'days'}</span>
                  </p>
                </div>
              </div>
              {/* Daily Goal Bar */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-cadence-100 text-xs font-medium">
                    Daily goal: {dailyDone} of {dailyGoal} quizzes
                  </p>
                  {dailyDone >= dailyGoal && (
                    <span className="text-xs font-bold text-green-300">Done!</span>
                  )}
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${
                      dailyDone >= dailyGoal ? 'bg-green-400' : 'bg-white'
                    }`}
                    style={{ width: `${dailyPct}%` }}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${studiedToday ? 'bg-green-400' : 'bg-cadence-300'}`} />
                <p className="text-cadence-100 text-xs">
                  {studiedToday ? 'Studied today! Keep the streak going.' : 'Study today to keep your streak alive!'}
                </p>
              </div>
            </Card>
          )}
        </motion.div>
```

- [ ] **Step 4: Gate the Continue Learning click**

In `src/pages/Home.tsx`, find the Continue Learning `Card` (currently around line 114). Replace its `onClick` line:

```tsx
              onClick={() =>
                navigate(
                  `/learn/${nextLesson.course.id}/modules/${nextLesson.mod.id}/lessons/${nextLesson.lesson.id}`
                )
              }
```

with:

```tsx
              onClick={() =>
                gate(
                  () =>
                    navigate(
                      `/learn/${nextLesson.course.id}/modules/${nextLesson.mod.id}/lessons/${nextLesson.lesson.id}`
                    ),
                  'Sign in to start lessons'
                )
              }
```

- [ ] **Step 5: Gate the "Practice Quiz" button in the all-done state**

In `src/pages/Home.tsx`, find the all-done state button (currently around line 240):

```tsx
              <button
                onClick={() => navigate('/practice')}
                className="mt-4 bg-cadence-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm touch-manipulation"
              >
                Practice Quiz
              </button>
```

Replace its `onClick`:

```tsx
              <button
                onClick={() => gate(() => navigate('/practice'), 'Sign in to take practice quizzes')}
                className="mt-4 bg-cadence-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm touch-manipulation"
              >
                Practice Quiz
              </button>
```

- [ ] **Step 6: Type-check, lint, build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass.

- [ ] **Step 7: Manual smoke test**

```bash
npm run dev
```

In a browser:
- While signed out, go to `/` (Skip from `/auth` works for this too).
- Expected: guest hero card visible ("Track your progress — Sign in to earn XP…") with Sign In / Sign Up buttons that navigate to `/auth` and `/auth?mode=signup` respectively.
- Click the "Continue Learning" card (will be the first lesson of the first course since no progress).
- Expected: auth-prompt toast appears with "Sign in to start lessons" and Sign In / Sign Up actions. URL stays on `/`.
- Sign in (existing account). Return to `/`. Expected: original XP/Level/Streak hero is back.

Stop the dev server when done.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(home): guest hero promo + gate protected actions

Anon visitors see a sign-up promo card instead of the
XP/Level/Streak hero, and clicking 'Continue Learning' or
the all-done 'Practice Quiz' button fires the auth prompt
instead of navigating."
```

---

## Task 8: Gate "Full Practice Test" CTA on CourseDetail

**Files:**
- Modify: `src/pages/CourseDetail.tsx`

The Practice Test CTA on the course detail page navigates to `/practice`. Anon users need the auth prompt.

- [ ] **Step 1: Add the hook import and usage**

In `src/pages/CourseDetail.tsx`, after the existing `import { useProgress } ...` line, add:

```tsx
import { useRequireAuth } from '../hooks/useRequireAuth'
```

Inside the `CourseDetail` function, add the hook beside the existing `useProgress` call:

```tsx
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { gate } = useRequireAuth()
```

- [ ] **Step 2: Gate the Practice Test CTA**

In `src/pages/CourseDetail.tsx`, find the Practice Test CTA button (currently lines 52-67). Replace its `onClick`:

```tsx
          onClick={() => navigate('/practice')}
```

with:

```tsx
          onClick={() => gate(() => navigate('/practice'), 'Sign in to take practice quizzes')}
```

- [ ] **Step 3: Type-check, lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

In a browser (signed out):
- Navigate to `/learn/notation` (or any course id).
- Click "Full Practice Test".
- Expected: auth-prompt toast appears, URL stays on course detail.

Stop the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CourseDetail.tsx
git commit -m "feat(course-detail): gate Practice Test CTA for anon users"
```

---

## Task 9: Consolidate ModuleDetail to use the shared auth prompt

**Files:**
- Modify: `src/pages/ModuleDetail.tsx`

ModuleDetail currently has its own local `showAuthToast` state and Toast render. Replace it with the shared `useRequireAuth().gate(...)` pattern so all auth prompts look identical.

- [ ] **Step 1: Update imports**

In `src/pages/ModuleDetail.tsx`, replace these imports:

```tsx
import { useMemo, useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Badge } from '../components/ui/Badge'
import { Toast } from '../components/ui/Toast'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../context/AuthContext'
```

with:

```tsx
import { useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { Badge } from '../components/ui/Badge'
import { getCourseById } from '../data/courses'
import { useProgress } from '../hooks/useProgress'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { useAuthPrompt } from '../context/AuthPromptContext'
```

- [ ] **Step 2: Replace local auth-toast state with hook usage**

In `src/pages/ModuleDetail.tsx`, replace the existing state block (lines 14-20):

```tsx
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { progress } = useProgress()
  const [showAuthToast, setShowAuthToast] = useState(
    !!(location.state as { authRequired?: boolean } | null)?.authRequired
  )
  const dismissToast = useCallback(() => setShowAuthToast(false), [])
```

with:

```tsx
  const navigate = useNavigate()
  const location = useLocation()
  const { progress } = useProgress()
  const { gate } = useRequireAuth()
  const { showAuthPrompt } = useAuthPrompt()

  // Surface the prompt if we arrived here via a redirect that asked for auth.
  useEffect(() => {
    if ((location.state as { authRequired?: boolean } | null)?.authRequired) {
      showAuthPrompt('Sign in to start lessons')
    }
  }, [location.state, showAuthPrompt])
```

- [ ] **Step 3: Replace the lesson click handler**

In `src/pages/ModuleDetail.tsx`, find the lesson click handler (currently lines 117-120):

```tsx
                onClick={() => {
                  if (!user) { setShowAuthToast(true); return }
                  navigate(`/learn/${course.id}/modules/${mod.id}/lessons/${lesson.id}`)
                }}
```

Replace it with:

```tsx
                onClick={() =>
                  gate(
                    () => navigate(`/learn/${course.id}/modules/${mod.id}/lessons/${lesson.id}`),
                    'Sign in to start lessons'
                  )
                }
```

- [ ] **Step 4: Remove the local Toast render**

In `src/pages/ModuleDetail.tsx`, find and DELETE the entire `<Toast .../>` block at the bottom of the JSX (currently lines 155-161):

```tsx
      <Toast
        message="Sign in to start lessons and track your progress"
        visible={showAuthToast}
        onDismiss={dismissToast}
        actionLabel="Sign In"
        actionPath="/auth"
      />
```

The shared toast from `AuthPromptProvider` now handles this.

- [ ] **Step 5: Type-check, lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Unused-import warnings on `useAuth`, `Toast`, `useState`, `useCallback` would fail lint — they should already be removed above. If lint complains about an unused import, remove it.

- [ ] **Step 6: Manual smoke test**

```bash
npm run dev
```

In a browser (signed out):
- Navigate to `/learn/notation/modules/<some-module-id>`.
- Click a lesson.
- Expected: shared auth prompt toast appears with Sign In / Sign Up actions. URL stays on module page.
- Try the "Sign In" button in the toast — should land on `/auth` (signin mode).
- Hit back. Click a lesson again. This time hit "Sign Up" — should land on `/auth?mode=signup` (Sign Up tab selected).

Stop the dev server when done.

- [ ] **Step 7: Commit**

```bash
git add src/pages/ModuleDetail.tsx
git commit -m "refactor(module-detail): use shared auth prompt

Removes the page-local Toast in favor of the shared
AuthPromptProvider + useRequireAuth().gate pattern, so all
sign-in prompts in the app look and behave the same way."
```

---

## Task 10: Update Lesson page anon handling

**Files:**
- Modify: `src/pages/Lesson.tsx`

Currently Lesson has its own `if (!user) navigate(back-to-module)` effect. With `RequireAuth` now wrapping the route in App.tsx, Lesson should never see an anon user — but the existing redirect logic is now dead code. Remove it to keep the file honest.

- [ ] **Step 1: Inspect the current redirect**

In `src/pages/Lesson.tsx`, locate the effect around lines 49-54:

```tsx
  // Redirect anon users back to the module page
  useEffect(() => {
    if (!user) {
      navigate(`/learn/${courseId}/modules/${moduleId}`, { state: { authRequired: true } })
    }
  }, [user, courseId, moduleId, navigate])
```

Delete that entire effect, including the comment.

- [ ] **Step 2: Remove the now-unused `useAuth` if nothing else uses `user`**

In `src/pages/Lesson.tsx`, check whether `user` is referenced elsewhere in the file. Run:

```bash
grep -n "user" /Users/sarahokeefe/Documents/Workspace/cadence/src/pages/Lesson.tsx
```

If `user` is ONLY referenced in the destructuring (`const { user } = useAuth()`) and the deleted effect, then:
- Remove the line `const { user } = useAuth()`.
- Remove the import `import { useAuth } from '../context/AuthContext'`.

If `user` is used elsewhere (rare — likely just for progress writes which already gate on `user` internally), leave the import and destructuring in place and only remove the effect.

- [ ] **Step 3: Type-check, lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

In a browser (signed out):
- Try to visit `/learn/notation/modules/clefs-and-staff/lessons/intro-to-clefs` (or any valid lesson URL) directly.
- Expected: `RequireAuth` fires the auth prompt and redirects to `/auth`. URL ends at `/auth`. Toast visible.
- Sign in. Try the same URL again. Expected: Lesson renders normally.

Stop the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Lesson.tsx
git commit -m "chore(lesson): remove dead anon-user redirect

The route is now guarded by RequireAuth at the App level,
so the in-page redirect-to-module fallback can never run."
```

---

## Task 11: Gate Practice / Review / Progress in BottomNav

**Files:**
- Modify: `src/components/layout/BottomNav.tsx`

The bottom nav currently calls `navigate(tab.path)` for every tab. For anon users, Practice / Review / Progress should fire the auth prompt and stay on the current page.

- [ ] **Step 1: Replace the file**

Open `src/components/layout/BottomNav.tsx` and replace its contents with:

```tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useRequireAuth } from '../../hooks/useRequireAuth'

interface Tab {
  id: string
  label: string
  icon: string
  path: string
  authRequired?: boolean
  authMessage?: string
}

const tabs: readonly Tab[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'learn', label: 'Learn', icon: '📚', path: '/learn' },
  { id: 'practice', label: 'Practice', icon: '🎯', path: '/practice', authRequired: true, authMessage: 'Sign in to take practice quizzes' },
  { id: 'review', label: 'Review', icon: '🔄', path: '/review', authRequired: true, authMessage: 'Sign in to review weak areas' },
  { id: 'progress', label: 'Progress', icon: '📊', path: '/progress', authRequired: true, authMessage: 'Sign in to track your progress' },
] as const

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { gate } = useRequireAuth()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleTabClick = (tab: Tab) => {
    if (tab.authRequired) {
      gate(() => navigate(tab.path), tab.authMessage)
    } else {
      navigate(tab.path)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 safe-bottom">
      <div className="flex items-stretch max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path)
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-0.5
                min-h-[56px] py-2 px-1
                transition-colors duration-150
                touch-manipulation select-none
                ${active
                  ? 'text-cadence-800 dark:text-cadence-300'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }
              `}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
            >
              <span className={`text-xl leading-none transition-transform duration-150 ${active ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] font-medium leading-none ${active ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cadence-800 dark:bg-cadence-300 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Type-check, lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual smoke test**

```bash
npm run dev
```

In a browser (signed out):
- From Home, tap "Practice" in the bottom nav.
- Expected: auth prompt toast with "Sign in to take practice quizzes". URL stays at `/`.
- Tap "Review". Expected: toast with "Sign in to review weak areas". URL stays.
- Tap "Progress". Expected: toast with "Sign in to track your progress". URL stays.
- Tap "Home" and "Learn". Expected: navigation works normally, no prompt.

Sign in. Repeat the Practice/Review/Progress taps — they should navigate normally now.

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/BottomNav.tsx
git commit -m "feat(bottom-nav): gate Practice/Review/Progress for anon users

Tapping a protected tab now fires the shared auth prompt
instead of routing to /auth via the RequireAuth redirect.
Signed-in users see no change."
```

---

## Task 12: Header — replace avatar/gear with "Sign in" pill for guests

**Files:**
- Modify: `src/components/layout/Layout.tsx`

The header's right-side cluster (avatar circle + gear icon) renders only for signed-in users. For guests, show a single small "Sign in" pill in the same slot.

- [ ] **Step 1: Add the guest pill**

In `src/components/layout/Layout.tsx`, find the right-side header div (currently lines 51-93, the `<div className="flex items-center gap-1">` block).

Just inside that wrapper div, BEFORE the existing `{user && ( <button ... avatar ... /> )}` block, insert:

```tsx
            {!user && (
              <button
                onClick={() => navigate('/auth')}
                className="text-cadence-800 dark:text-cadence-300 bg-cadence-50 dark:bg-cadence-900/40 text-xs font-bold px-3 py-1.5 rounded-full touch-manipulation hover:bg-cadence-100 dark:hover:bg-cadence-900/60 transition-colors"
                aria-label="Sign in"
              >
                Sign in
              </button>
            )}
```

The existing avatar and gear buttons (already gated by `{user && ...}`) stay as-is. The dark mode toggle (last button in the cluster) stays as-is and shows for everyone.

- [ ] **Step 2: Type-check, lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual smoke test**

```bash
npm run dev
```

In a browser (signed out):
- Go to `/` (Home). Look at the header top-right.
- Expected: a small "Sign in" pill (cadence-colored). To its right, the dark-mode toggle. No avatar, no gear.
- Tap the pill. Expected: lands on `/auth`.
- Sign in. Go back to `/`. Expected: the pill is gone, the avatar circle (first letter of email) + gear icon are back.

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Layout.tsx
git commit -m "feat(layout): show 'Sign in' pill in header for guests

Replaces the (hidden) avatar + gear cluster with a single
cadence-colored Sign in pill that links to /auth."
```

---

## Task 13: Full end-to-end manual verification

No code changes — just confirm the whole feature works together. This is the same scenario list from the spec.

- [ ] **Step 1: Start dev server and clear any signed-in session**

```bash
npm run dev
```

In the browser, if a session is active, sign out via Settings, or open an Incognito window. You should land on `/auth`.

- [ ] **Step 2: Walk the checklist**

For each item, verify the behavior. If anything fails, note it and fix before continuing.

1. On `/auth`, click "Skip for now — browse without an account". → Lands on `/` (Home). No redirect loop.
2. Home renders the guest sign-up promo hero, topic grid shows all "Not started", no "Needs Review" section. No console errors.
3. Header top-right shows "Sign in" pill + dark-mode toggle. No avatar.
4. Click a topic card (e.g. Notation). → Navigates to `/learn/notation`.
5. Click a module in the course detail. → Navigates to `/learn/notation/modules/<id>`. Lesson list visible.
6. Click a lesson row. → Auth prompt toast appears with "Sign in to start lessons" + Sign In / Sign Up. URL unchanged.
7. Bottom nav: tap Practice. → Toast with practice-specific message. URL unchanged.
8. Bottom nav: tap Review. → Toast with review-specific message.
9. Bottom nav: tap Progress. → Toast with progress-specific message.
10. Header: tap "Sign in" pill. → Lands on `/auth` (signin mode).
11. Type `/practice` in the address bar and hit enter. → Redirected to `/auth`, toast visible with practice message.
12. Type `/progress` in the address bar. → Redirected to `/auth`, toast visible.
13. From a toast, tap "Sign Up". → Lands on `/auth?mode=signup` with Sign Up tab selected.
14. Sign in with an existing account. → After sign-in, lands on `/` with the normal signed-in hero (XP / Level / Streak).
15. Now signed in, repeat steps 6, 7, 8, 9 — each navigates to its destination, no toast.
16. Sign out via Settings. → Returned to `/auth` (or `/`, depending on existing sign-out flow). No crash. Browsing still works.

- [ ] **Step 3: Production build sanity check**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit (only if anything was fixed during verification)**

If you found and fixed issues during the walkthrough, commit them with a clear message. If everything passed first try, no commit needed for this task.

---

## Spec coverage check

| Spec section | Tasks covering it |
|---|---|
| Routing change (remove anon guard, public + protected routes) | Task 5 |
| `useRequireAuth` hook | Task 3 |
| `AuthPromptProvider` + shared toast | Task 2, Task 5 (wiring) |
| Toast extension (two actions) | Task 1 |
| Home guest hero replacement | Task 7 |
| Continue Learning gate | Task 7 |
| All-done Practice Quiz gate | Task 7 |
| CourseDetail Practice Test CTA gate | Task 8 |
| ModuleDetail consolidation | Task 9 |
| Lesson page anon handling | Task 10 |
| BottomNav gating | Task 11 |
| Header "Sign in" pill | Task 12 |
| Auth `?mode=signup` support | Task 6 |
| Out-of-scope items (desktop layout, airspace data) | Not included by design |
