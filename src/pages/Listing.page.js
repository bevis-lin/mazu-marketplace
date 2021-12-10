import React, { useEffect, useState } from 'react';
import { query } from '@onflow/fcl';
import { useParams } from 'react-router';
import { GET_LISTING } from '../flow/get-listing.script';
import SentimenClass from '../utils/SentimenClass';

export default function Listing() {
  const [sentimen, setSentimen] = useState([]);
  const { listingID } = useParams();

  useEffect(() => {
    getListingDetail(listingID);
  }, []);

  const getListingDetail = async (ID) => {
    try {
      //console.log(ID);
      const res = await query({
        cadence: GET_LISTING,
        args: (arg, t) => [arg(parseInt(ID), t.UInt64)],
      });

      console.log(res);

      let element = res.displayItems[0];

      let sentimen = SentimenClass.SentimenFactory(element);
      setSentimen(sentimen);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Listing detail</h3>
      <img src={sentimen.imageURL} />
      <div>{sentimen.title}</div>
      <div>{sentimen.creator}</div>
    </div>
  );
}
