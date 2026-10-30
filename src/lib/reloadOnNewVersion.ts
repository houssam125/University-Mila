// Each deployment renames the page files. A tab opened before a new deployment still asks
// for the old names, which no longer exist; reloading once fetches the new version.

const RELOAD_KEY = 'reloaded-for-new-version-at'
const RELOAD_WINDOW_MS = 10_000

/** True when the error means a page file from an older deployment could not be loaded */
export function isOutdatedFileError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  return /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload/i.test(
    message,
  )
}

/** False if the page was already reloaded for this moments ago (to avoid a reload loop) */
export function canReloadNow() {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY))
    return !last || Date.now() - last >= RELOAD_WINDOW_MS
  } catch {
    // Storage can be blocked (private mode); reloading is still the best option
    return true
  }
}

export function reloadNow() {
  try {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  } catch {
    // See canReloadNow
  }
  window.location.reload()
}
