import React from 'react';
import Sentimen from './Sentimen';
import { Card, Container } from 'semantic-ui-react';

export default function SentimenList({ sentimes, owned }) {
  console.log(sentimes);

  const getSentimenList = (sentimens) => {
    return sentimens.map((sentimen, i) => (
      <Sentimen key={i} sentimen={sentimen} />
    ));
  };

  if (owned) {
    return (
      <Container>
        <Card.Group itemsPerRow={3}>{getSentimenList(sentimes)}</Card.Group>
      </Container>
    );
  } else {
    return (
      <Container textAlign="center">
        <Card.Group itemsPerRow={3}>{getSentimenList(sentimes)}</Card.Group>
      </Container>
    );
  }
}
