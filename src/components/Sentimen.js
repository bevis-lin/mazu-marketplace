import React, { useEffect } from 'react';
import useListings from '../hooks/use-listing.hook';
import { Image, Button, Card, Icon, Modal, Form } from 'semantic-ui-react';
import { useState } from 'react/cjs/react.development';

export default function Sentimen({ sentimen }) {
  const { checkIsListedOnStorefront, createStorefrontListing } = useListings();
  const [open, setOpen] = React.useState(false);
  const [listed, setListed] = useState(false);
  const [listPrice, setListPrice] = useState(0.1);

  const { id, title, description, imageURL, activity, creator } = sentimen;

  useEffect(() => {
    if (sentimen) {
      checkIsListedOnStorefront(sentimen).then((value) => {
        setListed(value);
      });
    }
  }, []);

  const doListSale = async (event) => {
    event.preventDefault();

    await createStorefrontListing(id, listPrice, 1);

    checkIsListedOnStorefront(sentimen).then((value) => {
      setListed(value);
    });
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
              {!listed ? (
                <Form size="tiny" onSubmit={doListSale}>
                  <Form.Field>
                    <label>List Price</label>
                    <input
                      value={listPrice}
                      onChange={(e) => setListPrice(e.target.value)}
                    />
                  </Form.Field>
                  <Button type="submit">Sale</Button>
                </Form>
              ) : (
                ''
              )}
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
        {!listed ? <Card.Meta>Not listed</Card.Meta> : ''}
      </Card.Content>
    </Card>
  );
}
