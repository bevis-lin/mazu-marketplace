import React, { createContext, useContext } from 'react';

import useFLOW from '../hooks/use-flow.hook';
import { useAuth } from './AuthProvider';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const { user } = useAuth();
  const { data: balance, getFLOWBalance } = useFLOW(user);

  return (
    <UserContext.Provider
      value={{
        balance,
        getFLOWBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
