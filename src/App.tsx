import { useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Home } from './pages/Home'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { ModuleDetail } from './pages/ModuleDetail'
import { Lesson } from './pages/Lesson'
import { PracticeTest } from './pages/PracticeTest'
import { WeakAreas } from './pages/WeakAreas'
import { Progress } from './pages/Progress'
import { Auth } from './pages/Auth'
import { Settings } from './pages/Settings'
import { PlacementTest } from './pages/PlacementTest'
import { useDarkMode } from './hooks/useDarkMode'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AuthPromptProvider } from './context/AuthPromptContext'
import { RequireAuth } from './components/auth/RequireAuth'

// ─── Routes ─────────────────────────────────────────────────────────────────

function AppRoutes() {
  const { loading } = useAuth()
  const { isDark } = useDarkMode()

  // Add platform class so CSS can target native-only styles
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      document.body.classList.add('cap-native')
    }
  }, [])

  // Sync iOS status bar style with dark mode
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    StatusBar.setStyle({ style: isDark ? Style.Light : Style.Dark }).catch(() => {})
  }, [isDark])

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ff] dark:bg-[#0d0f1f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-copper-500 mb-2">♩</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

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
}

// ─── Root ────────────────────────────────────────────────────────────────────

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
