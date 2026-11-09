import type { ComponentProps, ComponentType, ReactNode } from 'react'
import { style, vars } from '../zyzz.config.ts'

export function Cards(props: Cards.Props) {
  return <div {...styles.grid()}>{props.children}</div>
}

export declare namespace Cards {
  type Props = { children?: ReactNode }
}

export function Card(props: Card.Props) {
  const { description, title, to } = props
  const Link = props.link ?? 'a'

  return (
    <Link data-card="" href={to} {...styles.card()}>
      <span {...styles.title()}>
        {title} <span aria-hidden="true">→</span>
      </span>
      {description && <span {...styles.description()}>{description}</span>}
    </Link>
  )
}

export declare namespace Card {
  type Props = {
    description?: string | undefined
    icon?: string | undefined
    link?: ComponentType<ComponentProps<'a'>> | undefined
    title: string
    to: string
  }
}

namespace styles {
  export const grid = style({
    display: 'grid',
    gap: 'indent',
    gridTemplateColumns: `repeat(auto-fill, minmax(${vars.spacing.card}, 1fr)) !custom`,
  })

  export const card = style({
    ':active': { backgroundColor: 'text', color: 'bg' },
    ':hover': { backgroundColor: 'accent', color: 'onAccent', textDecoration: 'none' },
    border: '1px solid',
    borderColor: 'rule',
    color: 'text',
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: 'sm',
    paddingInline: 'cell',
    textDecoration: 'none !custom',
  })

  export const title = style({ fontVariationSettings: '"wght" 700' })

  export const description = style({})
}
