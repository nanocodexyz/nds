'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { style, vars } from '../zyzz.config.ts'

export function CodeBlock(props: CodeBlock.Props) {
  const { children, code, html, label } = props
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (copied === 'idle') return
    const timer = window.setTimeout(() => setCopied('idle'), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (code === undefined) return <pre {...styles.code()}>{children}</pre>

  return (
    <div {...styles.block()}>
      <div {...styles.header()}>
        <span {...styles.label()}>{label ?? 'text'}</span>
        <span {...styles.actions()}>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(props.text ?? code)
                setCopied('copied')
              } catch {
                setCopied('failed')
              }
            }}
            type="button"
            {...styles.action()}
          >
            <span aria-live="polite">
              {{ copied: 'Copied', failed: 'Copy failed', idle: 'Copy' }[copied]}
            </span>
          </button>
        </span>
      </div>
      <pre {...styles.code()}>
        {html ? <code dangerouslySetInnerHTML={{ __html: html }} /> : <code>{code}</code>}
      </pre>
    </div>
  )
}

export declare namespace CodeBlock {
  type Props = {
    children?: ReactNode
    code?: string | undefined
    html?: string | undefined
    label?: string | undefined
    text?: string | undefined
  }
}

namespace styles {
  export const block = style({
    backgroundColor: 'surface',
    border: '1px solid',
    borderColor: 'rule',
    marginBlock: 'md',
  })

  export const header = style({
    alignItems: 'start',
    display: 'flex',
    justifyContent: 'space-between',
  })

  export const label = style({ backgroundColor: 'surface', color: 'text', paddingInline: 'cell' })

  export const actions = style({ display: 'flex', gap: 'indent', paddingInline: 'cell' })

  export const action = style({ padding: '0' })

  export const code = style({
    '& .highlighted': { backgroundColor: 'highlight', display: 'inline-block', width: '100% !custom' },
    '& .highlighted-word': { outline: '1px solid', outlineColor: 'rule' },
    '& .diff': { display: 'inline-block', width: '100% !custom' },
    '& .diff.add::before': { content: '"+"', marginLeft: '-1ch !custom', position: 'absolute' },
    '& .diff.remove': { opacity: 'faint' },
    '& code': { display: 'block' },
    '& .line': {
      display: 'inline-block',
      paddingLeft: 'indent',
      textIndent: `calc(${vars.spacing.indent} * -1) !custom`,
      width: '100% !custom',
    },
    margin: '0',
    overflowWrap: 'anywhere',
    paddingBlock: 'sm',
    paddingInline: 'indent',
    whiteSpace: 'pre-wrap',
  })
}
