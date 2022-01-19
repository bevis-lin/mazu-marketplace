import React from 'react';
import Listing from './Listing';
import { Card, Container, Header } from 'semantic-ui-react';

export default function ListingList({ listings }) {
  //console.log(listings);

  const getListingList = (listings) => {
    return listings.map((listing, i) => <Listing key={i} listing={listing} />);
  };

  return (
    <Container>
      {listings.length > 0 ? (
        <Card.Group itemsPerRow={3}>{getListingList(listings)}</Card.Group>
      ) : (
        <Header inverted textAlign="left">
          Currently no sale for this collection.
        </Header>
      )}
    </Container>
  );
}
