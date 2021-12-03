class SentimenClass {
  constructor(id, title, description, imageURL, activity) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.activity = activity;
  }

  get type() {
    return "Sentimen";
  }
}

export default SentimenClass;
