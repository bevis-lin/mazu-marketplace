export const DELETE_STORERONT = `
import NFTStorefront from 0x2ebc7543c6a3f855
import Marketplace from 0x2ebc7543c6a3f855

transaction(nftId:UInt64) {

  let storefront: &NFTStorefront.Storefront

  prepare(signer: AuthAccount){

    self.storefront = signer.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
    ?? panic("Missing or mis-typed NFTStorefront Storefront")

  }

  execute {
    let listIds = Marketplace.getActivityListingIDs(activityID:1)
    if listIds == nil {
      return
    }
    
    if let listingId = listIds[nftId] {

        if self.storefront != nil {
          self.storefront.removeListing(listingResourceID: listingId)
      
          Marketplace.removeListing(id: listingId)
        }
    
    }
  }
}
`;
