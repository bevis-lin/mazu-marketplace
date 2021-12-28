import React, { useEffect } from 'react';
import { mutate, query, tx } from '@onflow/fcl';
import { useTxs } from '../providers/TxProvider';
import { useHistory } from 'react-router';
import { useUser } from '../providers/UserProvider';
import { CHECK_IS_SENTIMEN_LISTED } from '../flow/check-is-sentimen-listed.script';
import { CREATE_STOREFRONT_LISTING } from '../flow/create-storefront-listing.tx';
import {
  Image,
  Grid,
  Divider,
  Segment,
  Button,
  Card,
  Icon,
  Modal,
} from 'semantic-ui-react';
import { useState } from 'react/cjs/react.development';
export default function Sentimen({ sentimen }) {
  const [open, setOpen] = React.useState(false);
  const [owned, setOwned] = useState(false);
  const [listed, setListed] = useState(false);
  const history = useHistory();
  const { userSentimens, purchaseSentimen } = useUser();
  const { addTx, runningTxs } = useTxs();
  const {
    id,
    listingID,
    title,
    description,
    imageURL,
    activity,
    creator,
    listingAddress,
    salePrice,
  } = sentimen;

  useEffect(() => {
    checkIsListedOnStorefront(sentimen.id);
    checkIfUserOwned();
  }, []);

  const checkIsListedOnStorefront = async (nftId) => {
    try {
      console.log(nftId);
      let res = await query({
        cadence: CHECK_IS_SENTIMEN_LISTED,
        args: (arg, t) => [arg(nftId, t.UInt64)],
      });

      console.log(res);

      setListed(res);
    } catch (err) {
      console.log(err);
    }
  };

  const createStorefrontListing = async (nftId, salePrice, activityId) => {
    if (runningTxs) {
      alert(
        'Transactions are still running. Please wait for them to finish first.'
      );
      return;
    }

    try {
      var res;
      res = await mutate({
        cadence: CREATE_STOREFRONT_LISTING,
        limit: 1000,
        args: (arg, t) => [
          arg(nftId, t.UInt64),
          arg(salePrice, t.UFix64),
          arg(activityId, t.UInt),
        ],
      });
      addTx(res);
      await tx(res).onceSealed();
      setListed(checkIsListedOnStorefront(nftId));
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const checkIfUserOwned = () => {
    const checkSentimen = userSentimens.find((s) => s?.id == id);
    if (checkSentimen) {
      setOwned(true);
    }
  };

  return (
    <Card fluid>
      <Card.Content textAlign="left">
        <Card.Header>{title}</Card.Header>

        <Modal
          open={open}
          closeIcon
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          trigger={
            <Button>
              <Image src={imageURL} bordered />
            </Button>
          }
        >
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content image>
            <Image size="large" src={imageURL} />
            <Modal.Description>
              <p>{description}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={() => setOpen(false)}>
              Close <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
        <Card.Meta>
          <Icon name="location arrow" /> {activity}
        </Card.Meta>
        <Card.Meta>
          <Icon name="user circle" /> {creator}
        </Card.Meta>
      </Card.Content>
      {(() => {
        if (listed) {
          return (
            <Card.Content extra textAlign="left">
              <Card.Meta>Listed , Price: {salePrice} FLOW</Card.Meta>
              <Card.Meta textAlign="right">
                <Button
                  disabled={owned}
                  inverted
                  color="blue"
                  onClick={() =>
                    purchaseSentimen(id, listingID, listingAddress, salePrice)
                  }
                >
                  Buy
                </Button>
              </Card.Meta>
            </Card.Content>
          );
        } else {
          return (
            <Card.Content extra textAlign="left">
              <Card.Meta>Not listed</Card.Meta>
              <Card.Meta textAlign="right">
                <Button
                  inverted
                  color="blue"
                  onClick={() => createStorefrontListing(id, 0.0001, 1)}
                >
                  Sale
                </Button>
              </Card.Meta>
            </Card.Content>
          );
        }
      })()}
    </Card>
  );
}
