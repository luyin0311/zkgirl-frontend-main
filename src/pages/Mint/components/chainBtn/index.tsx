import './index.less';

import { useSwitchNetwork } from '@src/hooks/useSwitchNetwork';
import useWindowSize from '@src/hooks/useWindowSize';
import classNames from 'classnames';
import React from 'react';

import { useBalanceStore } from '../../store/store';
import opbnbImg from './img/opbnb.png';

export type IProps = {
  className?: string;
};

const Comp: React.FC<IProps> = props => {
  const { action, state } = useBalanceStore(s => s);
  const switchChain = useSwitchNetwork();
  const { isMobile } = useWindowSize();

  return (
    <div className="headerChainBar">
      <div
        className={classNames('item opbnb', {
          cur: state.network === 'opbnb_mainnet',
        })}
        onClick={() => {
          action.updateNetwork('opbnb_mainnet');
          switchChain('opbnb_mainnet');
        }}
      >
        <div>
          <img src={opbnbImg} alt="" />
        </div>
      </div>
      {/* <div className={classNames('item matic', { cur: state.network === 'matic' })} onClick={() => {
        action.updateNetwork('matic');
        switchChain('matic');
      }}>
        <div><img src={polygonImg} alt="" /></div>
      </div> */}
    </div>
  );
};

export default Comp;
