import React, { useEffect } from 'react';
import { Image, Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function Sentimen({ sentimen, isFromUserCollection }) {
  const { title, imageURL } = sentimen;
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
