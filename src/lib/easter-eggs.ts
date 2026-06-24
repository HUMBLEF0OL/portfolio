/**
 * Shared gate for all site easter eggs.
 *
 * Eggs are ON by default. Set `NEXT_PUBLIC_EASTER_EGGS` to `false`, `0`, or
 * `off` to disable every egg at once. Each egg (and the Header logo combo)
 * checks `EASTER_EGGS_ENABLED` before doing anything.
 */
export const EASTER_EGGS_ENABLED = !['false', '0', 'off'].includes(
  (process.env.NEXT_PUBLIC_EASTER_EGGS ?? '').toLowerCase()
)

/** Dispatched by the Header logo when clicked 5x rapidly. */
export const LOGO_COMBO_EVENT = 'easteregg:logo'
