import React from 'react';
import { useUser } from '../providers/UserProvider';

import { Table, Image, Button } from 'semantic-ui-react';

export default function Template({ sentimeTemplate }) {
  const { createMintRequest } = useUser();
  const { id, name, description, imageURL, data, totalSupply, totalMinted } =
    sentimeTemplate;

  //console.log('in template');
  //console.log(sentimeTemplate);

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
        <Button onClick={() => createMintRequest(id, 0.0001)}>+</Button>
      </Table.Cell>
    </Table.Row>
  );
}
