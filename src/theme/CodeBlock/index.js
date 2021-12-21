/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import copy from "copy-text-to-clipboard";
import Translate, { translate } from "@docusaurus/Translate";
import {
  useThemeConfig,
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import usePrismTheme from "@theme/hooks/usePrismTheme";
import styles from "./styles.module.css";
function OldCodeBlock({
  children,
  className: blockClassName,
  metastring,
  title,
}) {
  var _a;
  const { prism } = useThemeConfig();
  const [showCopied, setShowCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  // The Prism theme on SSR is always the default theme but the site theme
  // can be in a different mode. React hydration doesn't update DOM styles
  // that come from SSR. Hence force a re-render after mounting to apply the
  // current relevant styles. There will be a flash seen of the original
  // styles seen using this current approach but that's probably ok. Fixing
  // the flash will require changing the theming approach and is not worth it
  // at this point.
  useEffect(() => {
    setMounted(true);
  }, []);
  // TODO: the title is provided by MDX as props automatically
  // so we probably don't need to parse the metastring
  // (note: title="xyz" => title prop still has the quotes)
  const codeBlockTitle = parseCodeBlockTitle(metastring) || title;
  const prismTheme = usePrismTheme();
  // In case interleaved Markdown (e.g. when using CodeBlock as standalone component).
  const content = Array.isArray(children) ? children.join("") : children;
  const language =
    (_a = parseLanguage(blockClassName)) !== null && _a !== void 0
      ? _a
      : prism.defaultLanguage;
  const { highlightLines, code } = parseLines(content, metastring, language);
  const handleCopyCode = () => {
    copy(code);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  return React.createElement(
    Highlight,
    Object.assign({}, defaultProps, {
      key: String(mounted),
      theme: prismTheme,
      code: code,
      language: language,
    }),
    ({ className, style, tokens, getLineProps, getTokenProps }) =>
      React.createElement(
        "div",
        {
          className: clsx(
            styles.codeBlockContainer,
            blockClassName,
            ThemeClassNames.common.codeBlock
          ),
        },
        codeBlockTitle &&
          React.createElement(
            "div",
            { style: style, className: styles.codeBlockTitle },
            codeBlockTitle
          ),
        React.createElement(
          "div",
          { className: clsx(styles.codeBlockContent, language) },
          React.createElement(
            "pre",
            {
              /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
              tabIndex: 0,
              className: clsx(className, styles.codeBlock, "thin-scrollbar"),
              style: style,
            },
            React.createElement(
              "code",
              { className: styles.codeBlockLines },
              tokens.map((line, i) => {
                if (line.length === 1 && line[0].content === "\n") {
                  line[0].content = "";
                }
                const lineProps = getLineProps({ line, key: i });
                if (highlightLines.includes(i)) {
                  lineProps.className += " docusaurus-highlight-code-line";
                }
                return React.createElement(
                  "span",
                  Object.assign({ key: i }, lineProps),
                  line.map((token, key) =>
                    React.createElement(
                      "span",
                      Object.assign({ key: key }, getTokenProps({ token, key }))
                    )
                  ),
                  React.createElement("br", null)
                );
              })
            )
          ),
          React.createElement(
            "button",
            {
              type: "button",
              "aria-label": translate({
                id: "theme.CodeBlock.copyButtonAriaLabel",
                message: "Copy code to clipboard",
                description: "The ARIA label for copy code blocks button",
              }),
              className: clsx(styles.copyButton, "clean-btn"),
              onClick: handleCopyCode,
            },
            showCopied
              ? React.createElement(
                  Translate,
                  {
                    id: "theme.CodeBlock.copied",
                    description: "The copied button label on code blocks",
                  },
                  "Copied"
                )
              : React.createElement(
                  Translate,
                  {
                    id: "theme.CodeBlock.copy",
                    description: "The copy button label on code blocks",
                  },
                  "Copy"
                )
          )
        )
      )
  );
}

export default function CodeBlock(props) {
  return <OldCodeBlock {...props} />;
}
