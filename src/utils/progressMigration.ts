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
