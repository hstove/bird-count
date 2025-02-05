import { TestProvider, txOk } from '@clarigen/test';
import { contracts, accounts, BirdCountContract } from '@contracts';

const alice = accounts.deployer.address; //"ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA";
//console.log(accounts);
let counter: BirdCountContract;

async function deploy() {
  const deployed = await TestProvider.fromContracts(contracts);

  counter = deployed.birdCount.contract;
}

describe('Counter contract', () => {
  beforeAll(async () => {
    await deploy();
  });

  test('initial counter is 0', async () => {
    const response = await counter.getCounter();
    expect(response).toEqual(0n);
  });

  test('increment counter', async () => {
    const tx = counter.increment();
    const result = await txOk(tx, alice);
    expect(result.value).toBe(true);
    await expect(counter.getCounter()).resolves.toEqual(BigInt(1));
  });

  test('decrement counter', async () => {
    const result = await txOk(counter.decrement(), alice);
    expect(result.value).toBe(true);
    await expect(counter.getCounter()).resolves.toEqual(BigInt(0));
  });
});
