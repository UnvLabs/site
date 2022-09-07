import React, { Fragment, useEffect, useState, createRef } from "react";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import styles from "./playground.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { format as prettyFormat } from "pretty-format";
import { Parser } from "../unv";
import { tojs } from "../unv";
import { oneDark } from "@codemirror/theme-one-dark";

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
    let globals = [];
    for (let i in window) {
      globals.push(i);
    }
    let Import = new Function("url", "return import(url)");
    Import(sucrase);
    let print = (...args) => {
      window.setCode([...window.code, args.map(prettyFormat).join(" ")]);

      return console.log(...args);
    };

    window.$assign = (...args) => (args.length == 1 ? args[0] : args);

    let standard = {
      float: (v) => +v,
      number: (v) => +v,
      int: (v) => Math.floor(+v),
      string: (v) => v + "",
      type: (v) => typeof v,
      print,
    };

    let importmap = {
      "@std": {
        io: { print },
        random: { random: Math.random.bind(Math) },
      },
    };

    window.require = (path) => {
      return path.split("/").reduce((p, c) => {
        if (p[c]) return p[c];
        throw new TypeError(
          `Imported module ${JSON.stringify(path)} is missing.`
        );
      }, importmap);
    };

    Object.assign(window, standard);

    let run = (doc) => {
      window.location.hash = encodeURIComponent(doc);
      window.setCode([]);
      try {
        doc = tojs(doc);
        Import(sucrase)
          .then(({ transform }) => {
            let fn = new Function(
              ...globals,
              transform(doc, {
                transforms: ["typescript", "imports"],
              }).code
            );
            fn.call({});
          })
          .catch((error) => {
            print(error);
            console.log(doc);
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
            "&": { height: "40vh", fontSize: "1rem" },
            ".cm-scroller": { overflow: "auto" },
          }),
          ...oneDark,
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
