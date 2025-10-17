import { appTransaction } from './libs'
import { CreateContractParams } from './types'
import { readWasmFromFile } from './utils'

import {
  ContractCreate,
  Function as XrplFunction,
  InstanceParameter,
  InstanceParameterValue,
} from 'xrpl'

export interface SetContractPayload {
  account: string
  hash?: string | null
  createFile?: string | null
  flags?: number | 0
  instanceParameters?: InstanceParameter[] | null
  instanceParameterValues?: InstanceParameterValue[] | null
  functions?: XrplFunction[] | null
  fee?: string | null
}

export function createContractPayload(
  payload: SetContractPayload
): ContractCreate {
  const builtTxn = {} as ContractCreate
  builtTxn.TransactionType = 'ContractCreate'
  builtTxn.Account = payload.account
  if (payload.hash && typeof payload.hash === 'string') {
    builtTxn.ContractHash = payload.hash
  }
  if (payload.createFile && typeof payload.createFile === 'string') {
    builtTxn.ContractCode = readWasmFromFile(
      payload.createFile,
      payload.createFile,
      'wasm'
    )
  }
  if (payload.flags) {
    builtTxn.Flags = payload.flags
  }
  if (payload.fee) {
    builtTxn.Fee = payload.fee
  }
  if (payload.instanceParameters) {
    builtTxn.InstanceParameters = payload.instanceParameters
  }
  if (payload.instanceParameterValues) {
    builtTxn.InstanceParameterValues = payload.instanceParameterValues
  }
  if (payload.functions) {
    builtTxn.Functions = payload.functions
  }
  // DA: validate
  return builtTxn
}

export async function createContract({
  client,
  wallet,
  tx,
}: CreateContractParams): Promise<
  | (Record<string, any> & {
      id: string
      account: string
    })
  | null
> {
  // appLogger.debug(`1. Transaction to submit (before autofill):`)
  // appLogger.debug(JSON.stringify(tx, null, 2))
  // appLogger.debug(`\n2. Submitting transaction...`)

  const txResponse = await appTransaction(client, tx, wallet, {
    hardFail: true,
    count: 2,
    delayMs: 1000,
  })

  // Get Contract Address
  console.log(JSON.stringify(txResponse.result.meta))

  // Loop through the AffectedNodes to find the CreatedNode LedgerEntryType == Contract then get the LedgerIndex (this is the ContractID).
  // Then find the CreatedNode with LedgerEntryType == AccountRoot and the ContractID on the AccountRoot, FinalFields.ContractID
  const meta = txResponse.result.meta
  let contractId: string | undefined
  let contractAccount: string | undefined

  if (typeof meta === 'object' && meta !== null && 'AffectedNodes' in meta) {
    const affectedNodes = (meta as any).AffectedNodes as any[]
    for (const node of affectedNodes) {
      if (node.CreatedNode) {
        const created = node.CreatedNode
        if (created.LedgerEntryType === 'Contract') {
          contractId = created.LedgerIndex
          contractAccount = created.NewFields.ContractAccount
        }
      }
    }
  }

  console.log('ContractID:', contractId)
  console.log('AccountRoot.Account:', contractAccount)

  // appLogger.debug(`\n3. SetHook Success...`)
  return {
    id: contractId,
    account: contractAccount,
  }
}
