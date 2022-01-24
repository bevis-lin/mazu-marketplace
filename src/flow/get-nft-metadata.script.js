export const GET_NFT_METADATA = `
import SentimenMetadata from 0xMetadata

pub fun main(nftId: UInt64): SentimenMetadata.Metadata? {
  return SentimenMetadata.getMetadataForSentimenNFT(sentimenId: nftId)
}`;
