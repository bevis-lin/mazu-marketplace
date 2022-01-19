import React from 'react';
import Listing from './Listing';
import { createMedia } from '@artsy/fresnel';
import { Card, Container, Header } from 'semantic-ui-react';

export default function ListingList({ listings }) {
  //console.log(listings);

  const { MediaContextProvider, Media } = createMedia({
    // breakpoints values can be either strings or integers
    breakpoints: {
      sm: 0,
      md: 768,
      lg: 1024,
      xl: 1192,
    },
  });

  const getListingList = (listings) => {
    return listings.map((listing, i) => <Listing key={i} listing={listing} />);
  };

  return (
    <Container>
      {listings.length == 0 ? (
        <Header inverted textAlign="left">
          Currently no sale for this collection.
        </Header>
      ) : (
        <MediaContextProvider>
          <Media greaterThanOrEqual="lg">
            <Container>
              <Card.Group itemsPerRow={3}>
                {getListingList(listings)}
              </Card.Group>
            </Container>
          </Media>
          <Media at="md">
            <Container>
              <Card.Group itemsPerRow={2}>
                {getListingList(listings)}
              </Card.Group>
            </Container>
          </Media>
          <Media at="sm">
            <Container>
              <Card.Group itemsPerRow={1}>
                {getListingList(listings)}
              </Card.Group>
            </Container>
          </Media>
        </MediaContextProvider>
      )}
    </Container>
  );
}
