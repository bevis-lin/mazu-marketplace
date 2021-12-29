import SentimenClass from './SentimenClass';

class ListingClass {
  constructor(listingId, listingAddress, sentimenId, salePrice, sentimen) {
    this.listingId = listingId;
    this.listingAddress = listingAddress;
    this.sentimenId = sentimenId;
    this.salePrice = salePrice;
    this.sentimen = sentimen;
  }

  get type() {
    return 'Listing';
  }

  static ListingFactory(element) {
    let listingInstance = new ListingClass(
      element.listingID,
      element.address,
      element.nftID,
      element.salePrice,
      SentimenClass.SentimenFactory(element)
    );
    return listingInstance;
  }
}

export default ListingClass;
