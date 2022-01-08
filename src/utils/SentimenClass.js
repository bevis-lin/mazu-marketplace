class SentimenClass {
  constructor(id, templateId, title, description, imageURL, activity, creator) {
    this.id = id;
    this.templateId = templateId;
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.activity = activity;
    this.creator = creator;
  }

  get type() {
    return 'Sentimen';
  }

  static SentimenFactory(element) {
    //console.log(element);

    if (!element.metadata) {
      let sentimenInstance = new SentimenClass(
        element.sentimenId,
        element.cardID, //template id
        element.name,
        element.description,
        element.imageUrl,
        element.data.activity,
        element.data.creator
      );
      return sentimenInstance;
    } else {
      let sentimenInstance = new SentimenClass(
        element.metadata.sentimenId,
        element.metadata.cardID, //template id
        element.metadata.name,
        element.metadata.description,
        element.metadata.imageUrl,
        element.metadata.data.activity,
        element.metadata.data.creator
      );
      return sentimenInstance;
    }
  }
}

export default SentimenClass;
