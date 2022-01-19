import React from 'react';
import { createMedia } from '@artsy/fresnel';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { Button, Divider, Grid, Header, Image } from 'semantic-ui-react';
export default function Home() {
  const { loggedIn, logIn } = useAuth();

  const { MediaContextProvider, Media } = createMedia({
    // breakpoints values can be either strings or integers
    breakpoints: {
      sm: 0,
      md: 768,
      lg: 1024,
      xl: 1192,
    },
  });

  return (
    <div className="app">
      <MediaContextProvider>
        <Media greaterThanOrEqual="md">
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
                  Sentimen <br />
                  Photography NFT
                </Header>
                {!loggedIn ? (
                  <Button
                    inverted
                    size="medium"
                    color="grey"
                    onClick={() => logIn()}
                  >
                    Sign In to start
                  </Button>
                ) : (
                  <div></div>
                )}
              </Grid.Column>
              <Grid.Column textAlign="center" verticalAlign="middle">
                {/* <Image src="/images/yangba/180847975_153077556821952_1022103781139480060_n.jpeg" /> */}
                <Link to="/listing/collection/1">
                  <Button inverted size="huge" color="red">
                    北 港
                  </Button>
                </Link>
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
        </Media>

        <Media at="sm">
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column textAlign="left" verticalAlign="middle">
                <Image src="/flow-flow-logo.svg" size="tiny" />
                <Header as="h1" inverted color="grey">
                  Sentimen <br />
                  Photography NFT
                </Header>
                {!loggedIn ? (
                  <Button
                    inverted
                    size="medium"
                    color="grey"
                    onClick={() => logIn()}
                  >
                    Sign In to start
                  </Button>
                ) : (
                  <div></div>
                )}
              </Grid.Column>
              <Grid.Column textAlign="left" verticalAlign="middle">
                <Link to="/listing/collection/1">
                  <Button inverted size="huge" color="red">
                    Mazu
                  </Button>
                </Link>
                <Button inverted size="huge" color="yellow">
                  Hiking
                </Button>
                <Divider hidden />
                <Button inverted size="huge" color="green">
                  Plant
                </Button>
                <Button inverted size="huge" color="blue">
                  People
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Media>
      </MediaContextProvider>
    </div>
  );
}
