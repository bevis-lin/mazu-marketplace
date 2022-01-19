import React from 'react';
import Sentimen from './Sentimen';
import { createMedia } from '@artsy/fresnel';
import { Card, Container } from 'semantic-ui-react';

export default function SentimenList({ sentimens }) {
  //console.log(sentimens);

  const { MediaContextProvider, Media } = createMedia({
    // breakpoints values can be either strings or integers
    breakpoints: {
      sm: 0,
      md: 768,
      lg: 1024,
      xl: 1192,
    },
  });

  const getSentimenList = (sentimens) => {
    return sentimens.map((sentimen, i) => (
      <Sentimen key={i} sentimen={sentimen} isFromUserCollection={true} />
    ));
  };

  return (
    <MediaContextProvider>
      <Media greaterThanOrEqual="lg">
        <Container>
          <Card.Group itemsPerRow={3}>{getSentimenList(sentimens)}</Card.Group>
        </Container>
      </Media>

      <Media at="md">
        <Container>
          <Card.Group itemsPerRow={2}>{getSentimenList(sentimens)}</Card.Group>
        </Container>
      </Media>

      <Media at="sm">
        <Container>
          <Card.Group itemsPerRow={1}>{getSentimenList(sentimens)}</Card.Group>
        </Container>
      </Media>
    </MediaContextProvider>
  );
}
