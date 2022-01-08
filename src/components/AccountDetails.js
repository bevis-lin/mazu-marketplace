import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';
import { useUser } from '../providers/UserProvider';
import { Dropdown, Icon } from 'semantic-ui-react';

export default function Wallet() {
  const { user, logOut } = useAuth();
  const { balance } = useUser();
  const history = useNavigate();

  return (
    <Dropdown item pointing text="Wallet">
      {!balance ? (
        <div></div>
      ) : (
        <Dropdown.Menu>
          <Dropdown.Item>👛 {user?.addr}</Dropdown.Item>
          <Dropdown.Item>💰 FLOW: {balance.slice(0, -6)}</Dropdown.Item>
          <Dropdown.Item onClick={() => history('/user/collection')}>
            <Icon name="box" />
            Collection
          </Dropdown.Item>
          <Dropdown.Item onClick={() => logOut()}>👋 Logout</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}
