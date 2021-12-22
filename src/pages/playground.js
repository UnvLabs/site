import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { python } from "@codemirror/lang-python"
import Layout from '@theme/Layout';
import React, { useRef, useEffect, useState } from 'react'
import './playground.css'

export default function Playground() {
function compile(input) {
  input = input.replace(
    /("(?:\\["\\]|[^"\\])*"|'(?:\\['\\]|[^'\\])*')|###[^]*?###|#.*/gm,
    (_, string) => (string ? string.replace('\n', '\\n') : '')
  );
  let lines = input.split('\n');
  let comment = false;
  let indents = [];
  let output = '';
  for (let line of lines) {
    let statement = line.match(
      /^(\s*)(if|else|switch|try|catch|(?:async\s+)?function\*?|class|do|while|for)\s+(.+)/
    );
    if (statement) {
      let [, spaces, name, args] = statement;
      indents.unshift(spaces.length);
      output += `${spaces}${name} ${/function|try|class/.test(name) ? args : `(${args})`} {\n`;
    } else {
      let spaces = line.match(/^\s*/)[0].length;
      for (let indent of [...indents]) {
        if (indent < spaces) break;
        output += `${' '.repeat(indent)}}\n`;
        indents.shift();
      }
      output += line + '\n';
    }
  }
  return output;
}

  const parent = useRef();
  const preview = useRef()
  useEffect(() => {
    const getGeneratedPageURL = (js) => {
      const getBlobURL = (code, type) => {
        const blob = new Blob([code], { type })
        return URL.createObjectURL(blob)
      }

      const source = `
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
            #console {
              background: whitesmoke;
            }
            
            pre {
              overflow-x: auto;
              padding: 0.25rem;
            }
            </style>
          </head>
          <body>
            <div id="console">
            </div>
            <script>
              var virtual = document.getElementById('console')
              var real = console;
              window.console = new Proxy(real, {
                get: function(target, property, receiver) {
                  return function() {
                    var block = document.createElement('pre')
                    var code = document.createElement('code')
                    code.textContent = [].slice.call(arguments).join(' ')
                    block.appendChild(code)
                    virtual.appendChild(block)
                    return target[property].apply(console, arguments)
                  }
                }
              });
            </script>
            ${js && `<script type="module">${js}</script>`}
          </body>
        </html>
      `

      return getBlobURL(source, 'text/html')
    }

    let changed;

    let editor = new EditorView({
      state: EditorState.create({
        doc: `var unv = true
var awesome = true
if unv == awesome
    console.log('Unv is awesome')
else
    console.log('Unv is not awesome')
`,
        extensions: [basicSetup,
          python(),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) changed = true
          })]
      }),
      parent: parent.current
    })

    let update = setInterval(() => {
      if (changed) {
        changed = false
        preview.current.src = getGeneratedPageURL(compile(editor.state.doc.toString()))
      }
    }, 1000)

    return () => {
      editor.destroy()
      clearInterval(update)
    }
  })
  return (
    <Layout>
      <main ref={parent}>
      </main>
      <iframe ref={preview} className="preview"></iframe>
    </Layout>
  );
}
