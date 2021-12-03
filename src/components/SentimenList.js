import React from "react";
import Sentimen from "./Sentimen";

export default function SentimenList({ sentimes }) {
  console.log(sentimes);

  return (
    <div>
      {sentimes.map((sentimen, i) => (
        <Sentimen key={i} sentimen={sentimen} />
      ))}
    </div>
  );
}
