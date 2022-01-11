import React, { createContext, useContext } from 'react';

import useCurrentUser from '../hooks/use-current-user.hook';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser();

  if (!user || !loggedIn) {
    if (window.location.pathname.startsWith('/activity')) {
      console.log('Not loggedIn and visting activity listings..');
    } else {
      //return <Login tools={tools} />;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        ...tools,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
