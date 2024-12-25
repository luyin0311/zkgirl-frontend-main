import { Chain } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { formatNumber } from '@c3/utils';
import { pow10 } from '@src/common/pow10';
import Icon from '@src/components/Icon';
import { baseChainDataById, BaseChainId } from '@src/constants/baseChainDataById';
import { useGetBalance } from '@src/hooks/useGetBalance';
import useWindowSize from '@src/hooks/useWindowSize';
import { Image } from '@unstyled-ui/atomic';
import React, { useCallback, useEffect, useState } from 'react';

import css from './index.module.less';

const OpbnbBalance: React.FC = props => {
  const getBalance = useGetBalance();
  const [balance, setBalance] = useState<string>('0.0000 ');
  const wallet = useWallet();
  const [walletChain, setWalletChain] = useState<Chain>();
  const { isMobile } = useWindowSize();

  const fetchBalance = useCallback(async () => {
    const chainId = await wallet.getChainId();
    const { chain } = baseChainDataById[chainId as BaseChainId];
    setWalletChain(chain);
    const res = await getBalance(chain);
    console.log(res);
    setBalance(`${formatNumber(pow10(res.toString()), '0.0000')}${!isMobile ? ` ${chain.nativeCurrency.symbol}` : ''}`);
  }, [getBalance, wallet, isMobile]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance, wallet]);

  return (
    <div className={css.root}>
      {walletChain ? <Image src={baseChainDataById[walletChain.chainId as BaseChainId].icon} className={css.img} /> : null}
      <div className={css.txt}>{balance?.toString()}</div>
      {walletChain?.shortName === 'opbnb_mainnet' ? (
        <Icon name="Minus_M" onClick={() => window.open('https://zkbridge.com/opbnb', '_blank')} />
      ) : null}
    </div>
  );
};

export default OpbnbBalance;
