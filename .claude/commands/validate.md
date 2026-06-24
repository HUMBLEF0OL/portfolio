# /validate

Invoke the validator agent to review code for the portfolio's convention compliance.

## Usage

```
/validate [files or description]
```

**Examples:**

- `/validate` — review all recently changed files
- `/validate src/block/Projects.tsx` — review a specific file
- `/validate the section I just scaffolded`

## What happens

The validator agent ([.claude/agents/validator.md](../agents/validator.md)) will:

1. Read shared and own memory for context
2. Run `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build`
3. Check portfolio conventions (`@/` imports, `cn()`, no `any`, no `console.log`,
   named exports, `next/image`, `@/i18n/navigation` wrappers, no hardcoded strings,
   all 3 locales in sync)
4. Produce a scored report (Convention / Quality / Security / Performance — 100 pts)
5. Output a pass/fail handoff block

## Scope

The validator checks **portfolio-specific conventions**. General logic correctness
and deep security review are handled by Superpowers' requesting-code-review.
