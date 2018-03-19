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
  .then(config => {
    octokit.authenticate({
      type: 'token',
      token: config.github
    })

    circle = (url, data) => axios({
      url: `${CIRCLE_ENDPOINT}${url}`,
      method: 'post',
      data,
      params: {
        'circle-token': config.circle,
      }
    })

    Promise.all([getUser(), getOrgs()])
      .then(([username, orgs]) => {
        const accounts = [username].concat(orgs)

        prompt(accounts, config)
          .then(data => ({username, ...data}))
          .then(createRepo)
          .then(pushToRepo)
          .then(createEnvrc)
          .then(attachSyncanoInstance)
          .then(setupCircle)
          .then(data => {
            console.log('')
            console.log(`✔ Live within 3 min at: https://${data.syncanoInstance}-staging.syncano.site`)
          })
          .catch(err => {
            console.log('Failed to initialize webmaster kit.')
            console.log(err)
          })
      })
  })

function createEnvrc(data) {
  return new Promise((resolve) => {
    fs.writeFile(".envrc", `export SYNCANO_PROJECT_INSTANCE=${data.syncanoInstance}`, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log(`✔ Created .envrc file`)
      }

      resolve(data)
    });
  })
}

function attachSyncanoInstance(data) {
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

function setupCircle(data) {
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

function prompt(accounts, config) {
  if (config) {
    return defaultPrompt(accounts).then(data => ({...data, config}))
  }

  return  configPrompt(accounts)
}

function getConfig() {
  const FILENAME = '.webmasterconfig'
  const dir = path.join(os.homedir(), FILENAME)

  if (fs.existsSync(dir)) {
    const config = JSON.parse(fs.readFileSync(dir, {encoding: 'utf-8'}))

    return new Promise(resolve => resolve(config))
  }

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'circle',
        message: "CircleCI token(https://circleci.com/account/api)",
        validate: function(value) {
          return value.length >= 1
        }
      },
      {
        type: 'input',
        name: 'github',
        message: "GitHub token(https://github.com/settings/tokens/new - repo, read:user)",
        validate: function(value) {
          return value.length >= 1
        }
      }
    ])
    .then(config => {
      const dir = path.join(os.homedir(), FILENAME)
      const syncanoConfig = path.join(os.homedir(), 'syncano.yml')

      if (fs.existsSync(syncanoConfig)) {
        syncano = fs.readFileSync(syncanoConfig, {encoding: 'utf-8'}).match(/auth_key: ([a-z0-9]+)/)[1]
      }

      const tokens = {syncano, ...config}

      fs.writeFileSync(dir, JSON.stringify(tokens))

      return tokens
    })
}

function defaultPrompt(accounts) {
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
        message: "GitHub repository name",
        validate: function(value) {
          return value.length >= 1
        }
      },
      {
        type: 'confirm',
        name: 'private',
        message: "Private repository"
      },
      {
        type: 'input',
        name: 'syncanoInstance',
        message: "Syncano instance name",
        validate: value => value.length >= 5 ? true : 'Min 5 characters'
      }
    ])
}

function createRepo(data) {
  // TODO: Add homepage
  const options = {
    name: data.repo,
    private: data.private,
    allow_rebase_merge: false,
    private: data.private,
    has_projects: false,
    has_wiki: false
  }

  if (data.username === data.account) {
    return octokit
      .repos
      .create(options)
      .then(() => {
        console.log(`✔ Created ${data.private ? 'private ': ''}repository on your account.`)

        return data
      })
      .catch(err => {
        const res = JSON.parse(err)
        console.log(`ERROR: ${res.message}`)
        throw err
      })
  }

  return octokit
    .repos
    .createForOrg({org: data.account, ...options})
    .then(() => {
      console.log(`✔ Created ${data.private ? 'private ': ''}repository on organization account: ${data.account}`)

      return data
    })
    .catch(err => {
      const res = JSON.parse(err)
      console.log(`ERROR: ${res.message}`)
      throw err
    })
}

function getUser() {
  return octokit
    .users
    .get()
    .then(({data}) => {
      return data.login
    })
}

function getOrgs() {
  return octokit
    .users
    .getOrgMemberships()
    .then(({data}) => {
      return data.map(item => item.organization.login)
    })
}

function removeGit() {
  if (fs.existsSync('.git/config')) {
    const content = fs.readFileSync('.git/config', {encoding: 'utf-8'})

    if (content.indexOf('https://github.com/eyedea-io/webmaster-kit.git') >= 0) {
      rimraf.sync('.git')
      console.log('✔ Removed .git directory.')
    }
  }
}

function pushToRepo(data) {
  const gitInit = () => run(`git init`)
  const gitAdd = () => run(`git add .`)
  const gitCommit = () => run(`git commit -m "chore: initial commit"`)
  const gitAddRemote = () => run(`git remote add origin https://github.com/${data.account}/${data.repo}.git`)
  const gitPush = () => run(`git push -u origin master`)

  return gitInit()
    .then(gitAdd)
    .then(gitCommit)
    .then(gitAddRemote)
    .then(gitPush)
    .then(() => {
      console.log(`✔ Pushed to repository https://github.com/${data.account}/${data.repo}`)

      return data
    })
    .catch(err => {
      console.log(`ERROR: Failed to attach remote.`)
      console.log(err)

      throw err
    })
}

function run(command, cb){
  return new Promise((resolve, reject) => {
    exec(command, function(err, stdout, stderr) {
      if(err != null) {
        return reject(new Error(err))
      } else if(typeof(stderr) != "string") {
        return reject(new Error(stderr))
      } else {
        return resolve(stdout)
      }
    })
  })
}
