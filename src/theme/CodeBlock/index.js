import React from "react";
import OriginalCodeBlock from "@theme-original/CodeBlock";

export default function CodeBlock(props) {
  return (
    <>
      <OriginalCodeBlock {...props} />
      <sup>
        <a
          target="blank"
          href={
            "/playground#" +
            encodeURIComponent(
              Array.isArray(props.children)
                ? props.children.join("")
                : props.children
            )
          }
        >
          Open in playground &#x2197;
        </a>
      </sup>
    </>
  );
}
