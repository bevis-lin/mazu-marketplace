import { query } from '@onflow/fcl';
import { useEffect, useReducer } from 'react';
import { GET_FLOW_BALANCE } from '../flow/get-flow-balance.script';
import { defaultReducer } from '../reducer/defaultReducer';
import { useAuth } from '../providers/AuthProvider';
export default function useFLOW() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  });

  const { user, loggedIn } = useAuth();

  //console.log('log from use flow..');

  useEffect(() => {
    if (loggedIn) {
      getFLOWBalance();
    } else {
      console.log('skip use-flow useEffect..');
    }

    //eslint-disable-next-line
  }, [loggedIn]);

  const getFLOWBalance = async () => {
    dispatch({ type: 'PROCESSING' });
    try {
      let res = await query({
        cadence: GET_FLOW_BALANCE,
        args: (arg, t) => [arg(user?.addr, t.Address)],
      });
      //console.log(res);
      dispatch({ type: 'SUCCESS', payload: res });
    } catch (err) {
      dispatch({ type: 'ERROR' });
      console.log(err);
    }
  };

  return {
    ...state,
    getFLOWBalance,
  };
}
