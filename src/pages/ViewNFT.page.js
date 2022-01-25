import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { query } from '@onflow/fcl';
import { GET_NFT_METADATA } from '../flow/get-nft-metadata.script';
import SentimenClass from '../utils/SentimenClass';
import useUserSentimens from '../hooks/use-user-sentimens.hook';
import { useNavigate } from 'react-router-dom';
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
} from 'semantic-ui-react';

export default function ViewNFT() {
  const [sentimen, setSentimen] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOwnerCorret, setIsOwnerCorret] = useState(false);
  const history = useNavigate();
  const { getUserSentimens } = useUserSentimens();

  const { nftID } = useParams();
  const { owner } = useParams();

  useEffect(() => {
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

    console.log(`View NFT ID:${nftID}`);
    if (!isOwnerCorret) {
      checkOwner();
    }
    if (isOwnerCorret) {
      get_metadata(nftID);
    }
  }, [nftID, isOwnerCorret]);

  const checkOwner = async () => {
    getUserSentimens(owner).then((result) => {
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
        {sentimen ? (
          <Grid stackable>
            <Grid.Column width={9}>
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
            <Grid.Column width={7} textAlign="left">
              <Header as="h1">{sentimen.title}</Header>
              <Header as="h3">{sentimen.description}</Header>
              <Divider />
              <Header as="h4">Owner</Header>
              <Label>
                <Icon name="user" size="large" />
                <b>{owner}</b>
              </Label>
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
