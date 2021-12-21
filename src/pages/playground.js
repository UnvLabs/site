import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { python } from "@codemirror/lang-python"
import Layout from '@theme/Layout';
import React, { useRef, useEffect, useState } from 'react'
import './playground.css'

export default function Playground() {
  const parent = useRef();
  const preview = useRef()
  useEffect(() => {
    const getGeneratedPageURL = (js) => {
      const getBlobURL = (code, type) => {
        const blob = new Blob([code], { type })
        return URL.createObjectURL(blob)
      }

      const jsURL = getBlobURL(js, 'text/javascript')

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
            ${js && `<script src="${jsURL}"></script>`}
          </body>
        </html>
      `

      return getBlobURL(source, 'text/html')
    }

    let changed;

    let editor = new EditorView({
      state: EditorState.create({
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
        preview.current.src = getGeneratedPageURL(editor.state.doc.toString())
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
