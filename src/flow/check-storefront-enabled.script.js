export const CHCECK_STOREFRONT_ENABLED = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import NonFungibleToken from 0xNoneFungibleToken
import NFTStorefront from 0xNFTStorefront
import Sentimen from 0xSentimen

pub fun main(addr: Address): Bool {

  let account = getAccount(addr)

  if account.getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath) == nil {
    return false
  }
  
  return true
}`;
