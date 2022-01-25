import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useUser } from '../providers/UserProvider';
import { Dropdown, Icon } from 'semantic-ui-react';

export default function Wallet() {
  const { user, logOut } = useAuth();
  const { balance } = useUser();
  const history = useNavigate();

  const toLogOut = () => {
    logOut();
    history('/');
  };

  return (
    <Dropdown item pointing text="Wallet">
      {!user.loggedIn ? (
        <div></div>
      ) : (
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => navigator.clipboard.writeText(`${user?.addr}`)}
          >
            <Icon name="linkify" />
            {user?.addr}
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="dollar sign" /> FLOW:{' '}
            {balance ? balance.slice(0, -6) : 0}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history('/user/collection')}>
            <Icon name="box" />
            Collection
          </Dropdown.Item>
          <Dropdown.Item onClick={() => toLogOut()}>
            <Icon name="log out" /> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}
