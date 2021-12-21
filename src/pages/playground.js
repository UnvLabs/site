import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { python } from "@codemirror/lang-python"
import Layout from '@theme/Layout';
import React, { useRef, useEffect, useState } from 'react'

export default function Playground() {
  const parent = useRef();
  const preview = useRef()
  useEffect(() => {
    const getGeneratedPageURL = (js) => {
      const getBlobURL = (code, type) => {
        const blob = new Blob([js], { type })
        return URL.createObjectURL(blob)
      }

      const jsURL = getBlobURL(js, 'text/javascript')

      const source = `
        <html>
          <head>
            ${js && `<script src="${jsURL}"></script>`}
          </head>
          <body>
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
      <iframe ref={preview}></iframe>
    </Layout>
  );
}
