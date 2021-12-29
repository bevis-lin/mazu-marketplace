import React from 'react';
import Listing from './Listing';
import { Card, Container } from 'semantic-ui-react';

export default function ListingList({ listings }) {
  console.log(listings);

  const getListingList = (listings) => {
    return listings.map((listing, i) => <Listing key={i} listing={listing} />);
  };

  return (
    <Container>
      <Card.Group itemsPerRow={3}>{getListingList(listings)}</Card.Group>
    </Container>
  );
}
