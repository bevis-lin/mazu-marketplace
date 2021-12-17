import React from 'react';
import Providers from './providers/Providers.comp';
import Routes from './components/Routes.comp';
import { ROUTES } from './config/routes.config';
import Navbar from './components/Navbar';
import Bottom from './components/Bottom';

export default function App() {
  return (
    <Providers>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Routes routes={ROUTES} />
      <br />
      <br />
      <Bottom />
    </Providers>
  );
}
