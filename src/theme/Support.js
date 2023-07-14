import Admonition from "@theme/Admonition";
import Link from "@docusaurus/Link";
import React from "react";

let runtimes = {
  py: "Python",
  js: "JavaScript",
  rb: "Ruby",
};

export default function Support(props) {
  return (
    <Admonition type="info" title="Supported Runtimes">
      <p>Check is your flavour of Unv is supported.</p>
      <ul>
        {Object.entries(runtimes).map(([name, runtime], index) => (
          <li key={index}>
            <Link to={"/runtimes/" + runtime.toLowerCase()}>
              {props[name] ? "✔️" : "❌"} {runtime}
            </Link>
          </li>
        ))}
      </ul>
    </Admonition>
  );
}
