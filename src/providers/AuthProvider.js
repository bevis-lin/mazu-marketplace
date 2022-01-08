import React, { createContext, useContext } from 'react';

import useCurrentUser from '../hooks/use-current-user.hook';
import { Header, Button, Grid, Image, Divider } from 'semantic-ui-react';
import Login from '../pages/Login.page';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser();

  if (!user || !loggedIn) return <Login tools={tools} />;

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
