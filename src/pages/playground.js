import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { python } from "@codemirror/lang-python";
import Layout from "@theme/Layout";
import React, { useRef, useEffect, useState } from "react";
import styles from "./playground.module.css";

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

function Editor(props) {
  const parent = useRef();
  useEffect(() => {
    let changed = false
    let editor = new EditorView({
      state: EditorState.create({
        doc: `var unv = true
var awesome = true
if unv == awesome
    print('Unv is awesome')
else
    print('Unv is not awesome')
`,
        extensions: [
          basicSetup,
          python(),
          EditorView.updateListener.of((v) => {
            if (v.docChanged)
              changed = true
          }),
        ],
      }),
      parent: parent.current,
    });
    
    let interval = setInterval(() => {
      if (changed && props.onChange) {
        props.onChange(editor.state.doc.toString())
        changed = false
      }
    }, 500)
    return () => {
      clearInterval(interval)
      editor.destroy()
    }
  });
  return <div ref={parent} />
}
export default function Playground() {
  let [logs, setLogs] = useState([])
  useEffect(() => {
    window.print = (...args) => 
        setLogs([
          ...logs,
          (<pre key={ logs.length }>
            <code>{args.join}(' ')</code>
          </pre>)
        ])
  })
  return (
    <Layout>
      <div className={styles.playground}>
        <Editor onChange={code => {
          let fn = new Function(compile(code))
          try {
            fn()
          } catch (e) {
          }
        }}/>
        <div className={styles.preview}>
          {logs}
        </div>
      </div>
    </Layout>
  );
}
