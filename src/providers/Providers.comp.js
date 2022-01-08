import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './UserProvider';
import TxProvider from './TxProvider';
import AuthProvider from './AuthProvider';
import CollectionProvider from './CollectionProvider';

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TxProvider>
          <CollectionProvider>
            <UserProvider>
              <div className="app">{children}</div>
            </UserProvider>
          </CollectionProvider>
        </TxProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
