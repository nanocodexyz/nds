import type { ComponentProps } from 'react'
import { style, vars } from '../zyzz.config.ts'

export function Kbd(props: Kbd.Props) {
  return <kbd {...props} {...styles.key({ className: props.className, style: props.style })} />
}

export declare namespace Kbd {
  type Props = ComponentProps<'kbd'>
}

namespace styles {
  export const key = style({
    border: '0.0625rem solid',
    borderBottomWidth: '0.125rem !custom',
    borderColor: 'text',
    display: 'inline',
    lineHeight: '0.85rem !custom',
    paddingInline: `calc(${vars.spacing.cell} / 2 - 0.0625rem) !custom`,
    userSelect: 'none',
  })
}
