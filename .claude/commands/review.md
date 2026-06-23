# /review

Run a full code review on recent changes or specified files. Combines portfolio convention checks (validator agent) with automated tooling.

## Usage

```
/review [files or PR description]
```

**Examples:**

- `/review` — review all uncommitted changes
- `/review src/block/` — review a specific directory
- `/review the SEO module`

## What happens

1. Runs the validator agent ([.claude/agents/validator.md](../agents/validator.md)) for portfolio-specific checks
2. Executes `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build`
3. Produces a scored report (0–100) across Convention / Quality / Security / Performance
4. Optionally posts inline review comments via GitHub MCP if reviewing a PR

## Review scope

| Check                                                       | Owner                               |
| ---------------------------------------------------------- | ----------------------------------- |
| `@/` imports, `cn()`, no `any`, named exports, i18n parity | Validator agent                     |
| `npm run lint`                                             | ESLint                              |
| `npm run typecheck`                                        | TypeScript                          |
| `npm run test:run`                                         | Vitest                              |
| `npm run build`                                            | Next.js                             |
| General logic, security, performance                       | Superpowers' requesting-code-review |
