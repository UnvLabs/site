import Link from "@docusaurus/Link";
import React from "react";

export default function Example({ code = "", setup = "" }) {
  return (
    <>
      <code>{code}</code>{" "}
      <Link
        to={"/playground#" + encodeURIComponent(setup + "\n\n" + code)}
        target="_blank"
      >
        {"▶"}
      </Link>
    </>
  );
}
