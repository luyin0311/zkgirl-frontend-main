import { WalletName } from '@c3/crypto';
import BNBWallet from '@src/image/bnb-wallet.svg';
import coinbaseImg from '@src/image/coinbase.png';
import metamaskimg from '@src/image/metamask.png';
import okxImg from '@src/image/okx.png';
import TrustWalletIcon from '@src/image/trust-wallet.png';
import unknownWallet from '@src/image/unknown-wallet.svg';
import unknownHoverWallet from '@src/image/unknown-wallet-hover.svg';

export const walletMap: { [name in WalletName]?: { showName: string; icon: string } } = {
  metamask: { showName: 'Metamask', icon: metamaskimg },
  coinbase: { showName: 'Coinbase Wallet', icon: coinbaseImg },
  okx: { showName: 'OKX Wallet', icon: okxImg },
  trustwallet: { showName: 'Trust Wallet', icon: TrustWalletIcon },
  bnbWallet: { showName: 'Binance Web3 Wallet', icon: BNBWallet },
};
export const unknownWalletInfo = {
  name: 'Unknown Wallet',
  normalIcon: unknownWallet,
  hoverIcon: unknownHoverWallet,
};
