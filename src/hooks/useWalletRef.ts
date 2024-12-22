import { useWallet, WalletType } from '@c3/crypto';
import { useLatest } from '@c3/react';

export const useWalletRef = () => {
  const wallet = useWallet();
  const walletRef = useLatest(wallet);
  return walletRef as React.MutableRefObject<WalletType>;
};
