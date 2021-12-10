import { query } from '@onflow/fcl';
import { useEffect, useReducer } from 'react';
import { GET_USER_COLLECTION } from '../flow/get-user-collection.script';
import { defaultReducer } from '../reducer/defaultReducer';
import SentimenClass from '../utils/SentimenClass';

export default function useUserSentimens() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    const fetchSentimens = async () => {
      dispatch({ type: 'PROCESSING' });

      try {
        var res;

        res = await query({
          cadence: GET_USER_COLLECTION,
          args: (arg, t) => [arg('0x01cf0e2f2f715450', t.Address)],
        });

        let mappedSentimens = [];

        //console.log(res.nftMetadatas);
        res.nftMetadatas.forEach((element) => {
          //console.log(element);
          let sentimen = SentimenClass.SentimenFactoryForCollection(element);
          mappedSentimens.push(sentimen);
        });

        dispatch({ type: 'SUCCESS', payload: mappedSentimens });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR' });
      }
    };

    fetchSentimens();
  }, []);

  return {
    ...state,
  };
}
