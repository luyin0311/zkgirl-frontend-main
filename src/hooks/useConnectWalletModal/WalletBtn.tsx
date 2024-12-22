import { WalletName } from '@c3/crypto';
import { drRw375 } from '@src/common/rw';
import { Button, Image, linearGradientText, Text, useButton } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { BaseListItemType } from '@unstyled-ui/layout';
import React from 'react';

import LoadingIcon from '../../components/Loading/LoadingIcon';

// import { WalletItem } from './Modal';

export type WalletItem = BaseListItemType & {
  name: WalletName;
  icon: string;
  showName: string;
};

export type WalletBtnProps = {
  e: WalletItem;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  CSSProps;

const WalletBtn: React.FC<WalletBtnProps> = props => {
  const { e, ...restProps } = props;
  const WalletButton = useButton(
    <Button
      loadingIcon={<LoadingIcon />}
      css={{
        '&&': {
          w: drRw375(320, 306),
        },
        h: drRw375(50),
        border: '1px solid rgba(255, 255, 255, 1) ',
        gap: drRw375(12),
        borderRadius: drRw375(41),
        _hover: {
          transition: 'all 400ms',
          border: '1px solid #0CFFD3 ',
          ...linearGradientText('linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)'),
        },
      }}
      {...restProps}
    >
      <Image src={e.icon} alt={e.name} css={{ w: e.name === 'coinbase' ? drRw375(32) : drRw375(26) }} />
      <Text
        css={{
          color: 'white',
          typo: { fontSize: drRw375(18), fontWeight: 500, lineHeight: 1 },
        }}
      >
        {e.showName}
      </Text>
    </Button>,
    { useLoading: true }
  );
  return WalletButton;
};

export default WalletBtn;
