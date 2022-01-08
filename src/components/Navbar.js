import { query } from '@onflow/fcl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useUser } from '../providers/UserProvider';
import { NAV_ROUTES } from '../config/routes.config';
import Wallet from './AccountDetails';
import { Menu, Dropdown } from 'semantic-ui-react';
import { CHECK_IS_CREATOR } from '../flow/check-is-creator.script';

export default function Navbar() {
  const [isCreator, setIsCreator] = useState();
  const { user, loggedIn } = useAuth();
  const { balance, getFLOWBalance } = useUser();
  const history = useNavigate();

  const NavItem = ({ route }) => (
    <Menu.Item onClick={() => history(route.path)}>{route.name}</Menu.Item>
  );

  useEffect(() => {
    // console.log('checking is creator...');

    const checkIsCreator = async () => {
      try {
        //console.log(user);

        let res = await query({
          cadence: CHECK_IS_CREATOR,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });

        //console.log(res);

        setIsCreator(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.loggedIn) {
      getFLOWBalance();
      checkIsCreator();
    } else {
      console.log('skip navbar useEffect...');
    }
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
                <Dropdown.Item onClick={() => history('/creator/templates')}>
                  Templates
                </Dropdown.Item>
                <Dropdown.Item>Mint NFT</Dropdown.Item>
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
        Mazu NFT
      </Menu.Item>
      <Dropdown text="Collection" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history('/activity/1/listings')}>
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

      {getLoginMenu()}
    </Menu>
  );
}
