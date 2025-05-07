import { Client, Transaction, Wallet } from 'xrpl'

export type SetContractParams = {
  client: Client
  wallet: Wallet
}

export interface SmartContractParams {
  wallet: Wallet
  tx: Transaction
}
