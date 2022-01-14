import React from 'react';
import { Container, Header, Card, Image, Icon, Grid } from 'semantic-ui-react';
import { useUser } from '../providers/UserProvider';

export default function CreatorProfile() {
  const { creator } = useUser();
  //const { name } = creator;
  console.log(creator);

  return (
    <Container>
      {creator ? (
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Card>
                <Image src="/matthew.png" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{creator.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2021</span>
                  </Card.Meta>
                  <Card.Description>攝影師</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="image" />
                    50 NFTs
                  </a>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="facebook" />
                    <a
                      href="https://www.facebook.com/littleYang125"
                      target="_blank"
                    >
                      <span>Homepage</span>
                    </a>
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Image src="/paragraph.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Header inverted>Loading...</Header>
      )}
    </Container>
  );
}
