import { WalletName, walletName_Coinbase, walletName_Metamask } from '@c3/crypto';
import { noop, waitFor } from '@c3/utils';
import { drRw375, vw } from '@src/common/rw';
import { modalCss } from '@src/constants/style';
import { walletMap } from '@src/constants/wallet';
import { useWalletRef } from '@src/hooks/useWalletRef';
import { useGlobalStore } from '@src/store/globalStore';
import { Space, Text } from '@unstyled-ui/atomic';
import { CSSProperties } from '@unstyled-ui/core';
import { useModal } from '@unstyled-ui/ct-modal';
import { BaseListItemType, Col, List } from '@unstyled-ui/layout';
import React, { useCallback, useMemo } from 'react';

import WalletBtn from './WalletBtn';

export type WalletItem = BaseListItemType & {
  name: WalletName;
  icon: string;
  showName: string;
};
const wallets: WalletItem[] = [
  {
    name: walletName_Metamask,
    id: 'metamask',
    showName: 'MetaMask',
    icon: walletMap.metamask?.icon || '',
  },
  {
    name: walletName_Coinbase,
    id: 'coinbase',
    showName: 'Coinbase Wallet',
    icon: walletMap.coinbase?.icon || '',
  },
  {
    name: 'okx',
    id: 'okx',
    showName: 'OKX',
    icon: walletMap.okx?.icon || '',
  },
  {
    name: 'trustwallet',
    id: 'trustwallet',
    showName: 'Trust Wallet',
    icon: walletMap.trustwallet?.icon || '',
  },
];

export const useConnectWalletModal = (css: CSSProperties = {}) => {
  const walletRef = useWalletRef();
  const { state, action } = useGlobalStore(s => s);
  const clickWallet = useCallback(
    async (e: WalletItem) => {
      const p = await walletRef.current?.switchProvider(e.name);
      await waitFor(() => p === walletRef.current?.provider);
      await walletRef.current?.connectAccount();
      action.update({ showConnectWalletModal: false });
    },
    [action, walletRef]
  );

  const [modal, show, hide, visible] = useModal(
    useMemo(
      () => ({
        css: { ...modalCss, ...css },
        body: (
          <Col
            className="connect-wallet-modal"
            css={{
              w: vw(347, 480),
              borderRadius: drRw375(16),
              background: '#051803',
              fx: 'center',
            }}
          >
            <Space size={drRw375(40, 64)} />
            <Text
              css={{
                color: 'white',
                typo: {
                  fontSize: drRw375(28),
                  fontWeight: 500,
                  lineHeight: drRw375(28),
                },
                // alignSelf: 'flex-start',
              }}
            >
              Connect Wallet
            </Text>
            <Space size={drRw375(32)} />
            <List
              data={wallets}
              updateData={noop}
              css={{ gap: 16 }}
              renderItem={(e: WalletItem) => (
                <WalletBtn
                  e={e}
                  onClick={async () => {
                    await clickWallet(e);
                  }}
                />
              )}
            />
            <Space size={drRw375(64)} />
          </Col>
        ),
      }),
      [clickWallet, css]
    )
  );

  return [modal, show, hide] as const;
};
