import type { EngineInterface, Register } from 'claude-code'

const getPrefix = async ($: EngineInterface) =>
  (await $.env.get('BACKLOG_PREFIX'))?.trim().replace(/\/+$/, '') || undefined

// Code fences, code spans, links and URLs are matched whole so keys inside them stay as they are.
const TOKEN =
  /((?<=^|\n) {0,3}((`|~)\3{2,})[\s\S]*?(?:\n {0,3}\2\3*[ \t]*(?=\n|$)|$)|(?<!`)(`+)(?!`)(?:[^\n]|\n(?![ \t]*\n))*?(?<!`)\4(?!`)|\[[^\]\n]*\]\([^)\n]*\)|https?:\/\/[^\s)]+|(?<![\w-])[A-Z0-9_]+-\d+(?![\w-]))/g

const ISSUE_KEY = /^[A-Z0-9_]+-\d+$/

export const linkIssueKeys = (text: string, prefix: string): string =>
  text.replace(TOKEN, token => (ISSUE_KEY.test(token) ? `[${token}](${prefix}/view/${token})` : token))

export const register: Register = on => {
  let prefix: Promise<string | undefined> | undefined

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const p = await (prefix ??= getPrefix($))
    if (!p) return next(e)
    return next({ ...e, props: { ...e.props, text: linkIssueKeys(e.props.text, p) } })
  })
}
