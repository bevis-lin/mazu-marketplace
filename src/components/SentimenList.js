import React from 'react';
import Sentimen from './Sentimen';
import { Card, Container } from 'semantic-ui-react';

export default function SentimenList({ sentimens }) {
  //console.log(sentimens);

  const getSentimenList = (sentimens) => {
    return sentimens.map((sentimen, i) => (
      <Sentimen key={i} sentimen={sentimen} isFromUserCollection={true} />
    ));
  };

  return (
    <Container>
      <Card.Group itemsPerRow={3}>{getSentimenList(sentimens)}</Card.Group>
    </Container>
  );
}
