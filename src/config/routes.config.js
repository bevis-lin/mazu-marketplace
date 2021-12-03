import Listings from "../pages/Listings.page";

export const ROUTES = [
  { name: "Home", path: "/", component: Listings, nav: false },
];

export const NAV_ROUTES = ROUTES.filter((r) => r.nav);
