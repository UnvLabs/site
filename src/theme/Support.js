import React from "react";
import Admonition from "@theme-original/Admonition";

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
            <label>
              <input type="checkbox" checked={props[name]} readOnly={true} />
              {runtime}
            </label>
          </li>
        ))}
      </ul>
    </Admonition>
  );
}
