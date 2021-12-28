class SentimenTemplateClass {
  constructor(
    id,
    siteId,
    name,
    description,
    imageURL,
    data,
    totalSupply,
    totalMinted
  ) {
    this.id = id;
    this.siteId = siteId;
    this.name = name;
    this.description = description;
    this.imageURL = imageURL;
    this.data = data;
    this.totalSupply = totalSupply;
    this.totalMinted = totalMinted;
  }

  get type() {
    return 'SentimenTemplate';
  }

  static SentimenTemplateFactory(element) {
    let sentimenTemplateInstance = new SentimenTemplateClass(
      element.templateId,
      element.siteId,
      element.name,
      element.description,
      element.imageUrl,
      element.data,
      element.totalSupply,
      element.totalMinted
    );

    return sentimenTemplateInstance;
  }
}

export default SentimenTemplateClass;
