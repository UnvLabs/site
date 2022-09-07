import Link from "@docusaurus/Link";
import React from "react";

export default function Example(props) {
  return (
    <Link to={"/playground#" + encodeURIComponent(props.code)} target="_blank">
      Try it
    </Link>
  );
}
