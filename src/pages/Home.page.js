import React from "react";
import { Container, Divider, Grid, Header, Image } from "semantic-ui-react";
import "../config/config";

export default function Home() {
  return (
    <div>
      <Container textAlign="center" fluid>
        <img src="/images/banner.jpg" width="50%" height="50%" hidden />
      </Container>

      <Divider />

      <Grid divided="vertically">
        <Grid.Row columns={4}>
          <Grid.Column textAlign="center">
            <Header as="h3">白沙屯</Header>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header as="h3">大甲</Header>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header as="h3">北港</Header>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header as="h3">新港</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
