import React from 'react';
import Template from './Template';
import { Table } from 'semantic-ui-react';

export default function TemplateList({ templates }) {
  console.log('in template list');
  console.log(templates);

  const getTemplateList = (templates) => {
    return templates.map((template, i) => (
      <Template key={i} sentimeTemplate={template} />
    ));
  };

  return (
    <Table celled inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Total Supply</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell>Minted</Table.HeaderCell>
          <Table.HeaderCell>Mint</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{getTemplateList(templates)}</Table.Body>
    </Table>
  );
}
