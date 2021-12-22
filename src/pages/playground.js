import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { python } from "@codemirror/lang-python";
import Layout from "@theme/Layout";
import React, { useRef, useEffect, useState } from "react";
import "./playground.css";

export default function Playground() {
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
        output += `${spaces}${name} ${
          /function|try|class/.test(name) ? args : `(${args})`
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

  const parent = useRef();
  useEffect(() => {
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
        extensions: [
          basicSetup,
          python(),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) changed = true;
          }),
        ],
      }),
      parent: parent.current,
    });

    let update = setInterval(() => {
      if (changed) {
        changed = false;
        compile(editor.state.doc.toString());
      }
    }, 1000);

    return () => {
      editor.destroy();
      clearInterval(update);
    };
  });
  return (
    <Layout>
      <main ref={parent}></main>
    </Layout>
  );
}
