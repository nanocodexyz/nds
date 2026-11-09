import type { ReactNode } from 'react'
import { style, variants } from '../zyzz.config.ts'

const tones = {
  caution: 'Caution',
  important: 'Important',
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
} as const

export function Callout(props: Callout.Props) {
  const { children } = props
  const tone = props['data-callout']

  if (!tone || !Object.hasOwn(tones, tone))
    return <blockquote {...styles.quote()}>{children}</blockquote>
  const label = tones[tone]
  return (
    <aside aria-label={label} data-callout="" {...styles.callout()}>
      <span {...styles.label({ tone })}>{label}</span>
      <div {...styles.content()}>{children}</div>
    </aside>
  )
}

export declare namespace Callout {
  type Props = {
    children?: ReactNode
    'data-callout'?: keyof typeof tones | undefined
  }
}

namespace styles {
  export const callout = style({
    '& p': { margin: '0' },
    '& p + p': { marginTop: 'sm' },
    borderLeft: '2px solid',
    borderLeftColor: 'accent',
    display: 'flex',
    flexDirection: 'column',
    gap: 'xs',
    paddingLeft: 'indent',
  })

  export const label = variants({
    base: { alignSelf: 'start', backgroundColor: 'surface', color: 'text', paddingInline: 'cell' },
    variants: { tone: { caution: {}, important: {}, note: {}, tip: {}, warning: {} } },
  })

  export const content = style({})

  export const quote = style({ borderLeft: '1px solid', borderLeftColor: 'rule', paddingLeft: 'indent' })
}
