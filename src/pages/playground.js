import React, { Fragment, useEffect, useState, createRef } from "react";
import Layout from "@theme/Layout";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { python } from "@codemirror/lang-python"
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

function CodeEditor() {
  return <BrowserOnly fallback={<div>Loading...</div>}>
    {() => {
      let parent = createRef()
      useEffect(() => {
        let editor = new EditorView({
          state: EditorState.create({
            doc: `print('Hello World!)`,
            extensions: [basicSetup, python(), EditorView.theme({
              "&": { height: "40vh" },
              ".cm-scroller": { overflow: "auto" }
            })]
          }),
          parent: ref.current
        })
      }, [])
      return <div ref={parent}></div>
    }}
  </BrowserOnly>
}

export default function Playground() {
  return (
    <Layout>
      <h1>Playground</h1>
      <div className={styles.playground}>
        <CodeEditor />
        <div className={styles.preview}></div>
      </div>
    </Layout>
  );
}
