import Link from "@docusaurus/Link";
import React from "react";

export default function Example(props) {
  let doc = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  return <Link to={"/playground#" + encodeURIComponent(doc)} target="_blank" />;
}
