import React from "react";

let runtimes = {
  py: "Python",
  js: "JavaScript",
  rb: "Ruby",
};

export default function Support(props) {
  return (
    <div>
      <b>Supported Runtimes</b>
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
    </div>
  );
}
