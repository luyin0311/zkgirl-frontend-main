import UnknownNetworkIcon from '@src/image/unkown-network-hover.svg';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

import { UnknownNetwork } from './const';
import css from './index.module.less';

export type NetworkBtnProps = CSSProps & {
  icon: string;
  text: string;
  onClick: () => void;
};

const NetworkBtn: React.FC<NetworkBtnProps> = props => {
  const { text, icon } = props;
  const isUnknwonNetwork = text === UnknownNetwork;
  const imgIcon = isUnknwonNetwork ? UnknownNetworkIcon : icon;

  return (
    <div className={css.root}>
      <img src={imgIcon} />
      <div className={css.txt}>{text}</div>
    </div>
  );
};

export default NetworkBtn;
