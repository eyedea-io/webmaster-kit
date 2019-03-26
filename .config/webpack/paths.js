const {resolve} = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => resolve(appDirectory, relativePath)

module.exports = (workspace) => ({
  root: resolveApp('.'),
  yarnLockFile: resolveApp('yarn.lock'),
  packageJson: resolveApp('package.json'),
  tsconfig: resolveApp('tsconfig.json'),
  babelrc: resolveApp('.babelrc'),
  workspaces: resolveApp('workspaces'),
  sharedWorkspace: resolveApp('workspaces/shared'),
  nodeModules: resolveApp('node_modules'),
  workspace: resolveApp(`workspaces/${workspace}`),
  workspaceBuild: resolveApp(`.build/${workspace}`),
  workspacePublic: resolveApp(`workspaces/${workspace}/public`),
  workspaceIndexHtml: resolveApp(`workspaces/${workspace}/public/index.html`),
  workspacePackageJson: resolveApp(`workspaces/${workspace}/package.json`),
  workspaceIndexJs: resolveApp(`workspaces/${workspace}/index.tsx`),
})
