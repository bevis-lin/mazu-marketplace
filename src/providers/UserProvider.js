import React, { createContext, useContext } from 'react';
import useUserSentimens from '../hooks/use-user-sentimens.hook';
import useMintRequest from '../hooks/use-mint-request.hook';
import useFLOW from '../hooks/use-flow.hook';
import { useAuth } from './AuthProvider';
import useCollection from '../hooks/use-collection.hook';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';

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
  const { data: creatorTemplates, createTemplate } = useCreatorTemplates(user);
  const { createMintRequest } = useMintRequest();

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
        creatorTemplates,
        createTemplate,
        createMintRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
