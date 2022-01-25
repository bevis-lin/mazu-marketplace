import Home from '../pages/Home.page';
import Listings from '../pages/Listings.page';
import UserCollection from '../pages/UserCollection.page';
import Templates from '../pages/Templates.page';
import ViewNFT from '../pages/ViewNFT.page';
import NewTemplate from '../pages/NewTemplate.page';
import MintRequests from '../pages/MintRequests.page';
import CreatorProfile from '../pages/CreatorProfile.page';
import SentimenDetail from '../components/SentimenDetail';

export const ROUTES = [
  { name: 'Home', path: '/', component: <Home />, nav: false },
  {
    name: 'Listings',
    path: '/listing/collection/:collectionId',
    component: <Listings />,
    nav: false,
  },
  {
    name: 'UserCollection',
    path: '/user/collection',
    component: <UserCollection />,
    nav: false,
  },
  {
    name: 'TemplateList',
    path: '/creator/templates',
    component: <Templates />,
    nav: false,
  },
  {
    name: 'ViewNFT',
    path: '/nft/:nftID/:owner',
    component: <ViewNFT />,
    nav: false,
  },
  {
    name: 'NewTemplate',
    path: '/creator/templates/create',
    component: <NewTemplate />,
    nav: false,
  },
  {
    name: 'MintRequests',
    path: '/creator/requests',
    component: <MintRequests />,
    nav: false,
  },
  {
    name: 'Creator',
    path: '/creator',
    component: <CreatorProfile />,
    nav: false,
  },
  {
    name: 'SentimenDetail',
    path: '/user/collection/nft/:nftID',
    component: <SentimenDetail />,
    nav: false,
  },
];

export const NAV_ROUTES = ROUTES.filter((r) => r.nav);
