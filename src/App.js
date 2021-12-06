import React from "react";
import Header from "./components/Header";
import Providers from "./providers/Providers.comp";
import Routes from "./components/Routes.comp";
import { ROUTES } from "./config/routes.config";

export default function App() {
  return (
    <Providers>
      <Header />
      <Routes routes={ROUTES} />
    </Providers>
  );
}
