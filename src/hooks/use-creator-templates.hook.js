import { mutate, query, tx } from '@onflow/fcl';
import { useEffect, useReducer } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useTxs } from '../providers/TxProvider';
import { GET_CREATOR_TEMPLATES } from '../flow/get-creator-templates.script';
import { creatorTemplateReducer } from '../reducer/creatorTemplateReducer';
import SentimenTemplateClass from '../utils/SentimenTemplate';
import { CREATE_TEMPLATE } from '../flow/create-template.tx';
import { CREATE_STOREFRONT } from '../flow/create-storefront.tx';

export default function useCreatorTemplates() {
  const [state, dispatch] = useReducer(creatorTemplateReducer, {
    loading: false,
    error: false,
    data: [],
  });
  const { user, loggedIn } = useAuth();
  const { addTx, runningTxs } = useTxs();

  useEffect(() => {
    const fetchTemplates = async () => {
      //console.log(user?.addr);

      dispatch({ type: 'PROCESSING' });

      try {
        var res;

        res = await query({
          cadence: GET_CREATOR_TEMPLATES,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });

        let mappedTemplates = [];

        //console.log(res);
        res.forEach((element) => {
          //console.log(element);
          let sentimenTemplate =
            SentimenTemplateClass.SentimenTemplateFactory(element);
          //console.log(sentimenTemplate);
          mappedTemplates.push(sentimenTemplate);
        });

        dispatch({ type: 'SUCCESS', payload: mappedTemplates });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'ERROR' });
      }
    };

    if (loggedIn) {
      fetchTemplates();
    } else {
      console.log('skip use create template useEffect...');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const createTemplate = async (
    templateName,
    description,
    activity,
    creatorName,
    totalSupply,
    imageUrl
  ) => {
    if (runningTxs) {
      alert(
        'Transactions are still running. Please wait for them to finish first.'
      );
      return;
    }
    try {
      //console.log(data);
      //const dataTemp = [{ activity: '北港', creator: 'yangba' }];
      let res = await mutate({
        cadence: CREATE_TEMPLATE,
        limit: 1000,
        args: (arg, t) => [
          arg(templateName, t.String),
          arg(description, t.String),
          arg(imageUrl, t.String),
          arg(
            [
              { key: 'activity', value: activity },
              { key: 'creator', value: creatorName },
            ],
            t.Dictionary({ key: t.String, value: t.String })
          ),
          arg(parseInt(totalSupply), t.UInt64),
        ],
      });
      addTx(res);
      console.log('add template waiting starts...');
      await tx(res).onceSealed();
      console.log('add template waiting ends...');
      //console.log(res);
      //await addTemplate(res);
      //fetchTemplates();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const enableStorefront = async () => {
    if (runningTxs) {
      alert(
        'Transactions are still running. Please wait for them to finish first.'
      );
      return;
    }
    try {
      let res = await mutate({
        cadence: CREATE_STOREFRONT,
        limit: 1000,
      });
      addTx(res);
      await tx(res).onceSealed();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return {
    ...state,
    createTemplate,
    enableStorefront,
  };
}
