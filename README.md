# backlog-issue-links-plugin

A Claude plugin ([mod](https://code.claude.com/docs/en/plugins/mods/overview)) that turns Backlog issue keys in Claude's replies into links to the issue page.

## Requirements

- Terminal: Claude Code v2.1.287 or later
- Claude Desktop: the bundled Claude Code v2.1.286 or later

claude.ai (chat and Cowork) is not supported, because mods run only in Claude Code.

## Installation

At the prompt of a Claude Code session in a terminal:

```
/plugin install backlog-issue-links-plugin --marketplace mmktomato/backlog-issue-links-plugin
```

Or from a shell:

```sh
claude plugin install backlog-issue-links-plugin --marketplace mmktomato/backlog-issue-links-plugin
```

Then add the following to the `env` block of `~/.claude/settings.json`:

```json
{
  "env": {
    "BACKLOG_PREFIX": "https://example.backlog.com"
  }
}
```

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

## Development

See [AGENTS.md](AGENTS.md).

## License

This project is released into the public domain.
