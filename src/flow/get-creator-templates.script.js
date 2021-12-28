export const GET_CREATOR_TEMPLATES = `
import SentimenTemplate from 0xTemplate
import SentimenCreator from 0xCreator

pub fun main(addr: Address): [SentimenTemplate.Template]? {
 
  return SentimenTemplate.getTemplatesByCreator(address: addr)

}
`;
