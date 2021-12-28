import { query } from '@onflow/fcl';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { NAV_ROUTES } from '../config/routes.config';
import Wallet from './AccountDetails';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { CHECK_IS_CREATOR } from '../flow/check-is-creator.script';

export default function Navbar() {
  const [isCreator, setIsCreator] = useState();
  const { user } = useAuth();
  const history = useHistory();

  const NavItem = ({ route }) => (
    <Menu.Item onClick={() => history.push(route.path)}>{route.name}</Menu.Item>
  );

  useEffect(() => {
    if (!user?.addr) return;
    console.log('checking is creator...');

    const checkIsCreator = async () => {
      try {
        console.log(user);

        let res = await query({
          cadence: CHECK_IS_CREATOR,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });

        console.log(res);

        setIsCreator(res);
      } catch (err) {
        console.log(err);
      }
    };

    checkIsCreator();
  }, []);

  return (
    <Menu fixed="top" inverted size="huge">
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
        {!isCreator ? (
          <div></div>
        ) : (
          <Dropdown item pointing text="Creator">
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => history.push('/creator/templates')}>
                Templates
              </Dropdown.Item>
              <Dropdown.Item>Mint NFT</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Menu>
    </Menu>
  );
}
