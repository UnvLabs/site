import React, { Fragment, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Editor from 'react-simple-code-editor';
import Highlight, { Prism } from 'prism-react-renderer';
import styles from "./playground.module.css";
import usePrismTheme from '@theme/hooks/usePrismTheme';

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

export default function Playground() {
  const [code, setCode] = useState(
    ``
  );
  const [mounted, setMounted] = useState(false)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if(!mounted) {
      window.print = (...args) => {
        setLogs([
          ...logs,
          (<pre key={logs.length}>
            <code>{args.join(' ')}</code>
          </pre>)
        ])
        return console.log(...args)
      }
      setMounted(true)
    }
  }, [])
  
  return (
    <Layout>
      <h1>Playground</h1>
      <div className={styles.playground}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={code => (
    <Highlight
      Prism={Prism}
      code={code}
      tabSize={4}
      className={styles.codeEditor}
      theme={usePrismTheme()}
      language={'python'}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  )}
        />
        <div className={styles.preview}>
          {logs}
        </div>
      </div>
    </Layout>
  );
}
