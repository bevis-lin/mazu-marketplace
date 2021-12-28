export const CHECK_IS_CREATOR = `
import SentimenCreator from 0xCreator

pub fun main(address: Address) : Bool {
  return SentimenCreator.checkIsCreator(address: address)
}
`;
