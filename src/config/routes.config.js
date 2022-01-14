import Home from '../pages/Home.page';
import Listings from '../pages/Listings.page';
import Listing from '../pages/Listing.page';
import UserCollection from '../pages/UserCollection.page';
import Templates from '../pages/Templates.page';
import ViewNFT from '../pages/ViewNFT.page';
import NewTemplate from '../pages/NewTemplate.page';
import MintRequests from '../pages/MintRequests.page';
import CreatorProfile from '../pages/CreatorProfile.page';

export const ROUTES = [
  { name: 'Home', path: '/', component: <Home />, nav: false },
  {
    name: 'ActivityListings',
    path: '/activity/:activityID/listings',
    component: <Listings />,
    nav: false,
  },
  { name: 'Listings', path: '/listings', component: <Listings />, nav: false },
  {
    name: 'Listing',
    path: '/listings/:listingID',
    component: <Listing />,
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
  { name: 'ViewNFT', path: '/nft/:nftID', component: <ViewNFT />, nav: false },
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
];

export const NAV_ROUTES = ROUTES.filter((r) => r.nav);
