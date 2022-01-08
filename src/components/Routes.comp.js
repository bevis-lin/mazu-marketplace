import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound.page';

export default function RouteComp({ routes }) {
  const renderRoutes = routes.map((route) => {
    const { path, component } = route;
    return <Route path={path} element={component} key={path} exact />;
  });

  return (
    <Routes>
      {renderRoutes}
      <Route element={NotFound} />
    </Routes>
  );
}
