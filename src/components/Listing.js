import React, { useEffect } from 'react';
import { useUser } from '../providers/UserProvider';
import { Button, Card } from 'semantic-ui-react';
import { useState } from 'react/cjs/react.development';
import Sentimen from './Sentimen';

export default function Listing({ listing }) {
  const [owned, setOwned] = useState(false);
  const { userSentimens, purchaseSentimen } = useUser();
  const { listingID, listingAddress, salePrice, sentimenId, sentimen } =
    listing;

  useEffect(() => {
    checkIfUserOwned();
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
        <Card.Meta>Listed , Price: {salePrice} FLOW</Card.Meta>
        <Card.Meta textAlign="right">
          <Button
            disabled={owned}
            inverted
            color="blue"
            onClick={() =>
              purchaseSentimen(sentimenId, listingID, listingAddress, salePrice)
            }
          >
            Buy
          </Button>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}
