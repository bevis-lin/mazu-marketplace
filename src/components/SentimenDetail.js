import React from 'react';
import { query } from '@onflow/fcl';
import { GET_NFT_METADATA } from '../flow/get-nft-metadata.script';
import { useState, useEffect } from 'react';
import useListings from '../hooks/use-listing.hook';
import { useParams } from 'react-router-dom';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';
import { useNavigate } from 'react-router-dom';
import SentimenClass from '../utils/SentimenClass';
import useUserSentimens from '../hooks/use-user-sentimens.hook';
import { useAuth } from '../providers/AuthProvider';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
  Modal,
  Button,
  Form,
} from 'semantic-ui-react';

export default function SentimenDetail() {
  const [open, setOpen] = React.useState(false);
  const [listed, setListed] = useState(false);
  const [listPrice, setListPrice] = useState(1);
  const [siteId, setSiteId] = useState(1);
  const [sentimen, setSentimen] = useState(null);
  const [isOwnerCorret, setIsOwnerCorret] = useState(false);
  const { getUserSentimens } = useUserSentimens();
  const { user } = useAuth();
  const history = useNavigate();

  const {
    checkIsListedOnStorefront,
    createStorefrontListing,
    deleteStorefrontListing,
  } = useListings();
  const { getTemplateById } = useCreatorTemplates();

  const { nftID } = useParams();

  useEffect(() => {
    if (!sentimen) {
      get_metadata(nftID);
    } else {
      console.log('checking owner...');
      checkOwner();

      console.log(`checking if nft id:${sentimen.id} is listed...`);
      checkIsListedOnStorefront(sentimen).then((value) => {
        setListed(value);
      });

      console.log('calling getTemplateById:sentimem');
      console.log(sentimen);

      getTemplateById(sentimen.templateId).then((value) => {
        console.log(value);
        setSiteId(parseInt(value.siteId));
      });
    }
  }, [nftID, sentimen]);

  const get_metadata = async (nftId) => {
    try {
      var res;

      res = await query({
        cadence: GET_NFT_METADATA,
        args: (arg, t) => [arg(parseInt(nftId), t.UInt64)],
      });

      console.log(res);
      var element = {
        metadata: res,
      };
      setSentimen(SentimenClass.SentimenFactory(element));
    } catch (err) {
      console.log(err);
    }
  };

  const doListSale = async (event) => {
    event.preventDefault();

    await createStorefrontListing(sentimen.id, listPrice, siteId);

    checkIsListedOnStorefront(sentimen).then((value) => {
      setListed(value);
    });
  };

  const doDelistSale = async () => {
    await deleteStorefrontListing(sentimen.id);

    checkIsListedOnStorefront(sentimen).then((value) => {
      setListed(value);
    });
  };

  const checkOwner = async () => {
    getUserSentimens(user?.addr).then((result) => {
      if (result) {
        var sentimenTemp = result.find((element) => element.id == nftID);
        if (sentimenTemp) {
          setIsOwnerCorret(true);
        }
      }
    });
  };

  return (
    <Container>
      <Segment>
        {sentimen && isOwnerCorret ? (
          <Grid stackable>
            <Grid.Column width={7}>
              <Modal
                open={open}
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={
                  <Image src={sentimen.imageURL} fluid bordered rounded />
                }
              >
                <Modal.Content image>
                  <Image
                    size="massive"
                    src={sentimen.imageURL}
                    fluid
                    rounded
                    bordered
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={() => setOpen(false)}>
                    Close <Icon name="right chevron" />
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid.Column>
            <Grid.Column width={6} textAlign="left">
              <Header as="h1">{sentimen.title}</Header>
              <Header as="h3">{sentimen.description}</Header>
              <Divider hidden />
              <Header as="h4">Activity</Header>
              <Label>
                <Icon name="location arrow" size="large" />
                {sentimen.activity}
              </Label>
              <Header as="h4">Creator</Header>
              <Label>
                <Icon name="user" size="large" />
                {sentimen.creator}
              </Label>
            </Grid.Column>
            <Grid.Column width={3} textAlign="left" verticalAlign="top">
              {listed ? (
                <Label as="a" color="teal">
                  Listed
                </Label>
              ) : (
                <Label as="a" color="blue">
                  Not Listed
                </Label>
              )}

              <Divider hidden />
              {!listed ? (
                <Form onSubmit={doListSale}>
                  <Form.Input
                    label="Price"
                    placeholder="FLOW"
                    onChange={(e) => setListPrice(e.target.value)}
                  />
                  <Button type="submit" fluid>
                    List
                  </Button>
                </Form>
              ) : (
                <Container text>
                  <Button onClick={() => doDelistSale()} inverted color="red">
                    Delisting
                  </Button>
                </Container>
              )}
            </Grid.Column>
          </Grid>
        ) : (
          <Header as="h1">
            {!isOwnerCorret ? `Checking owner address...` : 'Loading NFT...'}
          </Header>
        )}
      </Segment>
      <Divider hidden />
      <Button
        floated="right"
        onClick={() => {
          history(-1);
        }}
      >
        Back
      </Button>
      <Divider hidden />
      <Divider hidden />
    </Container>
  );
}
