import { type Config, defineConfig, type Vars } from 'zyzz'
import { keyframes } from 'zyzz/web'
import { tokens } from './vars.ts'

export const { style, variants, vars } = defineConfig({
  defaultVars: 'base',
  id: 'nanocode',
  vars: { base: tokens },
})

export const flicker = keyframes({
  '0%, 49%': { opacity: 0 },
  '50%, 100%': { opacity: 1 },
})

export const pulse = keyframes({
  '50%': { opacity: 0.6, transform: 'scale(0.7)' },
})

export const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
})

export const ellipsis = keyframes({
  from: { width: '0' },
  to: { width: '3ch' },
})
