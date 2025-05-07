// xrpl
import { EscrowCreate, EscrowFinish, xrpToDrops } from 'xrpl'
import {
  // Testing
  XrplIntegrationTestContext,
  setupClient,
  teardownClient,
  serverUrl,
  // Main
  Xrpld,
  buildContract,
  seq,
  close,
} from '../../../../dist/npm/src'

describe('base', () => {
  let testContext: XrplIntegrationTestContext

  beforeAll(async () => {
    testContext = await setupClient(serverUrl)
  })
  afterAll(async () => {
    await teardownClient(testContext)
  })

  it('basic hook', async () => {
    const aliceWallet = testContext.alice
    const bobWallet = testContext.bob

    const sequence = await seq(testContext.client, aliceWallet.classicAddress)

    // Create a contract
    {
      await close(testContext.client)
      const finish = buildContract('base', 'wasm')
      const CLOSE_TIME: number = (
        await testContext.client.request({
          command: 'ledger',
          ledger_index: 'validated',
        })
      ).result.ledger.close_time
      const builtTx: EscrowCreate = {
        TransactionType: 'EscrowCreate',
        Account: aliceWallet.classicAddress,
        Destination: bobWallet.classicAddress,
        Amount: xrpToDrops(1),
        CancelAfter: CLOSE_TIME + 2000,
        FinishAfter: CLOSE_TIME + 5,
        FinishFunction: finish,
        Data: xrpToDrops(70),
      }
      const result = await Xrpld.submit(testContext.client, {
        wallet: aliceWallet,
        tx: builtTx,
      })
      console.log(result)
    }

    for (let i = 0; i < 10; i++) {
      await close(testContext.client)
    }

    // Finish the contract
    {
      const builtTx: EscrowFinish = {
        TransactionType: 'EscrowFinish',
        Account: bobWallet.classicAddress,
        Owner: aliceWallet.classicAddress,
        OfferSequence: sequence,
        ComputationAllowance: 1000000,
      }
      const result = await Xrpld.submit(testContext.client, {
        wallet: bobWallet,
        tx: builtTx,
      })
      console.log(result)
    }
  })
})
