import { flicker, style, variants, vars } from './zyzz.config.ts'

export const body = style({
  backgroundColor: 'bg',
  color: 'text',
  colorScheme: 'light dark',
  fontFamily: 'mono',
  fontFeatureSettings: '"ss01", "ss03", "ss04", "ss05"',
  fontSize: 'body',
  lineHeight: 'body',
  margin: '0',
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
  selectors: {
    ':where(&) :where(*), :where(&) :where(*)::before, :where(&) :where(*)::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    ':where(&) ::selection': { backgroundColor: 'accent', color: 'onAccent' },
    ':where(&) :where(h1)': { fontSize: 'title', fontWeight: 'normal', lineHeight: 'title' },
    ':where(&) :where(h2), :where(&) :where(h3), :where(&) :where(h4)': {
      fontSize: 'inherit !custom',
      fontVariationSettings: '"wght" 700',
      fontWeight: 'normal',
      lineHeight: 'inherit !custom',
    },
    ':where(&) :where(a), :where(&) :where(a:visited)': { color: 'text' },
    ':where(&) :where(a), :where(&) :where(button)': {
      cursor: 'pointer',
      textDecorationColor: 'accent',
      textDecorationLine: 'underline',
      textDecorationSkipInk: 'none',
      textUnderlineOffset: '0.24ch !custom',
    },
    ':where(&) :where(button)': {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'inherit !custom',
      font: 'inherit !custom',
      fontFeatureSettings: 'inherit !custom',
      textAlign: 'left',
    },
    ':where(&) :where(button:active)': { backgroundColor: 'accent', color: 'onAccent' },
    ':where(&) :where(:focus-visible)': {
      animationDuration: '50ms',
      animationIterationCount: 2,
      animationName: flicker,
      backgroundColor: 'accent',
      color: 'onAccent',
      outline: 'none',
      textDecorationLine: 'none',
    },
    ':where(&) :where(code), :where(&) :where(kbd), :where(&) :where(pre), :where(&) :where(samp)':
      { font: 'inherit !custom', fontFeatureSettings: 'inherit !custom' },
  },
  '@media (prefers-reduced-motion: reduce)': {
    selectors: { ':where(&) :where(:focus-visible)': { animationName: 'none' } },
  },
})

export const header = style({
  backgroundColor: 'bg',
  insetInline: '0',
  overflowX: 'auto',
  paddingBottom: 'sm',
  paddingInline: 'gutter',
  paddingTop: 'md',
  position: 'fixed',
  scrollbarWidth: 'none',
  top: '0',
  zIndex: 100,
  '@media (max-width: 1000px)': { paddingInline: 'indent' },
})

export const navigation = style({ display: 'flex', gap: 'gutter', width: 'max-content !custom' })

export const link = variants({
  base: {
    color: 'text',
    textDecorationLine: 'none',
    whiteSpace: 'nowrap',
    ':active': { backgroundColor: 'text', color: 'bg' },
    ':hover': { backgroundColor: 'accent', color: 'onAccent' },
  },
  variants: {
    current: {
      false: {},
      true: {
        ':not(:hover)': {
          backgroundColor: 'text',
          boxShadow:
            'inset 0 -2px 0 var(--z-nanocode-color-accent, light-dark(#ea4c0a, #ff5c1a)) !custom',
          color: 'bg',
        },
      },
    },
  },
  defaultVariants: { current: false },
})

export const main = style({
  paddingBottom: '10rem !custom',
  paddingInline: 'gutter',
  paddingTop: 'nav',
  '@media (max-width: 1000px)': { paddingInline: 'indent' },
})

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'lg',
  maxWidth: '94ch !custom',
  paddingTop: 'xl',
  selectors: { ':where(&) :where(a)': { color: 'text', textDecorationLine: 'underline' } },
})

export const dot = style({ color: 'accent' })

export const demos = style({
  alignItems: 'center',
  columnGap: 'cell',
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: 'xs',
})

export const toggle = style({ border: '1px solid', borderColor: 'rule', display: 'inline-flex' })

export const demo = variants({
  base: {
    alignItems: 'center',
    color: 'text',
    display: 'flex',
    gap: 'cell',
    paddingBlock: 'xs',
    paddingInline: 'cell',
    textDecorationLine: 'none',
    ':active': { backgroundColor: 'text', color: 'bg' },
    ':hover': { backgroundColor: 'accent', color: 'onAccent' },
    selectors: { '& + &': { borderLeft: '1px solid', borderLeftColor: 'rule' } },
  },
  variants: {
    current: {
      false: {},
      true: {
        ':not(:hover)': {
          backgroundColor: 'text',
          boxShadow:
            'inset 0 -2px 0 var(--z-nanocode-color-accent, light-dark(#ea4c0a, #ff5c1a)) !custom',
          color: 'bg',
        },
      },
    },
  },
  defaultVariants: { current: false },
})

export const logo = style({
  fill: 'currentColor !custom',
  flexShrink: 0,
  height: 'icon',
  width: 'auto !custom',
})

export const lead = style({ maxWidth: 'prose' })

export const points = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'xs',
  listStyle: 'none',
  maxWidth: 'column',
  selectors: {
    '& > li': { marginLeft: 'indent' },
    '& > li::before': {
      color: 'accent',
      content: '"• "',
      marginLeft: `calc(${vars.spacing.indent} * -1) !custom`,
      position: 'absolute',
    },
    '& strong': { fontVariationSettings: '"wght" 700', fontWeight: 'normal' },
  },
})

export const links = style({ columnGap: 'gutter', display: 'flex', flexWrap: 'wrap', rowGap: 'xs' })
