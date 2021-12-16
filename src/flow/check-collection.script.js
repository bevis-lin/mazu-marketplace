export const CHECK_COLLECTION = `
import NonFungibleToken from 0xf21fee1faa18dce2  
import Sentimen from 0xSentimen
  
  pub fun main(addr: Address): Bool {
    if getAccount(addr).getCapability(/public/sentimenCollection)!.borrow<&Sentimen.Collection{Sentimen.ICardCollectionPublic, NonFungibleToken.CollectionPublic}>() != nil {
      return true
    }else {
      return false
    }
  }
`;
