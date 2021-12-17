import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import { useUser } from '../providers/UserProvider';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';

export default function Wallet() {
  const { user, logOut } = useAuth();
  const { balance } = useUser();
  const history = useHistory();

  useEffect(() => {
    console.log(balance);
  }, []);

  return (
    <Dropdown item pointing text="錢包">
      {!balance ? (
        <div></div>
      ) : (
        <Dropdown.Menu>
          <Dropdown.Item>👛 {user?.addr}</Dropdown.Item>
          <Dropdown.Item>💰 FLOW: {balance.slice(0, -6)}</Dropdown.Item>
          <Dropdown.Item onClick={() => history.push('/user/collection')}>
            <Icon name="box" />
            Collection
          </Dropdown.Item>
          <Dropdown.Item onClick={() => logOut()}>👋 Logout</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}
