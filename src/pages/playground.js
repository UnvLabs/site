import React, { Fragment, useEffect, useState, createRef } from "react";
import Layout from "@theme/Layout";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { python } from "@codemirror/lang-python"
import styles from "./playground.module.css";
import BrowserOnly from '@docusaurus/BrowserOnly';

function compile(input) {
  input = input.replace(
    /("(?:\\["\\]|[^"\\])*"|'(?:\\['\\]|[^'\\])*')|###[^]*?###|#.*/gm,
    (_, string) => (string ? string.replace(/\n/g, '\\n') : '')
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
      output += `${spaces}${name} ${/function|try|class/.test(name) ? args : `(${args})`} {${/function/.test(name) ? 'let $locals = {}' : ''}\n`;
    } else {
      let spaces = line.match(/^\s*/)[0].length;
      for (let indent of [...indents]) {
        if (indent < spaces) break;
        output += `${' '.repeat(indent)}}\n`;
        indents.shift();
      }
      let variable = line.match(/^(\s*)([A-Za-z_]\w*)(\s*=.*)/)
      if(variable)
        output += variable[1] + 'var ' + variable[2] + '=' + '$locals.' + variable[2] + variable[3] + '\n';
      else
        output += line + '\n';
    }
  }
  return 'let $globals = {}, $locals = $globals;' + output;
}

function CodeEditor() {
  let parent = createRef()
  let [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (mounted)
      return
    setMounted(true)

    window.print = (...args) => {
      let pre = document.createElement('pre')
      let code = document.createElement('code')
      code.textContent = args.map(arg => {
        if (arg.toString === Object.prototype.toString)
          try {
            return JSON.stringify(arg, undefined, 2)

          } catch { }
        return arg + ''
      }).join(' ')
      pre.appendChild(code)
      document.querySelector('.' + styles.preview).appendChild(pre)
      return console.log(...args)
    }
    
    window.number = v => +v
    
    window.string = v => v + ''
    
    window.type = v => typeof v
    
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
              document.querySelector('.' + styles.preview).textContent = ''
              try {
                let fn = new Function(compile(editor.state.doc.toString()))
                fn()
              } catch(e) {
                print(e)
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
    <div className={styles.preview} ></div>
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
