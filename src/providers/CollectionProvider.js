import React, { createContext, useContext } from 'react';
import useCollection from '../hooks/use-collection.hook';

const CollectionContext = createContext();

export default function CollectionProvider({ children }) {
  const { hasCollection, checkCollection, createCollection, deleteCollection } =
    useCollection();

  return (
    <CollectionContext.Provider
      value={{
        hasCollection,
        checkCollection,
        createCollection,
        deleteCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export const useUserCollection = () => {
  return useContext(CollectionContext);
};
