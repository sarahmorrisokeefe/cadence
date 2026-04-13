import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
  actionLabel?: string
  actionPath?: string
  duration?: number
}

export function Toast({ message, visible, onDismiss, actionLabel, actionPath, duration = 4000 }: ToastProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onDismiss])

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
            {actionLabel && actionPath && (
              <button
                onClick={() => { onDismiss(); navigate(actionPath) }}
                className="text-sky-400 text-sm font-bold whitespace-nowrap touch-manipulation"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
