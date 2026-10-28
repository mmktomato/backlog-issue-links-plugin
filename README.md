# backlog-issue-links-plugin

A Claude plugin ([mod](https://code.claude.com/docs/en/plugins/mods/overview)) that turns Backlog issue keys in Claude's replies into links to the issue page.

## Requirements

- Terminal: Claude Code v2.1.287 or later
- Claude Desktop: the bundled Claude Code v2.1.286 or later

## Installation

Clone this repository:

```sh
git clone https://github.com/mmktomato/backlog-issue-links-plugin.git
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

## Terminal support

Links are drawn as terminal hyperlinks. Claude Desktop, iTerm2 and Ghostty show them as they are. Terminal.app needs `FORCE_HYPERLINK` to be set:

```json
{
  "env": {
    "FORCE_HYPERLINK": "1"
  }
}
```

## License

This project is released into the public domain.
