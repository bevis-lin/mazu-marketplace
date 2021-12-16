import React, { createContext, useContext } from 'react';
import useUserSentimens from '../hooks/use-user-sentimens.hook';
import useFLOW from '../hooks/use-flow.hook';
import { useAuth } from './AuthProvider';
import useCollection from '../hooks/use-collection.hook';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const { user } = useAuth();
  const { hasCollection, createCollection } = useCollection(user);
  const { data: balance, getFLOWBalance } = useFLOW(user);
  const {
    data: userSentimens,
    addSentimen,
    purchaseSentimen,
  } = useUserSentimens(user, hasCollection, getFLOWBalance);

  return (
    <UserContext.Provider
      value={{
        userSentimens,
        addSentimen,
        purchaseSentimen,
        balance,
        getFLOWBalance,
        hasCollection,
        createCollection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
