# /scaffold

Invoke the scaffold agent to generate a new page section or component following the portfolio's conventions.

## Usage

```
/scaffold <description>
```

**Examples:**

- `/scaffold a Testimonials section with translated heading and cards`
- `/scaffold a Tooltip UI component`
- `/scaffold a data-driven Awards section reading src/data/awards.json`

## What happens

The scaffold agent ([.claude/agents/scaffold.md](../agents/scaffold.md)) will:

1. Read shared and own memory for context
2. Fetch current library docs via context7 MCP for any libraries involved
3. Add translation keys to all 12 `messages/*` files (`add-translations`)
4. Generate the section/component using the matching skill pattern (`add-section`,
   `add-shadcn-ui`, `components`, `design-tokens`)
5. Compose it into `src/app/[locale]/page.tsx`; add `generateMetadata` if a new route
6. Generate tests
7. Output a handoff block for the validator agent

## After scaffolding

Run `/validate` to check convention compliance on the generated files.
