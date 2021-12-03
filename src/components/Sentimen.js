import React from "react";

export default function Sentimen({ sentimen }) {
  const { id, title, description, imageURL, activity } = sentimen;

  return (
    <div>
      <img src={imageURL} alt={title} width="150px" height="90px" />
      <h3>{description}</h3>
    </div>
  );
}
