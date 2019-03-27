#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const {mergeDB} = require('./helpers')
const parser = require('@babel/parser')
const launchApp = require('./app')

const CLI_NAME = 'i18n'

const cli = meow(`
  Usage:
    $ ${CLI_NAME} <entry> <locale> [db]
  Arguments:
    <entry>     The entry file of your app
    <locale>    Locale to add/update translations for
  Options:
    --help      Show information
    --version   Show current version
  Example:
    $ ${CLI_NAME} ./index.js es
`)

const flag = {
  error: msg => chalk.red(`\n${msg}\nTry \`${CLI_NAME} --help\` for more informations.\n`),
}

const options = {
  entry: cli.input.slice(0, cli.input.length - 1),                    // entry file
  locale: cli.input[cli.input.length - 1],                   // locale to translate to
  db: './i18n.db.json',    // db file
}

if (!options.entry) {
  console.log(`${flag.error(`Missing <entry> argument.`)}`)
  process.exit(1)
}

if (!options.locale) {
  console.log(`${flag.error(`Missing <locale> argument.`)}`)
  process.exit(1)
}

const parserOptions = {
  // parse in strict mode and allow module declarations
  sourceType: 'module',
  plugins: [
    'estree',
    'jsx',

    // ECMAScript proposals
    'asyncGenerators',
    'bigInt',
    'classProperties',
    'classPrivateProperties',
    'classPrivateMethods',
    'doExpressions',
    'dynamicImport',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importMeta',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    'throwExpressions',
    'importMeta',
  ],
}

const NODE_PATH = process.env.NODE_PATH || ''
const fileCache = []
const indexedFiles = []
const db = {
  old: JSON.parse(fs.readFileSync(options.db) || {}),
  new: {},
}

function traverseFiles(files) {
  files.forEach(file => {
    const code = fs.readFileSync(file).toString()
    const ast = parser.parse(code, parserOptions)
    const basePath = path.dirname(file)
    ast.program.body.forEach(node => traverseNode(node, basePath))
  })
}

function traverseNode(node, basePath) {
  switch (node.type) {
    case 'ImportDeclaration':
      const isRelativePath = node.source.value.startsWith('.')
      const importPath = path.resolve(isRelativePath ? basePath : NODE_PATH, node.source.value)
      if (!fileCache.includes(importPath)) {
        try {
          fileCache.push(importPath)
          traverseFiles(require.resolve(importPath))
          indexedFiles.push(importPath)
        } catch {}
      }
      break
    case 'TaggedTemplateExpression':
      if (node.tag.name === 't') {
        const strings = node.quasi.quasis.map(quasi => quasi.value.raw)
        const key = strings.join('\x01')
        const translation = db.old[key] && db.old[key][options.locale] || strings.slice()
        // Skip empty strings & already existing keys
        if (!db.new[key] && translation.join('') !== '') {
          (db.new[key] = {})[options.locale] = translation
        }
      }
      break
    default:
      for (const key in node) {
        if (typeof node[key] === 'object') {
          traverseNode((node[key] || {}), basePath)
        }
      }
  }
}

traverseFiles(options.entry)
const mergedDB = mergeDB(db.old, db.new)
fs.writeFile(options.db, `${JSON.stringify(mergedDB, null, 2)}\n`, (err) => {
  if (err) throw err
})
launchApp({ db, locale: options.locale, out: options.db })


function translate(strings, ...values) {
  const key = strings.join('\x01')
  const translation = (mergedDB[key] && mergedDB[key][translate.locale]) || strings

  return translation.map((string, idx) => [string, values[idx]])
    .reduce((acc, val) => acc.concat(val), [])
    .join('')
}

// Defaults
translate.locale = 'en'
const age = 10
const status  = age > 10 ? translate`high` : translate`low`
console.log(translate`Your age ${age} is ${status}`)

console.log(`
  Indexed files: ${indexedFiles.length}
  Keys total: ${Object.keys(db.new).length}
`)
