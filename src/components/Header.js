import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();

  return (
    <Menu inverted>
      <Menu.Item
        header
        onClick={() => {
          history.push('/');
        }}
      >
        媽祖印象 NFT
      </Menu.Item>
      <Menu.Item onClick={() => history.push('/activity/1/listings')}>
        北港
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item onClick={() => history.push('/user/collection')}>
          我的收藏
        </Menu.Item>
        <Menu.Item>連結錢包</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
