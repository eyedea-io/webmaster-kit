#!/usr/bin/env node

const exec = require('child_process').exec
const fs = require('fs')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')
const inquirer = require('inquirer')
const axios = require('axios')
const Octokit = require('@octokit/rest')

const octokit = new Octokit()
const CIRCLE_ENDPOINT = 'https://circleci.com/api/v1.1/'
const CIRCLE_VARIABLES = {}
let circle

console.log('')

// Remove webmaster-kit .git directory
removeGit()

getConfig()
  .then(async config => {
    octokit.authenticate({
      type: 'token',
      token: config.github
    })

    circle = (url, data) => axios({
      url: `${CIRCLE_ENDPOINT}${url}`,
      method: 'post',
      data,
      params: {
        'circle-token': config.circle
      }
    })

    try {
      const [username, orgs] = await Promise.all([getUser(), getOrgs()])
      const accounts = [username].concat(orgs)

      let data = await prompt(accounts, config)
      data = {username, ...data}

      await createRepo(data)
      await pushToRepo(data)
      await createEnvrc(data)
      await attachSyncanoInstance(data)
      await setupCircle(data)

      console.log('')
      console.log(`✔ Live within 3 min at: https://${data.syncanoInstance}-staging.syncano.site`)
    } catch (err) {
      console.log('Failed to initialize webmaster kit.')
      console.log(err)
    }
  })

async function createEnvrc (data) {
  try {
    fs.writeFileSync('.envrc', `export SYNCANO_PROJECT_INSTANCE=${data.syncanoInstance}`)
    console.log(`✔ Created .envrc file`)
  } catch (err) {
    console.log(err)
    throw err
  }
}

function attachSyncanoInstance (data) {
  return run(`yes | npx s attach --create-instance ${data.syncanoInstance}`)
    .then(() =>
      run(`yes | npx s attach --create-instance ${data.syncanoInstance}-staging`)
    )
    .then(() => {
      console.log(`✔ Create Syncano instance: ${data.syncanoInstance}.`)
      console.log(`✔ Created and attached Syncano instance: ${data.syncanoInstance}-staging.`)

      return data
    })
    .catch(err => {
      console.log(`ERROR: Failed to attach syncano instance.`)

      throw err
    })
}

function setupCircle (data) {
  const url = `project/github/${data.account}/${data.repo}`
  const variables = {
    STAGING_SYNCANO_PROJECT_INSTANCE: `${data.syncanoInstance}-staging`,
    PRODUCTION_SYNCANO_PROJECT_INSTANCE: data.syncanoInstance,
    SYNCANO_AUTH_KEY: data.config.syncano
  }

  return Promise.all(
      Object.entries(variables).map(([name, value]) => {
        circle(`${url}/envvar`, {name, value})
      })
    )
    .then(() => circle(`${url}/follow`))
    .then(res => {
      console.log(`✔ Initialized CircleCI build and env vars.`)

      return data
    })
    .catch(err => {
      console.log(`ERROR: Failed to setup circle.`)
      console.log(err)

      throw err
    })
}

function prompt (accounts, config) {
  if (config) {
    return defaultPrompt(accounts).then(data => ({...data, config}))
  }

  return configPrompt(accounts)
}

async function getConfig () {
  let syncano
  const FILENAME = '.webmasterconfig'
  const dir = path.join(os.homedir(), FILENAME)
  const syncanoConfig = path.join(os.homedir(), 'syncano.yml')

  if (fs.existsSync(dir)) {
    const config = JSON.parse(fs.readFileSync(dir, {encoding: 'utf-8'}))

    return new Promise(resolve => resolve(config))
  }

  const config = await inquirer.prompt([
    {
      type: 'input',
      name: 'circle',
      message: 'CircleCI token(https://circleci.com/account/api)',
      validate: (value) => {
        return value.length >= 1
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'GitHub token(https://github.com/settings/tokens/new - repo, read:user)',
      validate: (value) => {
        return value.length >= 1
      }
    }
  ])

  if (fs.existsSync(syncanoConfig)) {
    syncano = fs.readFileSync(syncanoConfig, {encoding: 'utf-8'}).match(/auth_key: ([a-z0-9]+)/)[1]
  }

  const tokens = {syncano, ...config}

  fs.writeFileSync(dir, JSON.stringify(tokens))

  return tokens
}

function defaultPrompt (accounts) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'account',
      message: 'Select GitHub account',
      choices: accounts
    },
    {
      type: 'input',
      name: 'repo',
      message: 'GitHub repository name',
      validate: function (value) {
        return value.length >= 1
      }
    },
    {
      type: 'confirm',
      name: 'private',
      message: 'Private repository'
    },
    {
      type: 'input',
      name: 'syncanoInstance',
      message: 'Syncano instance name',
      validate: value => value.length >= 5 ? true : 'Min 5 characters'
    }
  ])
}

async function createRepo (data) {
  // TODO: Add homepage
  const options = {
    name: data.repo,
    private: data.private,
    allow_rebase_merge: false,
    has_projects: false,
    has_wiki: false
  }

  if (data.username === data.account) {
    try {
      await octokit.repos.create(options)
      console.log(`✔ Created ${data.private ? 'private ' : ''}repository on your account.`)
    } catch (err) {
      const res = JSON.parse(err)
      console.log(`ERROR: ${res.message}`)
      throw err
    }
  } else {
    try {
      await octokit.repos.createForOrg({org: data.account, ...options})
      console.log(`✔ Created ${data.private ? 'private ' : ''}repository on organization account: ${data.account}`)
    } catch (err) {
      const res = JSON.parse(err)
      console.log(`ERROR: ${res.message}`)
      throw err
    }
  }
}

async function getUser () {
  const {data} = await octokit.users.get()
  return data.login
}

async function getOrgs () {
  const {data} = await octokit.users.getOrgMemberships()
  return data.map(item => item.organization.login)
}

function removeGit () {
  if (fs.existsSync('.git/config')) {
    const content = fs.readFileSync('.git/config', {encoding: 'utf-8'})

    if (content.indexOf('https://github.com/eyedea-io/webmaster-kit.git') >= 0) {
      rimraf.sync('.git')
      console.log('✔ Removed .git directory.')
    }
  }
}

async function pushToRepo (data) {
  const gitInit = () => run(`git init`)
  const gitAdd = () => run(`git add .`)
  const gitCommit = () => run(`git commit -m "chore: initial commit"`)
  const gitAddRemote = () => run(`git remote add origin https://github.com/${data.account}/${data.repo}.git`)
  const gitPush = () => run(`git push -u origin master`)

  try {
    await gitInit()
    await gitAdd()
    await gitCommit()
    await gitAddRemote()
    await gitPush()

    console.log(`✔ Pushed to repository https://github.com/${data.account}/${data.repo}`)
    return data
  } catch (err) {
    console.log(`ERROR: Failed to attach remote.`)
    console.log(err)
    throw err
  }
}

function run (command, cb) {
  return new Promise((resolve, reject) => {
    exec(command, function (err, stdout, stderr) {
      if (err != null) {
        return reject(new Error(err))
      } else if (typeof (stderr) !== 'string') {
        return reject(new Error(stderr))
      } else {
        return resolve(stdout)
      }
    })
  })
}
