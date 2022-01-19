import { useEffect, useState } from 'react';
import { mutate, query, tx } from '@onflow/fcl';
import { useAuth } from '../providers/AuthProvider';
import { CHECK_COLLECTION } from '../flow/check-collection.script';
import { DELETE_COLLECTION } from '../flow/delete-collection.tx';
import { CREATE_COLLECTION } from '../flow/create-collection.tx';
import { useTxs } from '../providers/TxProvider';

export default function useCollection() {
  const { user, loggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasCollection, setHasCollection] = useState(false);
  const { addTx } = useTxs();

  useEffect(() => {
    const checkCollection = async () => {
      try {
        let res = await query({
          cadence: CHECK_COLLECTION,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });
        setHasCollection(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (!loggedIn) {
      console.log(`skip use-collection useEffect`);
      return;
    }

    setLoading(true);
    checkCollection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const createCollection = async () => {
    let res = await mutate({
      cadence: CREATE_COLLECTION,
      limit: 55,
    });
    addTx(res);
    await tx(res).onceSealed();
    setHasCollection(true);
  };

  const deleteCollection = async () => {
    let res = await mutate({
      cadence: DELETE_COLLECTION,
      limit: 1000,
    });
    addTx(res);
    await tx(res).onceSealed();
    setHasCollection(false);
  };

  return {
    loading,
    hasCollection,
    createCollection,
    deleteCollection,
  };
}
