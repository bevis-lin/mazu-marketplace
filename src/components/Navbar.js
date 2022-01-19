import { query } from '@onflow/fcl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useUser } from '../providers/UserProvider';
import { NAV_ROUTES } from '../config/routes.config';
import Wallet from './AccountDetails';
import { Menu, Dropdown } from 'semantic-ui-react';

export default function Navbar() {
  const { user, loggedIn } = useAuth();
  const { isCreator, getFLOWBalance } = useUser();
  const history = useNavigate();

  const NavItem = ({ route }) => (
    <Menu.Item onClick={() => history(route.path)}>{route.name}</Menu.Item>
  );

  useEffect(() => {
    // console.log('checking is creator...');

    if (user?.loggedIn) {
      getFLOWBalance();
    } else {
      console.log('skip navbar useEffect...');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getLoginMenu = () => {
    if (loggedIn) {
      //console.log(`In navbar user loggedin balance:${balance}`);
      return (
        <Menu.Menu position="right">
          <Wallet />

          {isCreator ? (
            <Dropdown item pointing text="Creator">
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history('/creator')}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history('/creator/templates')}>
                  Templates
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history('/creator/requests')}>
                  Mint Request
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ''
          )}
        </Menu.Menu>
      );
    }
  };

  return (
    <Menu fixed="top" inverted size="huge">
      <Menu.Item as="a" header onClick={() => history('/')}>
        {/* <Image
          size="mini"
          src="/logo.png"
          style={{ marginRight: '1.5em' }}
          onClick={() => history.push('/')}
        /> */}
        Sentimen.Art
      </Menu.Item>
      <Dropdown text="Collection" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history('/listing/collection/1')}>
            Mazu
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history('/listing/collection/2')}>
            Hiking
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history('/listing/collection/3')}>
            Plant
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history('/listing/collection/4')}>
            People
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {NAV_ROUTES.map((item) => (
        <NavItem route={item} key={item.path} />
      ))}

      {getLoginMenu()}
    </Menu>
  );
}
