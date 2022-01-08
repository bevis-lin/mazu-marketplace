import React, { useEffect } from 'react';
import { useUser } from '../providers/UserProvider';
import { useAuth } from '../providers/AuthProvider';
import { Button, Card } from 'semantic-ui-react';
import { useState } from 'react/cjs/react.development';
import Sentimen from './Sentimen';

export default function Listing({ listing }) {
  const [owned, setOwned] = useState(false);
  const { userSentimens, purchaseSentimen } = useUser();
  const { loggedIn } = useAuth();
  const { listingID, listingAddress, salePrice, sentimenId, sentimen } =
    listing;

  useEffect(() => {
    if (loggedIn) {
      checkIfUserOwned();
    }
  }, []);

  const checkIfUserOwned = () => {
    const checkSentimen = userSentimens.find((s) => s?.id === sentimenId);
    if (checkSentimen) {
      setOwned(true);
    }
  };

  return (
    <Card fluid>
      <Sentimen sentimen={sentimen} />
      <Card.Content extra textAlign="left">
        <Card.Meta>
          {owned ? 'Listed,' : ''} Price: <b>{salePrice}</b> FLOW
        </Card.Meta>
        <Card.Meta textAlign="right">
          {loggedIn ? (
            <Button
              disabled={owned}
              inverted
              color="blue"
              onClick={() =>
                purchaseSentimen(
                  sentimenId,
                  listingID,
                  listingAddress,
                  salePrice
                )
              }
            >
              Buy
            </Button>
          ) : (
            <div />
          )}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}
