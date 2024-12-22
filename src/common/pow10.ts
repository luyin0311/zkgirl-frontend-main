import BigNumber from 'bignumber.js';

export function pow10(num: number | string | undefined, decimals = 18): string {
  if (!num) {
    return '0';
  }
  return new BigNumber(num).dividedBy(new BigNumber(10).pow(decimals)).toFixed();
}
