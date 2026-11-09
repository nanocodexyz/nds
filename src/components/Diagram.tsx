'use client'

import { useRef, useState } from 'react'
import { style, vars } from '../zyzz.config.ts'

export function Diagram(props: Diagram.Props) {
  const { svg } = props
  const dialog = useRef<HTMLDialogElement>(null)
  const [scale, setScale] = useState(1)

  const zoom = (factor: number) => setScale((scale) => Math.min(6, Math.max(0.5, scale * factor)))

  return (
    <>
      <button
        aria-label="Open the diagram full screen"
        onClick={() => {
          setScale(1)
          dialog.current?.showModal()
        }}
        type="button"
        {...styles.diagram()}
      >
        <span data-ondine="" dangerouslySetInnerHTML={{ __html: svg }} />
        <span aria-hidden="true" {...styles.expand()}>
          ⤢ Zoom
        </span>
      </button>

      <dialog
        aria-label="Diagram"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
        ref={dialog}
        {...styles.viewer()}
      >
        <div {...styles.toolbar()}>
          <button onClick={() => zoom(1 / 1.25)} type="button">
            − Zoom out
          </button>
          <button onClick={() => zoom(1.25)} type="button">
            + Zoom in
          </button>
          <button onClick={() => setScale(1)} type="button">
            Reset
          </button>
          <span {...styles.scale()}>{Math.round(scale * 100)}%</span>
          <button onClick={() => dialog.current?.close()} type="button" {...styles.close()}>
            Close esc
          </button>
        </div>
        <div
          onWheel={(event) => {
            if (!event.ctrlKey && !event.metaKey) return
            event.preventDefault()
            zoom(event.deltaY < 0 ? 1.1 : 1 / 1.1)
          }}
          {...styles.canvas()}
        >
          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            data-ondine=""
            style={{ width: `${scale * 100}%` }}
            {...styles.zoomed()}
          />
        </div>
      </dialog>
    </>
  )
}

export declare namespace Diagram {
  type Props = { svg: string }
}

namespace styles {
  export const diagram = style({
    '--ondine-bg': 'transparent',
    '--ondine-fg': 'currentColor !custom',
    '--ondine-line': `${vars.color.middle} !custom`,
    '& svg': { display: 'block', height: 'auto !custom', maxWidth: '100% !custom' },
    ':hover': { borderColor: 'accent' },
    backgroundColor: 'surface',
    border: '1px solid',
    borderColor: 'rule',
    cursor: 'zoom-in',
    display: 'flex',
    justifyContent: 'center',
    marginBlock: 'md',
    padding: 'md',
    position: 'relative',
    textDecoration: 'none',
    width: '100% !custom',
  })

  export const expand = style({
    bottom: 'xs',
    opacity: 'dim',
    position: 'absolute',
    right: 'cell',
  })

  export const viewer = style({
    '&::backdrop': { backgroundColor: 'backdrop' },
    backgroundColor: 'surface',
    border: '1px solid',
    borderColor: 'rule',
    color: 'text',
    display: 'none',
    height: `calc(100dvh - ${vars.spacing['2xl']}) !custom`,
    margin: 'auto !custom',
    maxHeight: 'none !custom',
    maxWidth: 'none !custom',
    width: `calc(100vw - ${vars.spacing.gutter}) !custom`,
    '&[open]': { display: 'flex', flexDirection: 'column' },
  })

  export const toolbar = style({
    alignItems: 'center',
    borderBottom: '1px solid',
    borderBottomColor: 'rule',
    display: 'flex',
    gap: 'indent',
    paddingBlock: 'xs',
    paddingInline: 'indent',
  })

  export const scale = style({ opacity: 'dim' })

  export const close = style({ marginLeft: 'auto !custom' })

  export const canvas = style({ flex: '1 !custom', overflow: 'auto', padding: 'md' })

  export const zoomed = style({
    '--ondine-bg': 'transparent',
    '--ondine-fg': 'currentColor !custom',
    '--ondine-line': `${vars.color.middle} !custom`,
    '& svg': { display: 'block', height: 'auto !custom', width: '100% !custom' },
    marginInline: 'auto !custom',
  })
}
