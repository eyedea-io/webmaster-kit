# Eyedea Webmaster Kit

![npm](https://img.shields.io/npm/l/express.svg)
![npm](https://img.shields.io/badge/install-npm-blue.svg)

## Getting started

**Install dependencies**:
```sh
npm
```

**Run development mode**:

```sh
# npm run dev <workspace>
npm run dev website
```

**Build single workspace**:

```sh
# npm run build <workspace>
npm run build website
```

## Tech stack

- @reach/router
- Codecov 
- Google Analytics
- Jest
- MobX/MobX State Tree
- React Cosmos
- Sentry
- Styled Components
- Stylelint, tslint
- Syncano
- Typescript
- Webpack

## Adding new workspaces

Create `workspaces/<workspace_name>/index.tsx` and run:

```sh
npm run dev <workspace_name>
```

## Custom workspace webpack config

Create `workspaces/<workspace_name>/webpack.config.js`:

```js
module.exports = function(config) {
  // Modify config and return it
  return config
}
```
## Configure service worker for production

To setup service worker, during build set `PUBLIC_PATH` to website URL.

```sh
PUBLIC_PATH=https://website.example npm run build website
```

## Configure error tracking with Sentry

1. Configure CircleCI env variables:
  ```sh
  SENTRY_DSN=https://XXXXXXXXX@sentry.io/XXXXXXX
  SENTRY_ORG=
  SENTRY_PROJECT=
  SENTRY_AUTH_TOKEN=
  ```
2. Setup [repository integration](https://docs.sentry.io/workflow/releases/?platform=javascript#a-link-a-repository) on Sentry
  
## Render application at sub directory

To render app at sub directory, set `ROUTER_BASEPATH` environment variable the sub directory name.

```sh
ROUTER_BASEPATH=/sub-directory-name
```

## Code Coverage

To configure code coverage, set `CODECOV_TOKEN` environment variable on CircleCI. Learn more at https://codecov.io
