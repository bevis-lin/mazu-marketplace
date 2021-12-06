class SentimenClass {
  constructor(listingID, id, title, description, imageURL, activity, creator) {
    this.listingID = listingID;
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.activity = activity;
    this.creator = creator;
  }

  get type() {
    return "Sentimen";
  }

  static SentimenFactory(element) {
    let sentimenInstance = new SentimenClass(
      element.listingID,
      element.metadata.cardID,
      element.metadata.name,
      element.metadata.description,
      element.metadata.imageUrl,
      element.metadata.data.activity,
      element.metadata.creator
    );
    return sentimenInstance;
  }
}

export default SentimenClass;
