import React from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../providers/UserProvider';
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
export default function Sentimen({ sentimen }) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const { purchaseSentimen } = useUser();
  const {
    cardID,
    listingID,
    title,
    description,
    imageURL,
    activity,
    creator,
    listingAddress,
    salePrice,
  } = sentimen;

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
              <Image src={`/images/${creator}/${imageURL}`} bordered />
            </Button>
          }
        >
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content image>
            <Image size="large" src={`/images/${creator}/${imageURL}`} />
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
        if (listingID > 0) {
          return (
            <Card.Content extra textAlign="left">
              <Card.Meta>Price: {salePrice} FLOW</Card.Meta>
              <Card.Meta textAlign="right">
                <Button
                  inverted
                  color="blue"
                  onClick={() =>
                    purchaseSentimen(
                      cardID,
                      listingID,
                      listingAddress,
                      salePrice
                    )
                  }
                >
                  Buy
                </Button>
              </Card.Meta>
            </Card.Content>
          );
        }
      })()}
    </Card>
  );
}
