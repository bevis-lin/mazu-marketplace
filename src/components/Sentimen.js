import React, { useEffect } from 'react';
import useListings from '../hooks/use-listing.hook';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';
import {
  Image,
  Button,
  Card,
  Icon,
  Modal,
  Form,
  Divider,
  Label,
} from 'semantic-ui-react';
import { useState } from 'react/cjs/react.development';

export default function Sentimen({ sentimen, isFromUserCollection }) {
  const {
    checkIsListedOnStorefront,
    createStorefrontListing,
    deleteStorefrontListing,
  } = useListings();
  const { getTemplateById } = useCreatorTemplates();
  const [open, setOpen] = React.useState(false);
  const [listed, setListed] = useState(false);
  const [listPrice, setListPrice] = useState(1);
  const [siteId, setSiteId] = useState(1);

  const { id, title, description, imageURL, activity, creator } = sentimen;

  useEffect(() => {
    if (sentimen) {
      checkIsListedOnStorefront(sentimen).then((value) => {
        setListed(value);
      });

      getTemplateById(sentimen.templateId).then((value) => {
        //console.log(value);
        setSiteId(parseInt(value.siteId));
      });
    }
  }, []);

  const doListSale = async (event) => {
    event.preventDefault();

    await createStorefrontListing(id, listPrice, siteId);

    checkIsListedOnStorefront(sentimen).then((value) => {
      setListed(value);
    });
  };

  const doDelistSale = async () => {
    await deleteStorefrontListing(id);

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
        <Card.Meta>
          <Divider hidden />
        </Card.Meta>
        {!listed ? (
          <Card.Meta textAlign="left">
            <Form size="tiny" onSubmit={doListSale} fluid>
              <Form.Group widths="equal">
                <Image src="/Flow.png" size="mini" />
                <Form.Input
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                />
                <Button type="submit" inverted color="blue">
                  Sale
                </Button>
              </Form.Group>
            </Form>
          </Card.Meta>
        ) : isFromUserCollection ? (
          <Card.Meta textAlign="left">
            <Button onClick={() => doDelistSale()} fluid inverted color="blue">
              Delisting
            </Button>
          </Card.Meta>
        ) : (
          ''
        )}
      </Card.Content>
    </Card>
  );
}
