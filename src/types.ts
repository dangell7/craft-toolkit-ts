import { Client, ContractCreate, Transaction, Wallet } from 'xrpl'

export type CreateContractParams = {
  client: Client
  wallet: Wallet
  tx: ContractCreate
}

export interface SmartContractParams {
  wallet: Wallet
  tx: Transaction
}
