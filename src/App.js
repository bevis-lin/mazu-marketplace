import React from 'react';
import Providers from './providers/Providers.comp';
import RouteComp from './components/Routes.comp';
import { ROUTES } from './config/routes.config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <Providers>
      <Navbar />
      <RouteComp routes={ROUTES} />
      <Footer />
    </Providers>
  );
}
