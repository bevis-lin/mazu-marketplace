import { useEffect, useReducer } from 'react';
import { mutate, query, tx } from '@onflow/fcl';
import { useTxs } from '../providers/TxProvider';
import { CHECK_IS_SENTIMEN_LISTED } from '../flow/check-is-sentimen-listed.script';
import { CREATE_STOREFRONT_LISTING } from '../flow/create-storefront-listing.tx';
import { GET_LISTINGS } from '../flow/get-listings.script';
import { GET_LISTINGS_BY_ACTIVITY } from '../flow/get-listings-by-activity.script';
import { listingReducer } from '../reducer/listingReducer';
import ListingClass from '../utils/ListingClass';
import { useParams } from 'react-router-dom';

export default function useListings() {
  const { addTx, runningTxs } = useTxs();
  const [state, dispatch] = useReducer(listingReducer, {
    loading: true,
    error: false,
    data: [],
  });

  const { activityID } = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      dispatch({ type: 'PROCESSING' });

      try {
        var res;

        if (activityID) {
          res = await query({
            cadence: GET_LISTINGS_BY_ACTIVITY,
            args: (arg, t) => [
              arg(parseInt(activityID), t.UInt),
              arg(0, t.Int),
              arg(10, t.Int),
            ],
          });
        } else {
          res = await query({
            cadence: GET_LISTINGS,
            args: (arg, t) => [arg(0, t.Int), arg(10, t.Int)],
          });
        }

        let mappedListings = [];

        //console.log(res);
        res.displayItems.forEach((element) => {
          let listing = ListingClass.ListingFactory(element);
          mappedListings.push(listing);
        });

        dispatch({ type: 'SUCCESS', payload: mappedListings });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR' });
      }
    };

    fetchListings();
  }, [activityID]);

  const createStorefrontListing = async (nftId, salePrice, activityId) => {
    console.log('about to createStorefrontListing...');
    if (runningTxs) {
      alert(
        'Transactions are still running. Please wait for them to finish first.'
      );
      return;
    }

    try {
      var res;
      res = await mutate({
        cadence: CREATE_STOREFRONT_LISTING,
        limit: 1000,
        args: (arg, t) => [
          arg(nftId, t.UInt64),
          arg(salePrice, t.UFix64),
          arg(activityId, t.UInt),
        ],
      });
      addTx(res);
      await tx(res).onceSealed();
      //setListed(checkIsListedOnStorefront(nftId));
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const checkIsListedOnStorefront = async (sentimen) => {
    try {
      //console.log(nftId);
      let res = await query({
        cadence: CHECK_IS_SENTIMEN_LISTED,
        args: (arg, t) => [arg(sentimen.id, t.UInt64)],
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    ...state,
    createStorefrontListing,
    checkIsListedOnStorefront,
  };
}
