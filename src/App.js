import React from 'react';
import Providers from './providers/Providers.comp';
import RouteComp from './components/Routes.comp';
import { ROUTES } from './config/routes.config';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Providers>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <RouteComp routes={ROUTES} />
      <br />
      <br />
    </Providers>
  );
}
