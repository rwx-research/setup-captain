import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as http from '@actions/http-client'
import * as tc from '@actions/tool-cache'

async function run() {
  let version = core.getInput('version')

  if (version === 'latest') {
    version = 'v1'
  }

  if (version.match(/^[0-9]+/)) {
    version = `v${version}`
  }

  let os = process.platform as string
  if (os === 'win32') {
    os = 'windows'
  }

  let arch = process.arch as string
  if (arch === 'x64') {
    arch = 'amd64'
  }

  const url = `https://releases.captain.build/captain-${os}-${arch}-${version}`

  core.debug(`Fetching ${url}`)
  const captain = await tc.downloadTool(url)

  core.debug('Installing to /usr/local/bin/captain')
  await exec.exec('install', [captain, '/usr/local/bin/captain'])

  const {stdout} = await exec.getExecOutput('captain', ['--version'], {
    silent: true
  })
  const cliVersion = stdout.replace('\n', '')
  if (cliVersion !== version && version !== 'v1') {
    throw `Unexpected version of Captain installed. Expected ${version} but installed ${cliVersion}`
  }
  core.info(`captain ${cliVersion} is installed`)
}

run().catch(err => core.setFailed(err))
