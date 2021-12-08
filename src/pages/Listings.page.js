import React from "react";
import { Image } from "semantic-ui-react";
import useSentimens from "../hooks/use-sentimens.hook";
import SentimenList from "../components/SentimenList";
import ErrorLoadingRenderer from "../components/ErrorLoadingRenderer";
import "../config/config";

export default function Listings() {
  const { loading, error, data: sentimens } = useSentimens();

  return (
    <ErrorLoadingRenderer loading={loading} error={error}>
      <SentimenList sentimes={sentimens} />
    </ErrorLoadingRenderer>
  );
}