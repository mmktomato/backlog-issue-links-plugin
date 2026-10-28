# AGENTS.md

A Claude plugin (mod) that links Backlog issue keys in Claude's replies.

## Layout

- `hooks/register.ts`
    - The hooks module. A `ui.render` hook on `AssistantMessage` rewrites the text.
- `hooks/register.test.tsx`
    - Tests, run by `claude plugin test`.
- `.claude-plugin/types/`
    - Types written by Claude Code when it loads the plugin. Git-ignored.

## Commands

```sh
npm install
npm run typecheck
npm test
claude plugin validate .
```

## Rules

- Issue keys match `[A-Z0-9_]+-[0-9]+`.
- Keys inside code fences, code spans, links and URLs are left as they are, following CommonMark.
- With `BACKLOG_PREFIX` unset or empty, the plugin does nothing.
- Add a test for every change to the matching rules.
