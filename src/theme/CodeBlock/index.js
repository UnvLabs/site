import OldCodeBlock from "@theme-init/CodeBlock";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { python } from "@codemirror/lang-python";
import Layout from "@theme/Layout";
import React, { useRef, useEffect, useState } from "react";

export default function CodeBlock(props) {
  if (props.live) {
  }
  return <OldCodeBlock {...props} />;
}
