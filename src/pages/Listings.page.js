import React from 'react';
import useListings from '../hooks/use-listing.hook';
import ListingList from '../components/ListingList';
import ErrorLoadingRenderer from '../components/ErrorLoadingRenderer';
import '../config/config';

export default function Listings() {
  const { loading, error, data: listings } = useListings();

  //console.log('in listing');

  return (
    <ErrorLoadingRenderer loading={loading} error={error}>
      <ListingList listings={listings} />
    </ErrorLoadingRenderer>
  );
}
