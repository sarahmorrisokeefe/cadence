# Cadence 🎵

A gamified, mobile-first music theory learning app — think Duolingo for musicians. Master intervals, chords, scales, and ear training through bite-sized lessons, instant feedback, and an XP/streak system that keeps you coming back.

---

## Features

- **4 Courses** — Fundamentals, Chord Theory, Scales & Modes, Ear Training (650 questions total)
- **Gamified progression** — XP rewards, streaks, locked modules, lesson completion confetti
- **Practice tests** — timed, full-length exams with per-topic score breakdowns
- **Weak areas tracker** — automatically surfaces topics where you miss the most questions
- **Dark mode** — system-aware with manual toggle, persisted across sessions
- **Offline-ready** — all data lives in `localStorage`; no backend required
- **Capacitor-compatible** — swap `localStorage` to Capacitor Preferences for native iOS/Android

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5.5 (strict) |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Celebration | canvas-confetti |
| Deployment | Vercel |

---

## Local Development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Install and Run

```bash
git clone https://github.com/sarahmorrisokeefe/cadence.git
cd cadence
npm install
npm run dev
```

The dev server starts at **http://localhost:5173** with hot-module reload.

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | TypeScript check + production build → `dist/` |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | ESLint check |

---

## Deploying to Vercel

### One-click (recommended)

1. Push the repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo
3. Vercel auto-detects Vite — no settings to change
4. Click **Deploy**

### CLI

```bash
npm i -g vercel
vercel --prod
```

The included `vercel.json` handles SPA routing (all paths rewrite to `index.html`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## iOS Development (Capacitor)

The app is fully configured for native iOS via Capacitor. All Capacitor packages are installed and `capacitor.config.ts` is committed. The `ios/` folder is gitignored and regenerated locally.

### First-time iOS setup

```bash
# 1. Install dependencies (already done if you ran npm install)
npm install

# 2. Build web assets + add iOS platform
npm run build
npx cap add ios

# 3. Open in Xcode
npm run ios:open
# → Select your Apple development team in Signing & Capabilities → Run
```

### Ongoing development workflow

```bash
# After any code changes:
npm run ios:build   # builds Vite + syncs to Xcode project

# Then in Xcode: Cmd+R to re-run on simulator/device
```

### What's included

| Feature | Implementation |
|---------|---------------|
| Storage | `@capacitor/preferences` on native, `localStorage` on web (auto-detected) |
| Status bar | Syncs with dark mode via `@capacitor/status-bar` |
| Keyboard | `@capacitor/keyboard` — resize body on keyboard show |
| Splash screen | `@capacitor/splash-screen` — indigo (#6366f1), 2s auto-hide |
| Safe areas | CSS `env(safe-area-inset-top/bottom)` on header + bottom nav |
| Native feel | `-webkit-user-select: none`, `-webkit-touch-callout: none` |
| Viewport | `viewport-fit=cover` for edge-to-edge on notched devices |

### App icon

Source icon is at `assets/icon.svg`. To generate the 1024x1024 PNG:

```bash
node scripts/generate-icon.js
# Follow the printed instructions (requires sharp or ImageMagick)

# Or use @capacitor/assets to generate all required sizes at once:
npx @capacitor/assets generate --ios
```

Then in Xcode: **Assets.xcassets → AppIcon → drag icon.png into the 1024x1024 slot.**

### Info.plist additions (do in Xcode)

Open `ios/App/App/Info.plist` and add:

```xml
<key>UIRequiresFullScreen</key>
<true/>
<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
</array>
```

See `TESTFLIGHT.md` for the full TestFlight submission checklist.

---

## Project Structure

```
src/
├── components/
│   ├── layout/        # Layout, BottomNav
│   ├── quiz/          # QuestionCard, FeedbackPanel
│   └── ui/            # Button, Card, ProgressBar, Badge, CourseCard
├── data/
│   ├── fundamentals.ts   # 150 questions (5 modules)
│   ├── chords.ts         # 200 questions (10 modules)
│   ├── scales.ts         # 160 questions (8 modules)
│   ├── earTraining.ts    # 140 questions (7 modules)
│   └── courses.ts        # Assembles all courses
├── hooks/
│   ├── useDarkMode.ts
│   ├── useProgress.ts
│   ├── useQuiz.ts
│   └── useStorage.ts
├── pages/
│   ├── Home.tsx
│   ├── Courses.tsx
│   ├── CourseDetail.tsx
│   ├── ModuleDetail.tsx
│   ├── Lesson.tsx
│   ├── PracticeTest.tsx
│   ├── WeakAreas.tsx
│   └── Progress.tsx
├── types/
│   └── index.ts          # Module, Lesson, Question, Course, UserProgress
└── utils/
    └── index.ts
```

---

## Adding Questions

Each question in `src/data/*.ts` follows this shape:

```typescript
{
  id: 'chords-m1-l1-q1',          // unique: course-module-lesson-question
  topic: 'Triads',
  type: 'multiple-choice',         // or 'true-false'
  text: 'What notes make up a C major triad?',
  options: ['C E G', 'C Eb G', 'C E G#', 'C D G'],
  correctAnswer: 0,                // 0-based index into options[]
  explanation: 'A major triad is built from a root, major third, and perfect fifth.',
  reference: 'Fundamentals Ch. 3'
}
```

---

## License

MIT
