export const GET_FLOW_BALANCE = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken


pub fun main(address:Address) : UFix64? {
  let account = getAccount(address)      
  let vaultCapability = account.getCapability<&FlowToken.Vault{FungibleToken.Balance}>(/public/flowTokenBalance)!
  assert(vaultCapability.borrow() != nil, message: "Can't get FungibleToken balance")

  let vaultRef = vaultCapability.borrow() ?? panic("Can't get FungibleToken balance")

  return vaultRef.balance

}`;
