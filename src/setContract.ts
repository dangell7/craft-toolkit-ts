// import { appTransaction } from './libs/xrpl-helpers/transaction'
// import { appLogger } from './libs/logger'

export interface SetHookPayload {
  version?: number | null
  hookHash?: string | null
  createFile?: string | null
  namespace?: string | null
  flags?: number | 0
  hookOnArray?: string[] | null
  fee?: string | null
}
