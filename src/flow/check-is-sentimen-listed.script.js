export const CHECK_IS_SENTIMEN_LISTED = `
import Sentimen from 0xSentimen
import Marketplace from 0xMarketplace

pub fun main(nftId: UInt64): Bool {

  let listingId = Marketplace.getListingID(nftType: Type<@Sentimen.NFT>(), nftID: nftId)

  if listingId == nil {
    return false
  }else{
    return true
  }

}
`;
