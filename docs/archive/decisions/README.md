# Decisions Archive

Rolled-off entries from the root [`DECISIONS.md`](../../../DECISIONS.md). The
active file holds every **active** decision (any age); only superseded or obsolete
entries move here so the live log stays scannable, without losing the trail.

## Convention

- **Roll off by status, never by age:** only entries whose `Status` is
  `superseded` or `obsolete` are eligible. An `accepted` decision stays in the
  live file no matter how old — it may still be active law.
- **One file per period:** `docs/archive/decisions/<YYYY-QN>.md`
  (e.g. `2026-Q2.md`).
- **Append-only:** archive files are a historical record; don't rewrite them.
- **Source map:** every archive file is linked from the `## Archive` section of
  `DECISIONS.md`. That link list is the index — if it isn't linked there, it's
  effectively lost (repository-as-source-of-truth).
- **Keep cross-references resolvable:** when archiving a superseded entry, ensure
  the entry that supersedes it still resolves (point it at the archive file).

## When & how to roll off

Owned by `docs/VERIFICATION.md` → "Archiving Growing State Files" (threshold,
steps, source-map rule). This file only holds the archived periods.

## Archive index

_No periods archived yet. Each archived file is listed here and linked from
`DECISIONS.md` once it exists._
