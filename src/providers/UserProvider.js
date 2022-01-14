import React, { createContext, useContext } from 'react';
import useUserSentimens from '../hooks/use-user-sentimens.hook';
import useMintRequest from '../hooks/use-mint-request.hook';
import useFLOW from '../hooks/use-flow.hook';
//import { useAuth } from './AuthProvider';
import useCreatorTemplates from '../hooks/use-creator-templates.hook';

const UserContext = createContext();

export default function UserProvider({ children }) {
  //const { user } = useAuth();
  const { data: balance, getFLOWBalance } = useFLOW();
  const {
    data: userSentimens,
    addSentimen,
    purchaseSentimen,
  } = useUserSentimens(getFLOWBalance);
  //const { data: creatorTemplates, createTemplate } = useCreatorTemplates(user);
  const { isCreator, creator } = useCreatorTemplates();
  const { createMintRequest } = useMintRequest();
  //console.log('log from user provider..');
  return (
    <UserContext.Provider
      value={{
        userSentimens,
        addSentimen,
        purchaseSentimen,
        balance,
        getFLOWBalance,
        createMintRequest,
        isCreator,
        creator,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
