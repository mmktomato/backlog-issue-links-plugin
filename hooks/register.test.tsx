import type { PluginOptions } from 'claude-code'
import { expect, test } from 'claude-code/testing'
import { linkIssueKeys } from './register'

const PREFIX = 'https://example.backlog.com'

test('links bare issue keys', () => {
  expect(linkIssueKeys('See PROJ-123 and A_B2-7, 2P-8.', PREFIX)).toBe(
    'See [PROJ-123](https://example.backlog.com/view/PROJ-123) and [A_B2-7](https://example.backlog.com/view/A_B2-7), [2P-8](https://example.backlog.com/view/2P-8).',
  )
})

test('leaves keys inside longer hyphenated tokens alone', () => {
  for (const text of ['CVE-2024-1234', 'X-PROJ-1', 'PROJ-1-2', 'PROJ-1a']) {
    expect(linkIssueKeys(text, PREFIX)).toBe(text)
  }
})

const FENCES = [
  '```\nPROJ-4\n```',
  "```ts\nconst s = 'x ```'\nPROJ-4\n```",
  '````\n```\nPROJ-4\n````',
  '~~~\n```\nPROJ-4\n~~~~',
]

test('leaves code, links and URLs alone', () => {
  for (const text of [
    '`PROJ-1`',
    '``use `PROJ-1` here``',
    '`wrapped\nPROJ-1`',
    '[PROJ-2](https://example.com)',
    'https://example.backlog.com/view/PROJ-3',
    ...FENCES,
    '```\nPROJ-5',
    '~~~\nPROJ-5\n```',
  ]) {
    expect(linkIssueKeys(text, PREFIX)).toBe(text)
  }
})

test('links keys after a closed fence', () => {
  for (const fence of FENCES) {
    expect(linkIssueKeys(`${fence}\nPROJ-6`, PREFIX)).toBe(
      `${fence}\n[PROJ-6](https://example.backlog.com/view/PROJ-6)`,
    )
  }
})

test('does not pair backticks across a blank line', () => {
  expect(linkIssueKeys('`a\n\nPROJ-7 `', PREFIX)).toBe(
    '`a\n\n[PROJ-7](https://example.backlog.com/view/PROJ-7) `',
  )
})

const MESSAGE = {
  plugin: 'backlog-issue-links-plugin',
  component: 'AssistantMessage',
  surface: 'terminal',
  props: { text: 'See PROJ-1.', isFirstOfReply: true },
} as const

const LINKED = 'See [PROJ-1](https://example.backlog.com/view/PROJ-1).'

for (const [option, env, expected] of [
  [undefined, undefined, 'See PROJ-1.'],
  [undefined, '', 'See PROJ-1.'],
  [undefined, ' ', 'See PROJ-1.'],
  [undefined, ' https://example.backlog.com/ ', LINKED],
  ['', undefined, 'See PROJ-1.'],
  [' ', undefined, 'See PROJ-1.'],
  [' https://example.backlog.com/ ', undefined, LINKED],
  ['', 'https://example.backlog.com', LINKED],
  ['https://example.backlog.com', 'https://other.backlog.com', LINKED],
] as const) {
  const options: PluginOptions = option === undefined ? {} : { backlog_prefix: option }
  const name = `renders with backlog_prefix=${JSON.stringify(option)} and BACKLOG_PREFIX=${JSON.stringify(env)}`
  test(name, { options }, async ($, on) => {
    on('env.get', () => ({ value: env }))
    on('ui.render', { component: 'AssistantMessage' }, ($, e) => {
      const { Text } = $.ui.resolve(e)
      return <Text>{e.props.text}</Text>
    })

    const ui = await $.ui.mount(MESSAGE)

    expect((await ui.find({ type: 'Text' }))?.text).toBe(expected)
    await ui.unmount()
  })
}
