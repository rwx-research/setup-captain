import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as http from '@actions/http-client'
import * as tc from '@actions/tool-cache'
import * as path from 'path'

interface ProductVersions {
  captain: Versions
}

interface Versions {
  latest: string
  versions: string[]
}

async function run() {
  let version = core.getInput('version')
  if (version === 'latest') {
    core.debug('Fetching list of Captain releases')

    const client = new http.HttpClient()
    const versions = await client.getJson<ProductVersions>(
      'https://releases.captain.build/versions.json'
    )

    if (versions.statusCode !== 200 || versions.result === null) {
      throw 'Unable to fetch list of Captain releases'
    }

    version = versions.result.captain.latest
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
}

run().catch(err => core.setFailed(err))
