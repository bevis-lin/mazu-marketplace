import React from 'react';
import { createMedia } from '@artsy/fresnel';
import { Grid, Header, Image } from 'semantic-ui-react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function Home() {
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
        <Media greaterThanOrEqual="lg">
          <Grid>
            <Grid.Column width={1}>
              <Image src="/flow-flow-logo.svg" size="tiny" />
            </Grid.Column>
            <Grid.Column width={5} textAlign="left" verticalAlign="middle">
              <Header as="h2" inverted color="grey">
                Photography NFT Marketplace On Flow Blockchain
              </Header>
            </Grid.Column>
          </Grid>
        </Media>
        <Media at="sm">
          <Grid>
            <Grid.Column width={3}>
              <Image src="/flow-flow-logo.svg" size="tiny" />
            </Grid.Column>
            <Grid.Column width={7} textAlign="left" verticalAlign="middle">
              <Header as="h3" inverted color="grey">
                Photography NFT Marketplace On Flow Blockchain
              </Header>
            </Grid.Column>
          </Grid>
        </Media>
      </MediaContextProvider>
      <Grid>
        <Grid.Column width={16}>
          <AliceCarousel autoPlay autoPlayInterval="3000">
            <Image
              src="/images/yangba/179121308_153078840155157_3169749533766559177_n.jpeg"
              className="sliderimg"
            />
            <Image
              src="/images/yangba/179423167_153078300155211_6021999415992825683_n.jpeg"
              className="sliderimg"
            />
            <Image
              src="/images/yangba/179130052_153077873488587_1249652711414984689_n.jpeg"
              className="sliderimg"
            />
            <Image
              src="/images/yangba/257524982_297900459006327_1534487036315596963_n.jpeg"
              className="sliderimg"
            />
          </AliceCarousel>
        </Grid.Column>
      </Grid>
    </div>
  );
}
