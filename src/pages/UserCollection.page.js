import React from 'react';
import { useUser } from '../providers/UserProvider';
import { useUserCollection } from '../providers/CollectionProvider';
import SentimenList from '../components/SentimenList';
import '../config/config';
import { Button, Divider, Header, Segment } from 'semantic-ui-react';

export default function UserCollection() {
  const { hasCollection, createCollection } = useUserCollection();
  const { userSentimens } = useUser();

  return (
    <div>
      {!hasCollection ? (
        <Button inverted color="grey" onClick={() => createCollection()}>
          Enable Collection
        </Button>
      ) : (
        <Segment inverted>
          <Header size="huge">Your collected NFTs</Header>
          <Divider />
          <SentimenList sentimens={userSentimens} />
        </Segment>
      )}
    </div>
  );
}
