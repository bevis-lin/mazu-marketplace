class SentimenClass {
  constructor(
    listingID,
    id,
    title,
    description,
    imageURL,
    activity,
    creator,
    salePrice,
    listingAddress
  ) {
    this.listingID = listingID;
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.activity = activity;
    this.creator = creator;
    this.salePrice = salePrice;
    this.listingAddress = listingAddress;
  }

  get type() {
    return 'Sentimen';
  }

  static SentimenFactory(element) {
    let sentimenInstance = new SentimenClass(
      element.listingID,
      element.metadata.cardID,
      element.metadata.name,
      element.metadata.description,
      element.metadata.imageUrl,
      element.metadata.data.activity,
      element.metadata.data.creator,
      element.salePrice,
      element.address
    );
    return sentimenInstance;
  }

  static SentimenFactoryForCollection(element) {
    let sentimenInstance = new SentimenClass(
      0,
      element.cardID,
      element.name,
      element.description,
      element.imageUrl,
      element.data.activity,
      element.data.creator,
      ''
    );
    return sentimenInstance;
  }
}

export default SentimenClass;
