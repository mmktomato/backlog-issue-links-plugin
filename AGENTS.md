# AGENTS.md

A Claude plugin (mod) that links Backlog issue keys in Claude's replies.

## Layout

- `hooks/register.ts`
    - The hooks module. A `ui.render` hook on `AssistantMessage` rewrites the text.
- `hooks/register.test.tsx`
    - Tests, run by `claude plugin test`.
- `.claude-plugin/types/`
    - Types written by Claude Code when it loads the plugin. Git-ignored.

## Development setup

Clone this repository:

```sh
git clone git@github.com:mmktomato/backlog-issue-links-plugin.git
```

Then add the following to the `env` block of `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_PLUGIN_DIRS": "/path/to/backlog-issue-links-plugin",
    "BACKLOG_PREFIX": "https://example.backlog.com"
  }
}
```

- `CLAUDE_CODE_PLUGIN_DIRS`
    - The absolute path of the cloned folder. `~` is allowed.
    - To load several plugin folders, separate them with `:`.
- `BACKLOG_PREFIX`
    - The URL of your Backlog space. A trailing slash is ignored.
    - If it is unset or empty, the plugin does nothing.

**If the plugin is also installed from the marketplace, uninstall or disable it, so it is not loaded twice.**

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
