import React, { useEffect, useState } from 'react';
import { query } from '@onflow/fcl';
import { useAuth } from '../providers/AuthProvider';
import { GET_MINT_REQUESTS } from '../flow/get-mint-requests.script';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';
import { Table } from 'semantic-ui-react';

export default function MintRequests() {
  const [mintRequests, setMintRequests] = useState(null);
  const { user, loggedIn } = useAuth();
  const { data: creatorTemplates } = useCreatorTemplates();

  useEffect(() => {
    const getMintReqeustFromChain = async () => {
      try {
        const res = await query({
          cadence: GET_MINT_REQUESTS,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });

        console.log(res);
        setMintRequests(res);
      } catch (err) {
        console.log(err);
      }
    };
    if (loggedIn && creatorTemplates.length > 0) {
      getMintReqeustFromChain();
    }

    //eslint-disable-next-line
  }, [creatorTemplates]);

  const getMintRequestRender = () => {
    return mintRequests.map((request, i) => (
      <Table.Row>
        <Table.Cell>{request.requestId}</Table.Cell>
        <Table.Cell>
          {creatorTemplates.find((t) => t?.id === request.templateId).name}
        </Table.Cell>
        <Table.Cell>
          {request.completed ? 'Completed' : 'Processing'}
        </Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <Table celled inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Template</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {mintRequests ? getMintRequestRender() : 'Loading..'}
      </Table.Body>
    </Table>
  );
}
