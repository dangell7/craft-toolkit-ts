// xrpl
import {
  ContractCall,
  ContractFlags,
  convertStringToHex,
  xrpToDrops,
} from 'xrpl'
import {
  // Testing
  XrplIntegrationTestContext,
  setupClient,
  teardownClient,
  serverUrl,
  // Main
  createContractPayload,
  createContract,
  CreateContractParams,
  Xrpld,
  rpc,
} from '../../../../dist/npm/src'
import {
  iInstanceParameter,
  iParameterFlag,
  iParameterName,
  iParameterType,
  iInstanceParameterValue,
  iParameterValue,
  iFunction,
  iFunctionName,
  iFunctionParameter,
  iParameter,
} from '../../../../dist/npm/src/models'

describe('base', () => {
  let testContext: XrplIntegrationTestContext
  let contractAccount: string

  beforeAll(async () => {
    testContext = await setupClient(serverUrl)
    console.log(testContext.client.connection.getUrl())

    const instanceParam1 = new iInstanceParameter(
      new iParameterFlag(65536),
      new iParameterName('616D6F756E74', true),
      new iParameterType('AMOUNT')
    )

    const instanceParamValue1 = new iInstanceParameterValue(
      instanceParam1.flag,
      instanceParam1.type,
      new iParameterValue(xrpToDrops('2000'))
    )

    const functionParam1 = new iFunctionParameter(
      new iParameterFlag(0),
      new iParameterName('uint8'),
      new iParameterType('UINT8')
    )

    const function1 = new iFunction(new iFunctionName('base'), [functionParam1])

    const tx = createContractPayload({
      account: testContext.alice.classicAddress,
      createFile: 'base',
      flags: ContractFlags.tfImmutable,
      instanceParameters: [instanceParam1.toXrpl()],
      instanceParameterValues: [instanceParamValue1.toXrpl()],
      functions: [function1.toXrpl()],
      fee: '2000000',
    })

    const { account } = (await createContract({
      client: testContext.client,
      wallet: testContext.alice,
      tx: tx,
    } as CreateContractParams)) as any
    contractAccount = account as string
  })
  afterAll(async () => {
    await teardownClient(testContext)
  })

  it('basic contract', async () => {
    console.log(`Contract Account: ${contractAccount}`)
    const aliceWallet = testContext.alice

    const parameter1 = new iParameter(
      new iParameterType('UINT8'),
      new iParameterValue(1)
    )
    const builtTx: ContractCall = {
      TransactionType: 'ContractCall',
      Account: aliceWallet.classicAddress,
      ContractAccount: contractAccount,
      ComputationAllowance: 1000000,
      FunctionName: convertStringToHex('base'),
      Parameters: [parameter1.toXrpl()],
      Fee: '1000000',
    }
    console.log(JSON.stringify(builtTx, null, 2))
    const result = await Xrpld.submit(testContext.client, {
      wallet: aliceWallet,
      tx: builtTx,
    })
    console.log(result)

    const contractInfo = await rpc(testContext.client, {
      command: 'contract_info',
      contract_account: contractAccount,
      account: aliceWallet.classicAddress,
    })
    console.log(contractInfo)
  })
})
