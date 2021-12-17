import Home from '../pages/Home.page';
import Listings from '../pages/Listings.page';
import Listing from '../pages/Listing.page';
import UserCollection from '../pages/UserCollection.page';
import UpdateMetadata from '../pages/UpdateMetadata.page';

export const ROUTES = [
  { name: 'Home', path: '/', component: Home, nav: false },
  {
    name: 'ActivityListings',
    path: '/activity/:activityID/listings',
    component: Listings,
    nav: false,
  },
  { name: 'Listings', path: '/listings', component: Listings, nav: false },
  {
    name: 'Listing',
    path: '/listings/:listingID',
    component: Listing,
    nav: false,
  },
  {
    name: 'UserCollection',
    path: '/user/collection',
    component: UserCollection,
    nav: false,
  },
  {
    name: 'UpdateMetadata',
    path: '/nft/metadata/',
    component: UpdateMetadata,
    nav: false,
  },
];

export const NAV_ROUTES = ROUTES.filter((r) => r.nav);
