export const GET_MINT_REQUESTS = `
import SentimenMintRequest from 0xMintRequest

pub fun main(address: Address) : [SentimenMintRequest.MintRequest]? {
  return SentimenMintRequest.getRequestsByCreator(address: address)
}
`;
