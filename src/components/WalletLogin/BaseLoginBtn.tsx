import { WalletName } from '@c3/crypto';
import { Button } from '@src/components/UButton';
import { walletMap } from '@src/constants/wallet';
import useWindowSize from '@src/hooks/useWindowSize';
import { useGlobalStore } from '@src/store/globalStore';
import { Image, Text, useButton } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

import LoadingIcon from '../Loading/LoadingIcon';
import { useWalletLogin } from './useWalletLogin';

export const _Button: React.FC<CSSProps & { showName: string; icon: string; extra?: React.ReactNode }> = props => {
  const { showName, icon, extra, ...restProps } = props;
  const { isMobile } = useWindowSize();

  return (
    <Button
      loadingIcon={<LoadingIcon css={{ mr: 12 }} />}
      className="polygonBtn"
      css={{
        w: isMobile ? 311 : 344,
        h: 48,
        p: 0,
        '&&': { border: 'none' },
        cursor: 'pointer',
        fx: 'center',
        '&& > div::after': {
          background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0.18%, rgba(255,255,255,0.3) 99.9%)',
        },
        background: 'transparent',
        '&&&:hover': {
          background: 'transparent',
          div: {
            background: 'transparent',
          },
          'div::after': {
            background: 'white',
          },
          '&&::before': {
            background: 'white',
          },
        },
        '&&&::before': {
          background: 'rgba(255,255,255,0.3)',
        },
        transition: 'all 200ms',
      }}
      {...restProps}
    >
      <Image src={icon} alt="metamask" css={{ w: 24 }} />
      <Text
        css={{
          typo: { fontSize: 16, fontWeight: 500, lineHeight: 1 },
          pl: 12,
        }}
      >
        {showName}
      </Text>
      {extra}
    </Button>
  );
};

export type BaseLoginButtonProps = {
  name: WalletName;
} & CSSProps;
export const BaseLoginButton: React.FC<BaseLoginButtonProps> = props => {
  const { name } = props;
  const login = useWalletLogin();
  const { action } = useGlobalStore(s => s);

  return useButton(
    <_Button
      showName={walletMap[name]?.showName || ''}
      icon={walletMap[name]?.icon || ''}
      onClick={async () => {
        try {
          const res = await login(name);
          action.update({ showLoginModal: false });
          return res;
        } catch (e) {
          console.log('===>e', e);
          // message.error(getReadableError(e));
        }
      }}
      {...props}
    />,
    { useLoading: true }
  );
};
