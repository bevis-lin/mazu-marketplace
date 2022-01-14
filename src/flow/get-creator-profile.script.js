export const GET_CREATOR_PROFILE = `
import SentimenCreator from 0xCreator

pub fun main(address: Address): SentimenCreator.Creator? {
  return SentimenCreator.getCreatorProfleByAddress(address: address)
}`;
