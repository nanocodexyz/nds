import react from '@vitejs/plugin-react'
import * as Path from 'node:path'
import { defineConfig } from 'vite'
import { zyzz } from 'zyzz/vite'

const source = Path.resolve(import.meta.dirname, '../src')

export default defineConfig({
  plugins: [zyzz({ include: ['../src', 'src'] }), react()],
  resolve: {
    alias: [
      { find: /^nds$/, replacement: `${source}/index.ts` },
      { find: /^nds\/agent$/, replacement: `${source}/Agent.tsx` },
      { find: /^nds\/clones$/, replacement: `${source}/Clones.tsx` },
      { find: /^nds\/fonts\//, replacement: `${source}/fonts/` },
      { find: /^nds\/highlight$/, replacement: `${source}/Highlight.ts` },
      { find: /^nds\/site$/, replacement: `${source}/Site.tsx` },
      { find: /^nds\/skin$/, replacement: `${source}/Skin.ts` },
      { find: /^nds\/themes$/, replacement: `${source}/Themes.ts` },
    ],
  },
})
