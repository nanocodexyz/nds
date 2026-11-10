import type { ReactNode } from 'react'
import { style, vars } from '../zyzz.config.ts'

export function Prose(props: Prose.Props) {
  const Element = props.as ?? 'div'

  return <Element {...styles.prose()}>{props.children}</Element>
}

export declare namespace Prose {
  type Props = {
    as?: 'article' | 'div' | 'section' | undefined
    children?: ReactNode
  }
}

namespace styles {
  export const prose = style({
    '& p, & ul, & ol, & table, & figure, & blockquote': { marginBlock: 'md' },
    '& h2': {
      marginBottom: 'md',
      marginTop: 'xl',
      scrollMarginTop: 'nav',
    },
    '& h2::before': { color: 'accent', content: '"# "' },
    '& h3': { marginTop: 'lg', scrollMarginTop: 'nav' },
    '& h4': { marginTop: 'md' },
    '& ul': { listStyle: 'none' },
    '& ul > li': { marginLeft: 'indent' },
    '& ul > li::before': {
      content: '"• "',
      marginLeft: `calc(${vars.spacing.indent} * -1) !custom`,
      position: 'absolute',
    },
    '& ol': { paddingLeft: 'indent' },
    '& li + li': { marginTop: 'xs' },
    '& strong': { fontVariationSettings: '"wght" 700', fontWeight: 'normal' },
    '& :is(p, li, td, th, h2, h3, h4) > code': { fontVariationSettings: '"wght" 500' },
    '& table': { borderCollapse: 'collapse', display: 'block', overflowX: 'auto' },
    '& th, & td': {
      border: '1px solid',
      borderColor: 'rule',
      paddingInline: 'cell',
      overflowWrap: 'normal',
      textAlign: 'left',
      verticalAlign: 'top',
    },
    '& th': { fontVariationSettings: '"wght" 700', fontWeight: 'normal' },
    minWidth: '0',
    overflowWrap: 'anywhere',
  })
}
