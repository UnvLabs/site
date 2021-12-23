import React, { Fragment, useEffect, useState, createRef } from "react";
import Layout from "@theme/Layout";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { python } from "@codemirror/lang-python"
import styles from "./playground.module.css";
import BrowserOnly from '@docusaurus/BrowserOnly';

function compile(input) {
  input = input.replace(
    /("(?:\\["\\]|[^"\\])*"|'(?:\\['\\]|[^'\\])*')|###[^]*?###|#.*/gm,
    (_, string) => (string ? string.replace("\n", "\\n") : "")
  );
  let lines = input.split("\n");
  let comment = false;
  let indents = [];
  let output = "";
  for (let line of lines) {
    let statement = line.match(
      /^(\s*)(if|else|switch|try|catch|(?:async\s+)?function\*?|class|do|while|for)\s+(.+)/
    );
    if (statement) {
      let [, spaces, name, args] = statement;
      indents.unshift(spaces.length);
      output += `${spaces}${name} ${/function|try|class/.test(name) ? args : `(${args})`
        } {\n`;
    } else {
      let spaces = line.match(/^\s*/)[0].length;
      for (let indent of [...indents]) {
        if (indent < spaces) break;
        output += `${" ".repeat(indent)}}\n`;
        indents.shift();
      }
      output += line.replace(/^(\s*)var(\s)/, "$1let$2") + "\n";
    }
  }
  return output;
}

function CodeEditor() {
  let parent = createRef()
  let logs = createRef()
  let [mounted, setMounted] = useState(false)
  useEffect(() => {
    window.print = (...args) => {
      let pre = document.createElement('pre')
      let code = document.createElement('pre')
      code.textContent = args.join(' ')
      pre.appendChild(code)
      logs.current.appendChild(pre)
      return console.log(...args)
    }

    if (mounted)
      return
    setMounted(true)

    let editor = new EditorView({
      state: EditorState.create({
        doc: `if 'Unv is awesome!'
    print('Hello World!')
# keep editing for live results
`,
        extensions: [
          basicSetup,
          python(),
          EditorView.theme({
            "&": { height: "40vh" },
            ".cm-scroller": { overflow: "auto" }
          }),
          EditorView.updateListener.of(v => {
            if (v.docChanged) {
              if (logs.current) logs.current.textContent = ''
              try {
                let fn = new Function(compile(editor.state.doc.toString()))
                fn()
              } catch {
              }
            }
          })
        ]
      }),
      parent: parent.current
    })
  }, [])
  return <>
    <div ref={parent}></div>
    <div ref={logs} className={styles.preview} ></div>
  </>
}

export default function Playground() {
  return (
    <Layout>
      <h1>Playground</h1>
      <div className={styles.playground}>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            return <CodeEditor />
          }}
        </BrowserOnly>
      </div>
    </Layout>
  );
}
