import { query } from '@onflow/fcl';
import { useEffect, useReducer } from 'react';
import { GET_LISTINGS } from '../flow/get-listings.script';
import { GET_LISTINGS_BY_ACTIVITY } from '../flow/get-listings-by-activity.script';
import { listingReducer } from '../reducer/listingReducer';
import ListingClass from '../utils/ListingClass';
import { useParams } from 'react-router-dom';

export default function useListings() {
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

        console.log(res);
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
  }, []);

  return {
    ...state,
  };
}
