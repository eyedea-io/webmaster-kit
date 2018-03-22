# Eyedea Webmaster Kit

![npm](https://img.shields.io/npm/l/express.svg)
![yarn](https://img.shields.io/badge/install-yarn-blue.svg)

## Getting started

**Install with yarn**:
```sh
yarn
```

**Run development mode**:

```sh
# yarn dev <workspace>
yarn dev website
```

**Build single workspace**:

```sh
# yarn build <workspace>
yarn build website
```

## Adding new workspaces

Just create `workspaces/<workspace_name>/index.tsx` and run:

```sh
yarn dev <workspace_name>
```

## Custom workspace webpack config

Create `workspaces/<workspace_name>/webpack.config.js`:

```js
module.exports = function(config) {
  // Modify config and return it
  return config
}
```
