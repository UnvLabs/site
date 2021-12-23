import Layout from "@theme/Layout";
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Highlight, {defaultProps, Language} from 'prism-react-renderer';
import copy from 'copy-text-to-clipboard';
import Translate, {translate} from '@docusaurus/Translate';
import {
  useThemeConfig,
  parseLanguage,
  parseLines,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import usePrismTheme from '@theme/hooks/usePrismTheme';
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
  const {prism} = useThemeConfig();

  const [showCopied, setShowCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState([[], '']);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prismTheme = usePrismTheme();

  const handleCopyCode = () => {
    copy(code[1]);
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Highlight
      {...defaultProps}
      key={String(mounted)}
      theme={prismTheme}
      code={code[1]}
      language={'python' }>
      {({ className, style, tokens, getLineProps, getTokenProps}) => (
        <div
          className={clsx(
            styles.codeBlockContainer,
            ThemeClassNames.common.codeBlock,
          )}>
          <div className={clsx(styles.codeBlockContent, 'python')}>
            <pre
              tabIndex={0}
              className={clsx(className, styles.codeBlock, 'thin-scrollbar')}
              style={style}>
              <code className={styles.codeBlockLines}>
                {tokens.map((line, i) => {
                  if (line.length === 1 && line[0].content === '\n') {
                    line[0].content = '';
                  }

                  const lineProps = getLineProps({line, key: i});

                  if (code[0].includes(i)) {
                    lineProps.className += ' docusaurus-highlight-code-line';
                  }

                  return (
                    <span key={i} {...lineProps}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({token, key})} />
                      ))}
                      <br />
                    </span>
                  );
                })}
              </code>
              <textarea className={styles.codeEditor} key={"static"} onChange={event => {
                const {highlightLines, code} = parseLines(event.target.value, undefined, 'python');
                setCode([highlightLines, code])
              }}/>
            </pre>
            <button
              type="button"
              aria-label={translate({
                id: 'theme.CodeBlock.copyButtonAriaLabel',
                message: 'Copy code to clipboard',
                description: 'The ARIA label for copy code blocks button',
              })}
              className={clsx(styles.copyButton, 'clean-btn')}
              onClick={handleCopyCode}>
              {showCopied ? (
                <Translate
                  id="theme.CodeBlock.copied"
                  description="The copied button label on code blocks">
                  Copied
                </Translate>
              ) : (
                <Translate
                  id="theme.CodeBlock.copy"
                  description="The copy button label on code blocks">
                  Copy
                </Translate>
              )}
            </button>
          </div>
        </div>
      )}
    </Highlight>
  );
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
