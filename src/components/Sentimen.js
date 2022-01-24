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
import { useNavigate } from 'react-router-dom';

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
  const [showDetail, setShowDetail] = useState(false);

  const { id, title, description, imageURL, activity, creator } = sentimen;
  const history = useNavigate();

  useEffect(() => {}, []);

  const doViewDetail = () => {
    if (isFromUserCollection) {
      history(`/user/collection/nft/${sentimen.id}`);
    }
  };

  return (
    <Card fluid onClick={() => doViewDetail()}>
      <Card.Content textAlign="left">
        <Card.Header>{title}</Card.Header>
        <Image src={imageURL} bordered rounded />
      </Card.Content>
    </Card>
  );
}
