import React from 'react';
import { useHistory } from 'react-router';
import { Image, Grid, Divider, Segment } from 'semantic-ui-react';
export default function Sentimen({ sentimen }) {
  const history = useHistory();
  const {
    listingID,
    title,
    description,
    imageURL,
    activity,
    creator,
    salePrice,
  } = sentimen;

  return (
    <div>
      <Grid>
        <Grid.Column width={1} />
        <Grid.Column width={7}>
          <Segment color="black">{title}</Segment>
          <Image
            src={`/images/${creator}/${imageURL}`}
            onClick={() => history.push(`/listings/${listingID}`)}
            bordered
          />
        </Grid.Column>
        <Grid.Column width={7}>
          <Segment color="black">{description}</Segment>
          <Segment>
            Activity：
            <br />
            {activity}
          </Segment>
          <Segment>
            Photographer：
            <br />
            {creator}
          </Segment>
          {(() => {
            if (listingID > 0) {
              return (
                <Segment>
                  Price:
                  <br />
                  {salePrice}
                </Segment>
              );
            }
          })()}
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
      <Divider hidden></Divider>
    </div>
  );
}
