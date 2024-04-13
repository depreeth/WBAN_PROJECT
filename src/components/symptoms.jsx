import React from "react";

export default function Symptom(props) {
  return (
    <div>
      <ul>
        {props.text.map((organ, index) => {
          return (
            <div>
              <li key={index}>{organ}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}