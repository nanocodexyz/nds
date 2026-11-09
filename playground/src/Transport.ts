import type { Transport } from 'nanocode-ts/client'

const reasoning = 'The visitor wants a file listing. One shell call answers it.'

const answer = [
  'The workspace holds two files:',
  '',
  '- `notes.md`: 12 lines',
  '- `plot.py`: 40 lines',
  '',
  '```ts',
  "import { skin } from 'nds/skin'",
  '```',
].join('\n')

export const scripted: Transport.Transport = {
  async send(parameters) {
    const { push, signal } = parameters
    const pause = () =>
      new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 250)
        signal.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(signal.reason)
        })
      })

    push({ delta: reasoning, item: 'reasoning:0', type: 'reasoning' })
    await pause()
    push({ args: { command: 'wc -l *' }, call_id: 'call-1', name: 'Bash', type: 'tool_start' })
    await pause()
    push({
      call_id: 'call-1',
      duration_ns: 21_000_000,
      name: 'Bash',
      result: '12 notes.md\n40 plot.py\n52 total',
      status: 'completed',
      type: 'tool_end',
    })
    for (const word of answer.split(/(?<= )/)) {
      await pause()
      push({ delta: word, item: 'answer', type: 'text' })
    }
    push({ status: 'completed', type: 'turn' })
  },
}
