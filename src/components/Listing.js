import React, { useEffect } from 'react';
import { useUser } from '../providers/UserProvider';
import { useAuth } from '../providers/AuthProvider';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import { useState } from 'react/cjs/react.development';
import Sentimen from './Sentimen';

export default function Listing({ listing }) {
  const [owned, setOwned] = useState(false);
  const { userSentimens, purchaseSentimen } = useUser();
  const { loggedIn } = useAuth();
  const { listingId, listingAddress, salePrice, sentimenId, sentimen } =
    listing;

  useEffect(() => {
    console.log(listing);
    if (loggedIn) {
      checkIfUserOwned();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, userSentimens]);

  const checkIfUserOwned = () => {
    console.log('update owned status to false');
    setOwned(false);
    console.log(userSentimens);
    const checkSentimen = userSentimens.find((s) => s?.id === sentimenId);
    if (checkSentimen) {
      console.log('update owned status to true');
      setOwned(true);
    }
  };

  const onPurchaseSentimen = () => {
    purchaseSentimen(sentimenId, listingId, listingAddress, salePrice).then(
      () => {
        //console.log('checking is owner after purchase');
        //checkIfUserOwned();
        //alert('Purchase completed');
      }
    );

    //checkIfUserOwned();
  };

  return (
    <Card fluid>
      <Sentimen sentimen={sentimen} isFromUserCollection={false} />

      <Card.Content extra textAlign="left">
        {owned ? (
          <Label as="a" color="teal" ribbon>
            You Own
          </Label>
        ) : (
          ''
        )}
        <Card.Meta>
          <Label image>
            <img src="/Flow.png" />

            {salePrice}
          </Label>
        </Card.Meta>
        <Card.Meta textAlign="right">
          {loggedIn && !owned ? (
            <Button onClick={() => onPurchaseSentimen()}>Buy</Button>
          ) : (
            ''
          )}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}
