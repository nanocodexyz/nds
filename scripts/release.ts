import * as ChildProcess from 'node:child_process'
import * as Fs from 'node:fs'
import * as Os from 'node:os'
import * as Path from 'node:path'

const repository = 'nanocodexyz/nds'

if (ChildProcess.spawnSync('git', ['diff', '--quiet', 'HEAD']).status !== 0) {
  console.error('the checkout has uncommitted changes: commit and push them, then release')
  process.exit(1)
}

const sha = read('git', ['rev-parse', 'HEAD'])
const short = sha.slice(0, 7)
const scratch = Fs.mkdtempSync(Path.join(Os.tmpdir(), 'nds-'))

try {
  run('npm', ['ci'])
  run('npm', ['run', 'check:types'])
  run('npm', ['run', 'build'])

  const packed = read('npm', ['pack', '--ignore-scripts', '--silent', '--pack-destination', scratch])
  const tarball = Path.join(scratch, `nds-${short}.tgz`)
  Fs.renameSync(Path.join(scratch, packed.split('\n').pop()!), tarball)

  run('gh', [
    'release',
    'create',
    `build-${short}`,
    tarball,
    '--repo',
    repository,
    '--target',
    sha,
    '--title',
    `nds ${short}`,
    '--notes',
    `Built from ${sha}. Install with \`npm install https://github.com/${repository}/releases/download/build-${short}/nds-${short}.tgz\`.`,
  ])
} finally {
  Fs.rmSync(scratch, { force: true, recursive: true })
}

function read(command: string, args: readonly string[]) {
  return ChildProcess.spawnSync(command, args, { encoding: 'utf8' }).stdout.trim()
}

function run(command: string, args: readonly string[]) {
  const result = ChildProcess.spawnSync(command, args, { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
