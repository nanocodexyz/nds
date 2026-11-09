import commitMono from 'nds/fonts/CommitMono-VF.woff2'
import { Callout, Card, Cards, CodeBlock, Kbd, Prose, style, Tab, Tabs, variants } from 'nds'
import { Demos, Header, Lead, Main, Page, styles as site, Title } from 'nds/site'
import { themes, themeStyle } from 'nds/themes'
import { Config } from 'nanocode-ts/client'
import { Chat, NanocodeProvider } from 'nanocode-ts/react'
import { useEffect, useMemo, useState } from 'react'
import { scripted } from './Transport.ts'

const colors = ['accent', 'agent', 'bg', 'middle', 'rule', 'surface', 'text'] as const

const usage = [
  "import { Chat, NanocodeProvider } from 'nanocode-ts/react'",
  "import { skin } from 'nds/skin'",
  '',
  '<NanocodeProvider config={config} skin={skin}>',
  '  <Chat />',
  '</NanocodeProvider>',
].join('\n')

export function App() {
  const [chosen, setChosen] = useState('nanocode')
  const theme = themes.find((item) => item.id === chosen) ?? themes[0]!
  const config = useMemo(() => Config.create({ revealMs: 0, transport: scripted }), [chosen])

  useEffect(() => {
    document.body.className = site.body().className
    const face = new FontFace('CommitMono', `url("${commitMono}") format("woff2")`, {
      weight: '200 700',
    })
    document.fonts.add(face)
    void face.load()
  }, [])

  return (
    <>
      <Header current="Home" />
      <Main>
        <Page>
          <Title subtitle="nanocode design system.">nds</Title>
          <Demos current="cloudflare" />
          <Lead>
            Tokens, page chrome, document components and the skins that dress nanocode-ts's
            headless chat. Press <Kbd>⌘K</Kbd> nowhere: this page only shows the parts.
          </Lead>

          <section {...styles.section()}>
            <h2>Tokens</h2>
            <ul {...styles.swatches()}>
              {colors.map((name) => (
                <li key={name} {...styles.swatch()}>
                  <span {...styles.chip({ color: name })} />
                  {name}
                </li>
              ))}
            </ul>
          </section>

          <section {...styles.section()}>
            <h2>Components</h2>
            <Prose>
              <p>
                <strong>Prose</strong> sets the rhythm of a document: lists, tables and inline{' '}
                <code>code</code>.
              </p>
              <ul>
                <li>One item</li>
                <li>Another item</li>
              </ul>
              <Callout data-callout="note">
                <p>A callout marks a note, a tip or a warning.</p>
              </Callout>
              <Tabs>
                <Tab title="React">
                  <CodeBlock code={usage} label="chat.tsx" />
                </Tab>
                <Tab title="Install">
                  <CodeBlock code="npm install nds nanocode-ts zyzz" label="sh" />
                </Tab>
              </Tabs>
              <Cards>
                <Card description="Headless React components." title="nanocode-ts" to="#chat" />
                <Card description="Their skins and themes." title="nds" to="#chat" />
              </Cards>
            </Prose>
          </section>

          <section id="chat" {...styles.section()}>
            <h2>Chat</h2>
            <p>The same headless Chat under each theme. The transport is scripted.</p>
            <div aria-label="Theme" role="group" {...styles.themes()}>
              {themes.map((item) => (
                <button
                  aria-pressed={item.id === theme.id}
                  key={item.id}
                  onClick={() => setChosen(item.id)}
                  type="button"
                  {...styles.theme()}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p>{theme.description}</p>
            <div data-theme={theme.id} style={themeStyle(theme)} {...styles.stage()}>
              <NanocodeProvider config={config} key={theme.id} skin={theme.skin}>
                <Chat
                  {...(theme.placeholder ? { placeholder: theme.placeholder } : {})}
                  suggestions={['List the workspace']}
                />
              </NanocodeProvider>
            </div>
          </section>
        </Page>
      </Main>
    </>
  )
}

namespace styles {
  export const section = style({ display: 'flex', flexDirection: 'column', gap: 'md' })

  export const swatches = style({ display: 'flex', flexWrap: 'wrap', gap: 'indent', listStyle: 'none' })

  export const swatch = style({ alignItems: 'center', display: 'flex', gap: 'cell' })

  export const chip = variants({
    base: {
      border: '1px solid',
      borderColor: 'rule',
      display: 'inline-block',
      height: 'md',
      width: 'lg',
    },
    variants: {
      color: {
        accent: { backgroundColor: 'accent' },
        agent: { backgroundColor: 'agent' },
        bg: { backgroundColor: 'bg' },
        middle: { backgroundColor: 'middle' },
        rule: { backgroundColor: 'rule' },
        surface: { backgroundColor: 'surface' },
        text: { backgroundColor: 'text' },
      },
    },
  })

  export const themes = style({ display: 'flex', flexWrap: 'wrap', gap: 'indent' })

  export const theme = style({
    '&[aria-pressed="true"]': { backgroundColor: 'text', color: 'bg', textDecorationLine: 'none' },
  })

  export const stage = style({ backgroundColor: 'bg', color: 'text' })
}
