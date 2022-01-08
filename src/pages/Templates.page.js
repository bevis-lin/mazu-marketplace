import React, { useEffect, useState } from 'react';
import { mutate, query, tx } from '@onflow/fcl';
import { useUser } from '../providers/UserProvider';
import { useTxs } from '../providers/TxProvider';
import TemplateList from '../components/TemplateList';
import CreateTemplate from '../components/CreateTemplate';
import '../config/config';
import { Button, Divider } from 'semantic-ui-react';
import { useAuth } from '../providers/AuthProvider';
import { CHCECK_STOREFRONT_ENABLED } from '../flow/check-storefront-enabled.script';
import { CREATE_STOREFRONT } from '../flow/create-storefront.tx';

export default function Templates() {
  const [isStorefrontEnabled, setIsStorefrontEnabled] = useState(false);
  const [isCreatePanelOpened, setIsCreatePanelOpened] = useState(false);
  const { creatorTemplates } = useUser();
  const { user } = useAuth();
  const { addTx } = useTxs();

  useEffect(() => {
    if (!user?.addr) return;
    console.log('checking is storefront enabled...');

    checkIsStorefrontEnabled();
  }, [user]);

  const checkIsStorefrontEnabled = async () => {
    try {
      console.log(user);

      let res = await query({
        cadence: CHCECK_STOREFRONT_ENABLED,
        args: (arg, t) => [arg(user?.addr, t.Address)],
      });

      console.log(res);

      setIsStorefrontEnabled(res);
    } catch (err) {
      console.log(err);
    }
  };

  const enableStorefront = async () => {
    let res = await mutate({
      cadence: CREATE_STOREFRONT,
      limit: 55,
    });
    addTx(res);
    await tx(res).onceSealed();
    checkIsStorefrontEnabled();
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
          <Divider hidden />
          {!isCreatePanelOpened ? (
            <Button inverted onClick={() => setIsCreatePanelOpened(true)}>
              Create A New Template
            </Button>
          ) : (
            <div>
              <CreateTemplate />
              <Button inverted onClick={() => setIsCreatePanelOpened(false)}>
                Close
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
