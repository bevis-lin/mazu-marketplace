import React from 'react';
import useUserSentimens from '../hooks/use-user-sentimens.hook';
import SentimenList from '../components/SentimenList';
import ErrorLoadingRenderer from '../components/ErrorLoadingRenderer';
import '../config/config';

export default function UserCollection() {
  const { loading, error, data: sentimens } = useUserSentimens();

  return (
    <ErrorLoadingRenderer loading={loading} error={error}>
      <SentimenList sentimes={sentimens} />
    </ErrorLoadingRenderer>
  );
}
