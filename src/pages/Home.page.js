import React from 'react';
import { useHistory } from 'react-router';
import { Button, Divider, Grid, Header, Image } from 'semantic-ui-react';
export default function Home() {
  const history = useHistory();

  return (
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Image src="/images/yangba/179121308_153078840155157_3169749533766559177_n.jpeg" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/179130052_153077873488587_1249652711414984689_n.jpeg" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/179408896_153078156821892_1005084971119794856_n.jpeg" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4}>
        <Grid.Column>
          <Image src="/images/yangba/179423167_153078300155211_6021999415992825683_n.jpeg" />
        </Grid.Column>
        <Grid.Column textAlign="left" verticalAlign="middle">
          {/* <Image src="/images/yangba/180421657_153077426821965_6503564742629607052_n.jpeg" /> */}
          <Image src="/flow-flow-logo.svg" size="tiny" />
          <Header as="h1" inverted color="grey">
            Mazu Photography NFT
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="center" verticalAlign="middle">
          {/* <Image src="/images/yangba/180847975_153077556821952_1022103781139480060_n.jpeg" /> */}
          <Button
            inverted
            size="huge"
            color="red"
            onClick={() => history.push('/activity/1/listings')}
          >
            北 港
          </Button>
          <Button inverted size="huge" color="yellow">
            白沙屯
          </Button>
          <Divider hidden />
          <Button inverted size="huge" color="orange">
            新 港
          </Button>
          <Button inverted size="huge" color="blue">
            大 甲
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/181012229_153078136821894_2879160134054689135_n.jpeg" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={5}>
        <Grid.Column>
          <Image src="/images/yangba/247765811_297901749006198_6431084377979914655_n.jpeg" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/256410071_297898639006509_2251448382612214227_n.jpeg" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/257524982_297900459006327_1534487036315596963_n.jpeg" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/179121308_153078840155157_3169749533766559177_n.jpeg" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/yangba/179130052_153077873488587_1249652711414984689_n.jpeg" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
