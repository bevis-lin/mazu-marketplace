import { mutate, query, tx } from '@onflow/fcl';
import { useEffect, useReducer } from 'react';
import { useTxs } from '../providers/TxProvider';
import { GET_USER_COLLECTION } from '../flow/get-user-collection.script';
import { PURCHASE_SENTIMEN } from '../flow/purchase-sentimen.tx';
import { userSentimenReducer } from '../reducer/userSentimenReducer';
import SentimenClass from '../utils/SentimenClass';

export default function useUserSentimens(user, collection, getFLOWBalance) {
  const [state, dispatch] = useReducer(userSentimenReducer, {
    loading: false,
    error: false,
    data: [],
  });
  const { addTx, runningTxs } = useTxs();

  useEffect(() => {
    const fetchSentimens = async () => {
      //console.log(user?.addr);

      dispatch({ type: 'PROCESSING' });

      try {
        var res;

        res = await query({
          cadence: GET_USER_COLLECTION,
          args: (arg, t) => [arg(user?.addr, t.Address)],
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

  const purchaseSentimen = async (
    sentimenId,
    listingID,
    storefrontAddress,
    amount
  ) => {
    if (!collection) {
      alert(
        'You need to enable the collection first. Go to the tab Collection'
      );
      return;
    }
    if (runningTxs) {
      alert(
        'Transactions are still running. Please wait for them to finish first.'
      );
      return;
    }
    try {
      console.log(`purchase amount ${amount}`);
      let res = await mutate({
        cadence: PURCHASE_SENTIMEN,
        limit: 1000,
        args: (arg, t) => [
          arg(listingID, t.UInt64),
          arg(storefrontAddress, t.Address),
          arg(amount, t.UFix64),
        ],
      });
      addTx(res);
      await tx(res).onceSealed();
      await addSentimen(sentimenId);
      await getFLOWBalance();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const addSentimen = async (sentimenId) => {
    try {
      var res;

      res = await query({
        cadence: GET_USER_COLLECTION,
        args: (arg, t) => [arg(user?.addr, t.Address)],
      });

      let mappedSentimens = [];

      //console.log(res.nftMetadatas);
      res.nftMetadatas.forEach((element) => {
        //console.log(element);
        let sentimen = SentimenClass.SentimenFactoryForCollection(element);
        mappedSentimens.push(sentimen);
      });

      const newSentimen = mappedSentimens.find((s) => s?.id === sentimenId);
      dispatch({ type: 'ADD', payload: newSentimen });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    ...state,
    purchaseSentimen,
    addSentimen,
  };
}
