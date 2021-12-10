import React from 'react';
import Sentimen from './Sentimen';
import { Divider, Grid } from 'semantic-ui-react';

export default function SentimenList({ sentimes }) {
  console.log(sentimes);

  const getSentimenList = (sentimens) => {
    return sentimes.map((sentimen, i) => (
      <Sentimen key={i} sentimen={sentimen} />
    ));
  };

  return (
    <div>
      <Divider hidden />
      <Grid>{getSentimenList(sentimes)}</Grid>
    </div>
  );
}
