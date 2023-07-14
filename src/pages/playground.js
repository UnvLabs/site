// @ts-ignore
import React, { Fragment, useEffect, useState, createRef } from "react";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import styles from "./playground.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { format as prettyFormat } from "pretty-format";
// @ts-ignore
import { Parser } from "../unv";
import { tojs } from "../unv";
import { oneDark } from "@codemirror/theme-one-dark";

let sucrase =
  "https://cdn.skypack.dev/pin/sucrase@v3.20.3-gZX9cgIr2LXp7bQ6YAVm/mode=imports,min/optimized/sucrase.js";

function CodeEditor() {
  let parent = createRef();
  let [mounted, setMounted] = useState(false);
  let [code, setCode] = useState([]);
  // @ts-ignore
  window.setCode = setCode;
  // @ts-ignore
  window.code = code;

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
    let Import = new Function("url", "return import(url)");
    Import(sucrase);
    let print = (/** @type {unknown[]} */ ...args) => {
      // @ts-ignore
      window.setCode([...window.code, args.map(prettyFormat).join(" ")]);

      return console.log(...args);
    };

    // @ts-ignore
    window.$assign = (...args) => (args.length == 1 ? args[0] : args);

    let standard = {
      float: (/** @type {string | number} */ v) => +v,
      number: (/** @type {string | number} */ v) => +v,
      int: (/** @type {string | number} */ v) => Math.floor(+v),
      string: (/** @type {string} */ v) => v + "",
      type: (/** @type {any} */ v) => typeof v,
      print,
    };

    let importmap = {
      "@std": {
        io: { print },
        random: { random: Math.random.bind(Math) },
      },
    };

    // @ts-ignore
    window.require = (path) => {
      return path.split("/").reduce((p, c) => {
        // @ts-ignore
        if (p[c]) return p[c];
        throw new TypeError(
          `Imported module ${JSON.stringify(path)} is missing.`
        );
      }, importmap);
    };

    let globals = new Set(Object.keys(standard));
    for (let i in window) {
      globals.add(i);
    }

    // @ts-ignore
    window.run = () => {
      let doc = editor.state.doc.toString()
      window.location.hash = encodeURIComponent(doc);
      // @ts-ignore
      window.setCode([]);
      try {
        doc = tojs(doc);
        Import(sucrase)
          // @ts-ignore
          .then(({ transform }) => {
            let fn = new Function(
              `{${[...globals.values()].filter(n => /^\w+$/.test(n))}}`,
              transform(doc, {
                transforms: ["typescript", "imports"],
              }).code.replace('"use strict";', '')
            );
            fn.call({}, standard);
          })
          // @ts-ignore
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
          // @ts-ignore
          ...oneDark,
        ],
      }),
      parent: parent.current,
    });
  }, []);
  return (
    <>
      <div ref={parent} style={{ position: "relative" }}><button className={`button button--success ${styles.run}`} onClick={() => {
        window.
          // @ts-ignore
          run()
      }}>Run</button></div>
      <div className={styles.preview}>
        {code.map((
          // @ts-ignore
          c, i) => (
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
