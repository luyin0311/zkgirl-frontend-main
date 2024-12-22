import { BigNumber, Contract, ContractTransaction, PayableOverrides } from 'ethers';

export const incrGasLimit = (originGasLimit: BigNumber, upPercent: number) => {
  return originGasLimit.mul(Math.floor(100 * (1 + upPercent))).div(100);
};

export const runContractMethodWithIncreatedGasLimit = async <T extends Contract, M extends string>(
  contract: T,
  method: M,
  args: Parameters<T[M]>,
  upPercent = 0.1,
  override: PayableOverrides & { from?: string } = {}
): Promise<ContractTransaction> => {
  const estimatedGasLimit = await contract.estimateGas[method](...args, override);
  return contract[method](...args, {
    gasLimit: incrGasLimit(estimatedGasLimit, upPercent),
    ...override,
  });
};
