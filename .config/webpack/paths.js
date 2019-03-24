const {resolve} = require('path')

module.exports = (workspace) => ({
  tsconfig: resolve(__dirname, '../../tsconfig.json'),
  tslint: resolve(__dirname, '../../tslint.json'),
  babelrc: resolve(__dirname, '../../.babelrc'),
  workspaces: resolve(__dirname, '../../workspaces'),
  sharedWorkspace: resolve(__dirname, '../../workspaces/shared'),
  nodeModules: resolve(__dirname, '../../node_modules'),
  workspace: resolve(__dirname, `../../workspaces/${workspace}`),
  workspaceBuild: resolve(__dirname, `../../.build/${workspace}`),
  workspacePublic: resolve(__dirname, `../../workspaces/${workspace}/public`),
  workspaceIndexHtml: resolve(__dirname, `../../workspaces/${workspace}/public/index.html`),
  workspacePackageJson: resolve(__dirname, `../../workspaces/${workspace}/package.json`),
  workspaceIndexJs: resolve(__dirname, `../../workspaces/${workspace}/index.tsx`),
})
