import React, { Fragment, useEffect, useState, createRef } from "react";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { python } from "@codemirror/lang-python";
import styles from "./playground.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";

function compile(input) {
  input = input.replace(
    /("(?:\\["\\]|[^"\\])*"|'(?:\\['\\]|[^'\\])*')|###[^]*?###|#.*/gm,
    (_, string) => (string ? string.replace(/\n/g, "\\n") : "")
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
      output +=
        line.replace(/^([\w\s,=]+)=(.*)/, (_, start, end) => {
          let vars = start.split("=");
          return `${
            vars.length > 1 ? `var ${vars.slice(1).join(",")}\n` : ""
          }var ${vars
            .map((a) => (~a.indexOf(",") ? `[${a}]` : a))
            .join("=")}=$assign(${end})`;
        }) + "\n";
    }
  }
  return output;
}

let sucrase =
  "https://cdn.skypack.dev/pin/sucrase@v3.20.3-gZX9cgIr2LXp7bQ6YAVm/mode=imports,min/optimized/sucrase.js";

function CodeEditor() {
  let parent = createRef();
  let [mounted, setMounted] = useState(false);
  let [code, setCode] = useState([]);
  window.setCode = setCode;
  window.code = code;

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
    let Import = new Function("url", "return import(url)");
    Import(sucrase);
    let print = (...args) => {
      window.setCode([
        ...window.code,
        args
          .map((arg) => {
            if (arg.toString === Object.prototype.toString)
              try {
                return JSON.stringify(arg, undefined, 2);
              } catch {}
            return arg + "";
          })
          .join(" "),
      ]);

      return console.log(...args);
    };

    window.$assign = (...args) => (args.length == 1 ? args[0] : args);

    window.require = (path) => {
      return {
        standard: {
          float: (v) => +v,
          number: (v) => +v,
          int: (v) => Math.floor(+v),
          string: (v) => v + "",
          type: (v) => typeof v,
          print,
        },
      }[path];
    };

    let run = (doc) => {
      window.location.hash = encodeURIComponent(doc);
      window.setCode([]);
      try {
        Import(sucrase)
          .then(({ transform }) => {
            let fn = new Function(
              transform(compile(doc), {
                transforms: ["typescript", "imports"],
              }).code
            );
            fn();
          })
          .catch((error) => {
            print(error);
          });
      } catch (error) {
        print(error);
      }
    };
    let editor = new EditorView({
      state: EditorState.create({
        doc:
          decodeURIComponent(window.location.hash.slice(1)) ||
          `if 'Unv is awesome!'
    print('Hello World!')
# keep editing for live results
`,
        extensions: [
          basicSetup,
          python(),
          EditorView.theme({
            "&": { height: "40vh" },
            ".cm-scroller": { overflow: "auto" },
          }),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) run(editor.state.doc.toString());
          }),
        ],
      }),
      parent: parent.current,
    });
    run(editor.state.doc.toString());
  }, []);
  return (
    <>
      <div ref={parent}></div>
      <div className={styles.preview}>
        {code.map((c, i) => (
          <CodeBlock key={i} className="language-js">
            {c}
          </CodeBlock>
        ))}
      </div>
    </>
  );
}

export default function Playground() {
  return (
    <Layout>
      <div className={"container"}>
        <h1>Playground</h1>
        <div className={styles.playground}>
          <BrowserOnly fallback={<div>Loading...</div>}>
            {() => {
              return <CodeEditor />;
            }}
          </BrowserOnly>
        </div>
      </div>
    </Layout>
  );
}
