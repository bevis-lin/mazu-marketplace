import React from 'react';
import { useHistory } from 'react-router-dom';

import { NAV_ROUTES } from '../config/routes.config';
import Wallet from './AccountDetails';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

export default function Navbar() {
  const history = useHistory();

  const NavItem = ({ route }) => (
    <Menu.Item onClick={() => history.push(route.path)}>{route.name}</Menu.Item>
  );

  return (
    <Menu fixed="top" inverted>
      <Menu.Item as="a" header onClick={() => history.push('/')}>
        {/* <Image
          size="mini"
          src="/logo.png"
          style={{ marginRight: '1.5em' }}
          onClick={() => history.push('/')}
        /> */}
        Mazu NFT
      </Menu.Item>
      <Dropdown text="Collection" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history.push('/activity/1/listings')}>
            北港
          </Dropdown.Item>
          <Dropdown.Item>白沙屯</Dropdown.Item>
          <Dropdown.Item>新港</Dropdown.Item>
          <Dropdown.Item>大甲</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {NAV_ROUTES.map((item) => (
        <NavItem route={item} key={item.path} />
      ))}
      <Menu.Menu position="right">
        <Wallet />
      </Menu.Menu>
    </Menu>
  );
}
