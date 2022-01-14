import React from 'react';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

import { Table, Image, Button } from 'semantic-ui-react';

export default function Template({ sentimeTemplate }) {
  const { createMintRequest } = useUser();
  const history = useNavigate();
  const { id, name, description, imageURL, totalSupply, totalMinted } =
    sentimeTemplate;

  //console.log('in template');
  //console.log(sentimeTemplate);

  const onCreateMintRequest = () => {
    createMintRequest(id).then(() => {
      history('/creator/requests');
    });
  };

  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{totalSupply}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>
        <Image src={imageURL} size="tiny" />
      </Table.Cell>
      <Table.Cell>{totalMinted}</Table.Cell>
      <Table.Cell>
        <Button onClick={() => onCreateMintRequest()}>+</Button>
      </Table.Cell>
    </Table.Row>
  );
}
