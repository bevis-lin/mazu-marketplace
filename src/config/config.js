import { config } from '@onflow/fcl';

config({
  'accessNode.api': process.env.REACT_APP_ACCESS_NODE,
  'discovery.wallet': process.env.REACT_APP_WALLET_DISCOVERY,
  '0xFungibleToken': process.env.REACT_APP_FT_CONTRACT,
  '0xFUSD': process.env.REACT_APP_FUSD_CONTRACT,
  '0xSentimen': process.env.REACT_APP_SENTIMEN_CONTRACT,
  '0xMetadata': process.env.REACT_APP_SENTIMENMETADATA_CONTRACT,
  '0xNFTStorefront': process.env.REACT_APP_NFTSTOREFRONT_CONTRACT,
  '0xMarketplace': process.env.REACT_APP_MARTKETPLACE_CONTRACT,
});
