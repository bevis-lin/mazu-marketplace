import { config } from '@onflow/fcl';

config({
  'accessNode.api': process.env.REACT_APP_ACCESS_NODE,
  'discovery.wallet': process.env.REACT_APP_WALLET_DISCOVERY,
  '0xFungibleToken': process.env.REACT_APP_FUNGIBLETOKEN_CONTRACT,
  '0xFUSD': process.env.REACT_APP_FUSD_CONTRACT,
  '0xSentimen': process.env.REACT_APP_SENTIMEN_CONTRACT,
  '0xPack': process.env.REACT_APP_SENTIMENPACK_CONTRACT,
  '0xMetadata': process.env.REACT_APP_SENTIMENMETADATA_CONTRACT,
  '0xNFTStorefront': process.env.REACT_APP_NFTSTOREFRONT_CONTRACT,
  '0xMarketplace': process.env.REACT_APP_MARTKETPLACE_CONTRACT,
  '0xCreator': process.env.REACT_APP_SENTIMENCREATOR_CONTRACT,
  '0xTemplate': process.env.REACT_APP_SENTIMENTEMPLATE_CONTRACT,
  '0xMintRequest': process.env.REACT_APP_SENTIMENMINTREQUEST_CONTRACT,
  '0xNonFungibleToken': process.env.REACT_APP_NONFUNGIBLETOKEN_CONTRACT,
  '0xFlowToken': process.env.REACT_APP_FLOWTOKEN_CONTRACT,
});
