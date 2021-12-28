export const GET_LISTING = `
import NFTStorefront from 0xNFTStorefront
import Marketplace from 0xMarketplace
import SentimenMetadata from 0xMetadata

pub fun main(listingID: UInt64): DipslayResult {

    var displayItems: [ListingDisplayItem] = []
    var skipCount = 0

    if let item = getListingDisplayItem(listingID: listingID) {
        displayItems.append(item)
    } else {
        skipCount = skipCount + 1
    }

    return DipslayResult(displayItems: displayItems, skipCount: skipCount)

}

pub struct ListingDisplayItem {

    pub let listingID: UInt64

    pub var address: Address

    // The identifier of type of the NonFungibleToken.NFT that is being listed.
    pub let nftType: String
    // The ID of the NFT within that type.
    pub let nftID: UInt64
    // The identifier of type of the FungibleToken that payments must be made in.
    pub let salePaymentVaultType: String
    // The amount that must be paid in the specified FungibleToken.
    pub let salePrice: UFix64
    // This specifies the division of payment between recipients.
    pub let saleCuts: [NFTStorefront.SaleCut]

    pub let timestamp: UFix64

    pub let metadata: SentimenMetadata.Metadata

    init (
        listingID: UInt64,
        address: Address,
        nftType: String,
        nftID: UInt64,
        salePaymentVaultType: String,
        salePrice: UFix64,
        saleCuts: [NFTStorefront.SaleCut],
        timestamp: UFix64,
        metadata: SentimenMetadata.Metadata
    ) {
        self.listingID = listingID
        self.address = address
        self.nftType = nftType
        self.nftID = nftID
        self.salePaymentVaultType = salePaymentVaultType
        self.salePrice = salePrice
        self.saleCuts = saleCuts
        self.timestamp = timestamp
        self.metadata = metadata
    }
}

pub struct DipslayResult {
    pub let displayItems: [ListingDisplayItem]
    pub let skipCount: Int

    init(displayItems: [ListingDisplayItem], skipCount: Int) {
        self.displayItems = displayItems
        self.skipCount = skipCount
    }
}

pub fun getListingDisplayItem(listingID: UInt64): ListingDisplayItem? {
    if let item = Marketplace.getListingIDItem(listingID: listingID) {
        if let storefrontPublic = item.storefrontPublicCapability.borrow() {
            if let listingPublic = storefrontPublic.borrowListing(listingResourceID: listingID) {
                let listingDetails = listingPublic.getDetails()

                if listingDetails.purchased == false {

                    let metadata = SentimenMetadata.getMetadataForSentimenNFT(sentimenId: listingDetails.nftID)! as SentimenMetadata.Metadata

                    return ListingDisplayItem(
                        listingID: listingID,
                        address: item.storefrontPublicCapability.address,
                        nftType: listingDetails.nftType.identifier,
                        nftID: listingDetails.nftID,
                        salePaymentVaultType: listingDetails.salePaymentVaultType.identifier,
                        salePrice: listingDetails.salePrice,
                        saleCuts: listingDetails.saleCuts,
                        timestamp: item.timestamp,
                        metadata: metadata
                    )
                }
            }
        }
    }

    return nil
}
`;
