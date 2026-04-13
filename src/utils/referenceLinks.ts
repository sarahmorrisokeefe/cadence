// ─── Reference Link Parser ─────────────────────────────────────────────────
// Converts music theory reference strings (e.g. "Music Theory Ch. 3",
// "Chord Theory Ch. 1") into display text. References in this app are
// informational labels rather than external URLs.

export interface ParsedReference {
  text: string
  url: string | null
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Parses a reference string into one or more {text, url} objects.
 * Handles compound references separated by " / ".
 * Returns url: null — references are displayed as plain text labels.
 */
export function parseReference(ref: string): ParsedReference[] {
  if (!ref?.trim()) return []

  return ref
    .split(' / ')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((segment) => ({
      text: segment,
      url: null,
    }))
}
