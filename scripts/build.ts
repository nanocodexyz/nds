import * as ChildProcess from 'node:child_process'
import * as Fs from 'node:fs'

Fs.rmSync('dist', { force: true, recursive: true })
Fs.rmSync('output/zyzz', { force: true, recursive: true })

run('npx', ['tsc', '-p', 'tsconfig.build.json'])
run('npx', [
  'zyzz',
  'build',
  'dist',
  '--out-dir',
  'output/zyzz',
  '--package-id',
  'nds',
  '--minify',
  '--external',
  'react',
  '--external',
  'react/*',
  '--external',
  'nanocode-ts',
  '--external',
  'nanocode-ts/*',
])

Fs.cpSync('output/zyzz', 'dist', { recursive: true })
Fs.cpSync('src/fonts', 'dist/fonts', { recursive: true })

function run(command: string, args: readonly string[]) {
  const result = ChildProcess.spawnSync(command, args, { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
