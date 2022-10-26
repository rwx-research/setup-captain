import * as core from '@actions/core'
import * as path from 'path'
import * as tc from '@actions/tool-cache'

async function run() {
  const version = core.getInput('version')
  const url = `https://releases.captain.build/captain-${process.platform}-${process.arch}-${version}`

  core.debug(`Attempting to fetch ${url}`)
  const captain = await tc.downloadTool(url)

  core.addPath(path.dirname(captain))
}

run().catch(err => core.setFailed(err))
