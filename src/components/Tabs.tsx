'use client'

import { Children, isValidElement, type ReactNode, useId, useState } from 'react'
import { style } from '../zyzz.config.ts'

export function Tabs(props: Tabs.Props) {
  const tabs = Children.toArray(props.children).filter((child) => isValidElement<Tab.Props>(child))
  const [selected, setSelected] = useState(0)
  const id = useId()

  return (
    <div {...styles.tabs()}>
      <div aria-label="Variants" role="tablist" {...styles.list()}>
        {tabs.map((tab, index) => (
          <button
            aria-controls={`${id}-${index}-panel`}
            aria-selected={index === selected}
            id={`${id}-${index}`}
            key={tab.props.title}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
              const step = event.key === 'ArrowRight' ? 1 : -1
              const next = (selected + step + tabs.length) % tabs.length
              setSelected(next)
              document.getElementById(`${id}-${next}`)?.focus()
            }}
            role="tab"
            tabIndex={index === selected ? 0 : -1}
            type="button"
            {...styles.tab()}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          aria-labelledby={`${id}-${index}`}
          hidden={index !== selected}
          id={`${id}-${index}-panel`}
          key={tab.props.title}
          role="tabpanel"
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  )
}

export declare namespace Tabs {
  type Props = { children?: ReactNode }
}

export function Tab(props: Tab.Props) {
  return <>{props.children}</>
}

export declare namespace Tab {
  type Props = { children?: ReactNode; title: string }
}

namespace styles {
  export const tabs = style({ marginBlock: 'md' })

  export const list = style({
    borderBottom: '1px solid',
    borderBottomColor: 'rule',
    display: 'flex',
    gap: 'cell',
    marginBottom: 'md',
  })

  export const tab = style({
    ':hover': { backgroundColor: 'accent', color: 'onAccent', textDecoration: 'none' },
    '&[aria-selected="true"]:not(:hover)': { backgroundColor: 'text', color: 'bg', textDecoration: 'none' },
    border: '1px solid',
    borderColor: 'rule',
    borderBottom: 'none',
    paddingInline: 'cell',
    textDecoration: 'none',
  })
}
