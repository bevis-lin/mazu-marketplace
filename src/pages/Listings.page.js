import React from 'react';
import { useParams } from 'react-router-dom';
import useListings from '../hooks/use-listing.hook';
import ListingList from '../components/ListingList';
import ErrorLoadingRenderer from '../components/ErrorLoadingRenderer';
import '../config/config';
import { Container, Divider, Header } from 'semantic-ui-react';

export default function Listings() {
  const { loading, error, data: listings } = useListings();
  const { collectionId } = useParams();
  var collectionName = '';
  //console.log('in listing');
  switch (collectionId) {
    case '1':
      collectionName = 'Mazu';
      break;
    case '2':
      collectionName = 'Hiking';
      break;
    case '3':
      collectionName = 'Plant';
      break;
    case '4':
      collectionName = 'People';
      break;

    default:
      collectionName = 'Sentimen';
      break;
  }

  return (
    <ErrorLoadingRenderer loading={loading} error={error}>
      <Container>
        <Header size="huge" inverted textAlign="left">
          {collectionName} Collection
        </Header>
        <Divider hidden></Divider>
      </Container>

      <ListingList listings={listings} />
    </ErrorLoadingRenderer>
  );
}
