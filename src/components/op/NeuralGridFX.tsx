/**
 * Fixed full-viewport decorative overlay stack for the operator design:
 * animated grid, vignette, film grain, scanlines, and a slow scan bar.
 * Pure CSS (animations honor prefers-reduced-motion via globals.css).
 * Render once near the root. All layers are pointer-events:none.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function NeuralGridFX() {
  return (
    <>
      {/* grid */}
      <div
        aria-hidden
        data-op-grid
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.035) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'tm-grid 22s linear infinite',
        }}
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 30%, transparent 40%, rgba(7,8,10,0.7) 100%)',
        }}
      />
      {/* grain — gated to desktop: mix-blend-mode forces a full-viewport
          re-blend on every paint, which is the single costliest layer on
          throttled mobile. The texture is subtle (opacity 0.06), so dropping it
          on small screens is invisible in practice but frees the paint budget. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 hidden md:block"
        style={{ zIndex: 9999, opacity: 0.06, mixBlendMode: 'overlay', backgroundImage: GRAIN }}
      />
      {/* scanlines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 9997,
          opacity: 0.45,
          background:
            'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.22) 3px, transparent 4px)',
        }}
      />
      {/* scan bar */}
      <div
        aria-hidden
        data-op-scanbar
        className="pointer-events-none fixed right-0 left-0"
        style={{
          zIndex: 9996,
          top: '-160px',
          height: '160px',
          background: 'linear-gradient(180deg, transparent, rgba(0,229,255,0.045), transparent)',
          animation: 'tm-scan 8s linear infinite',
        }}
      />
    </>
  )
}
