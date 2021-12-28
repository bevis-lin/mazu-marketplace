export const CREATE_TEMPLATE = `
import SentimenTemplate from 0xTemplate
import SentimenCreator from 0xCreator

transaction(name: String, description: String, imageUrl: String, 
data: {String:String}, totalSupply: UInt64) {

  let creator: Address

  prepare(signer: AuthAccount) {
      //check if signer is creator
      self.creator = signer.address
      let sentimenCreator = SentimenCreator.getCreatorProfleByAddress(address: self.creator)?? panic("Signer is not a creator")
  }

  execute{
        SentimenTemplate.addTemplate(siteId: "mazu", creator:self.creator, name: name, description: description,
        imageUrl: imageUrl, data: data, totalSupploy: totalSupply)
  }
}
`;
