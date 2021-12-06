import React from "react";
import { useHistory } from "react-router";
import { Divider } from "semantic-ui-react";
export default function Sentimen({ sentimen }) {
  const history = useHistory();
  const { listingID, id, title, description, imageURL, activity } = sentimen;

  return (
    <div>
      <h3>{activity}</h3>
      <img
        src={imageURL}
        alt={title}
        onClick={() => history.push(`/listings/${listingID}`)}
        width="150px"
        height="90px"
      />
      <h3>{description}</h3>
      <Divider></Divider>
    </div>
  );
}
