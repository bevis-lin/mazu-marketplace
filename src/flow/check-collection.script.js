export const CHECK_COLLECTION = `
import NonFungibleToken from 0xNonFungibleToken
import Sentimen from 0xSentimen
  
  pub fun main(addr: Address): Bool {
    if getAccount(addr).getCapability(/public/sentimenCollection)!.borrow<&Sentimen.Collection{Sentimen.ICardCollectionPublic, NonFungibleToken.CollectionPublic}>() != nil {
      return true
    }else {
      return false
    }
  }
`;
