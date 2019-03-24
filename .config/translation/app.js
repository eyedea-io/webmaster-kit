'use strict';

const fs = require('fs');
const opn = require('opn');
const { mergeDB } = require('./helpers');
const pkg = require('../../package.json');

const chunkRegex = /\$\{[0-9]\}/g;
const chunks = (chunk, i) => (i ? ('${' + (i - 1) + '}') : '') + chunk;

const getRoute = (options, req, res) => {
  const routes = {
    '/': (req, res) => {
      const htmlFragments = Object.keys(options.db.new).map((key, idx) => {
        const defaultSentence = key.split('\x01').map(chunks).join('');
        const localizedSentence = options.db.new[key][options.locale].map(chunks).join('');
        const missingTranslation = defaultSentence === localizedSentence;
        return `
          <div class="group" data-missing-translation="${missingTranslation}">
            <div class="group-item">
              <input disabled rows="1" value="${defaultSentence}" />
            </div>
            <div class="group-item translation">
              <input name="${key}" rows="1" id="${key}" value="${localizedSentence}" />
            </div>
          </div>
        `;
      });

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
          <head>
            <meta charset="utf-8">
            <link rel="icon" data-emoji="🍦" type="image/png">
            <title>Translate</title>
            <style>
              :root {
                --red: #d73a49;
                --text-black: #24292e;
                --text-red: var(--red);
                --border-gray: #d1d5da;
                --border-red: var(--red);
                --border-radius: 3px;
                --bg-black: #24292e;
                --bg-white: white;
                --bg-gray: #f6f8fa;
                --bg-red: var(--red);

                box-sizing: border-box;
                color: var(--text-black);
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
                  sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
                font-size: 14px;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }

              body {
                margin: 0;
              }

              form {
                border: 1px solid var(--border-gray);
                border-radius: var(--border-radius);
                flex: 1;
                padding: 16px;
                margin: 10px;
                display: grid;
                row-gap: 4px;
                max-width: 780px;
              }

              .header {
                font-weight: bold;
                font-size: 14px;
                padding: 8px 0;
              }

              .group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 4px;
              }
              .group[data-missing-translation='true'] .translation {
                border-color: var(--text-red);
              }
              .group-item {
                border: 1px solid var(--border-gray);
              }
              input {
                border-radius: var(--border-radius);
                display: block;
                font-size: inherit;
                width: 100%;
                border: none;
                resize: none;
                padding: 8px;
              }
              input:focus {
                background-color: rgba(141, 247, 194, 0.075);
                outline: none;
              }
              input[disabled] {
                background-color: var(--bg-gray);
              }

              button {
                background-color: var(--bg-black);
                border-radius: var(--border-radius);
                border: 0;
                color: white;
                cursor: pointer;
                font-weight: 500;
                font-size: 16px;
                padding: 20px 32px;
                width: 100%;
              }
            </style>
            <script>
              const favicon = document.querySelector("link[rel=icon]");

              if (favicon) {
                const emoji = favicon.getAttribute("data-emoji");

                if (emoji) {
                  const canvas = document.createElement("canvas");
                  canvas.height = 64;
                  canvas.width = 64;

                  const ctx = canvas.getContext("2d");
                  ctx.font = "64px serif";
                  ctx.fillText(emoji, 0, 64);

                  favicon.href = canvas.toDataURL();
                }
              }

              const handleUpdate = e => {
                e.preventDefault();

                const data = [...e.target.elements]
                  .filter(element => element.nodeName === 'INPUT')
                  .filter(element => !element.disabled)
                  .reduce((obj, element) => {
                    obj[element.name] = {
                      ${options.locale}: element.value.split(${chunkRegex})
                    }
                    return obj;
                  }, {});

                fetch('/update', {
                  method: 'post',
                  body: JSON.stringify(data)
                }).then(res => {
                  if (res.ok) {
                    alert('Your translations have been saved')
                  }
                }).catch(e => alert(e))
              }

              // Confirm
              window.addEventListener('beforeunload', e => {
                e.preventDefault();

                // Chrome requires returnValue to be set
                e.returnValue = '';
              });

              // Exit CLI
              window.addEventListener('unload', e => fetch('/exit'));
            </script>
          </head>
          <body>
            <div>
              <form onsubmit="handleUpdate(event)">
                <div class="group">
                  <div class="header">Original string</div>
                  <div class="header">Translation</div>
                </div>
                ${htmlFragments.join('')}
                <button type="submit">Update translations</button>
              </form>
            </div>
          </body>
        </html>
      `);
    },
    '/update': (req, res) => {
      const body = [];
      const db = {};
      req.on('data', data => body.push(data));
      req.on('end', () => {
        const existingDB = options.db.old;
        const updatedDB = JSON.parse(body.join(''));
        const mergedDB = mergeDB(existingDB, updatedDB);

        fs.writeFile(options.out, `${JSON.stringify(mergedDB, null, 2)}\n`, (err) => {
          if (err) throw err;
          res.writeHead(200, 'OK');
          res.end();
        });
      });
    },
    '/exit': (req, res) => {
      res.writeHead(200, 'OK');
      res.end();
      process.exit(0);
    },
    'default': (req, res) => {
      res.writeHead(404, 'Not Found');
      res.end();
    }
  };
  return (routes[req.url] || routes['default'])(req, res);
};

function launchApp(options = {}, port = 8000) {
  const server = require('http').createServer((req, res) => getRoute(options, req, res));
  return server.listen(port, () => {
    const url = `http://localhost:${port}`;
    opn(url).then(() => console.log('Updating via ' + url));
  });
}

module.exports = launchApp;
