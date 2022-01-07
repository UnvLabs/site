import Admonition from "@theme/Admonition";
import React from "react";

let runtimes = {
  py: "Python",
  js: "JavaScript",
  rb: "Ruby",
};

export default function Support(props) {
  return (
    <Admonition type="info" title="Supported Runtimes">
      <ul>
        {Object.entries(runtimes).map(([name, runtime], index) => (
          <li key={index}>
            {props[name] ? "✔️" : "❌"} {runtime}
          </li>
        ))}
      </ul>
    </Admonition>
  );
}
