import React from 'react';
import { Container, Segment, Grid, Header, List } from 'semantic-ui-react';

export default function Footer() {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Romap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Community</List.Item>
                <List.Item as="a">Charity</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Postcard</List.Item>
                <List.Item as="a">FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Smart Contract</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Mazu Events
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}
