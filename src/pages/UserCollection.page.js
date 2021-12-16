import React from 'react';
import { useUser } from '../providers/UserProvider';
import SentimenList from '../components/SentimenList';
import '../config/config';
import { Button } from 'semantic-ui-react';

export default function UserCollection() {
  const { userSentimens, hasCollection, createCollection } = useUser();

  return (
    <div>
      <br />
      <br />
      <br />
      {!hasCollection ? (
        <Button inverted color="grey" onClick={() => createCollection()}>
          Enable Collection
        </Button>
      ) : (
        <SentimenList sentimes={userSentimens} owned={true} />
      )}
    </div>
  );
}
