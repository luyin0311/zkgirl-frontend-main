import useWindowSize from '@src/hooks/useWindowSize';
import { useGlobalStore } from '@src/store/globalStore';
import React from 'react';

import css from './index.module.less';

const ConnectAccountButton: React.FC = props => {
  const { action } = useGlobalStore(s => s);
  const { isMobile } = useWindowSize();

  return (
    <div className={css.btn} onClick={() => action.update({ showLoginModal: true })}>
      <span>{isMobile ? 'Connect' : 'Connect Wallet'}</span>
    </div>
  );
};

export default ConnectAccountButton;
