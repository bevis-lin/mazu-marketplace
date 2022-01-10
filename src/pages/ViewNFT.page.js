import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { query } from '@onflow/fcl';
import { GET_NFT_METADATA } from '../flow/get-nft-metadata.script';
import SentimenClass from '../utils/SentimenClass';
import Sentimen from '../components/Sentimen';
import { Container } from 'semantic-ui-react';

export default function ViewNFT() {
  const [sentimen, setSentimen] = useState(null);

  const { nftID } = useParams();

  useEffect(() => {
    const get_metadata = async (nftId) => {
      try {
        var res;

        res = await query({
          cadence: GET_NFT_METADATA,
          args: (arg, t) => [arg(parseInt(nftId), t.UInt64)],
        });

        console.log(res);
        var element = {
          metadata: res,
        };
        setSentimen(SentimenClass.SentimenFactory(element));
      } catch (err) {
        console.log(err);
      }
    };

    console.log(`View NFT ID:${nftID}`);
    if (nftID) {
      get_metadata(nftID);
    }
  }, [nftID]);

  return (
    <Container text>
      {sentimen ? (
        <Sentimen sentimen={sentimen}></Sentimen>
      ) : (
        'Sentimen NFT Viwer'
      )}
    </Container>
  );
}
