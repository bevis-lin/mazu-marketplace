import React, { useEffect, useState } from 'react';
import { mutate, query, tx } from '@onflow/fcl';
//import { useUser } from '../providers/UserProvider';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';
import { useNavigate } from 'react-router-dom';

import { useTxs } from '../providers/TxProvider';
import TemplateList from '../components/TemplateList';
import '../config/config';
import { Button } from 'semantic-ui-react';
import { useAuth } from '../providers/AuthProvider';
import { CHCECK_STOREFRONT_ENABLED } from '../flow/check-storefront-enabled.script';
import { CREATE_STOREFRONT } from '../flow/create-storefront.tx';

export default function Templates() {
  const [isStorefrontEnabled, setIsStorefrontEnabled] = useState(false);
  const { user, loggedIn } = useAuth();
  const { addTx } = useTxs();
  const { data: creatorTemplates } = useCreatorTemplates();
  const history = useNavigate();

  useEffect(() => {
    const checkIsStorefrontEnabled = async () => {
      try {
        //console.log(user);
        console.log('begin to check if storefront enabled...');

        let res = await query({
          cadence: CHCECK_STOREFRONT_ENABLED,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });

        console.log(`checkIsStorefrontEnabled result:${res}`);

        setIsStorefrontEnabled(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (!loggedIn) {
      console.log('skip in Template page useEffect...');
    }

    checkIsStorefrontEnabled();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const enableStorefront = async () => {
    try {
      let res = await mutate({
        cadence: CREATE_STOREFRONT,
        limit: 55,
      });
      addTx(res);
      await tx(res).onceSealed();
      setIsStorefrontEnabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!isStorefrontEnabled ? (
        <div>
          <Button inverted onClick={() => enableStorefront()}>
            Enable Storefront
          </Button>
        </div>
      ) : (
        <div>
          <TemplateList templates={creatorTemplates} />
          <Button inverted onClick={() => history('/creator/templates/create')}>
            Create Template
          </Button>
        </div>
      )}
    </div>
  );
}
