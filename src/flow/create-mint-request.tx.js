export const CREATE_MINT_REQUEST = `
import SentimenMintRequest from 0xMintRequest

transaction(templateId:UInt64, price:UFix64) {

  let creator: Address

  prepare(signer:AuthAccount){
    self.creator = signer.address
  }

  execute{
    SentimenMintRequest.addRequest(creator: self.creator, templateId:templateId ,price:price)
  }
}`;
