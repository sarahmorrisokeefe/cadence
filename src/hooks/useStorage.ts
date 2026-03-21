import { useState, useCallback, useEffect } from 'react'
import { Preferences } from '@capacitor/preferences'
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

/**
 * Cross-platform storage abstraction.
 * Uses Capacitor Preferences on native iOS/Android, localStorage on web.
 * All methods are async.
 */
export const storage = {
  get: async (key: string) => {
    if (isNative) {
      const { value } = await Preferences.get({ key })
      return value ? JSON.parse(value) : null
    }
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  set: async (key: string, value: unknown) => {
    if (isNative) {
      await Preferences.set({ key, value: JSON.stringify(value) })
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  remove: async (key: string) => {
    if (isNative) {
      await Preferences.remove({ key })
    } else {
      localStorage.removeItem(key)
    }
  },
}

/**
 * React hook backed by the cross-platform storage abstraction.
 * Initializes with initialValue, then loads persisted value asynchronously on mount.
 * The splash screen covers any brief flash before async load completes on native.
 */
export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Async load on mount
  useEffect(() => {
    storage.get(key).then((value) => {
      if (value !== null) {
        setStoredValue(value as T)
      }
    })
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore =
          typeof value === 'function'
            ? (value as (prev: T) => T)(prev)
            : value
        // Fire-and-forget async write
        void storage.set(key, valueToStore)
        return valueToStore
      })
    },
    [key]
  )

  const removeValue = useCallback(() => {
    void storage.remove(key)
    setStoredValue(initialValue)
  }, [key, initialValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return [storedValue, setValue, removeValue] as const
}
