import Icon from '@src/components/Icon';
import { PoolAddress } from '@src/config';
import classnames from 'classnames';
import React from 'react';

import { useBalanceStore } from '../store/store';
import useHistoryModal from './historyModal';
import usePoolModal from './poolModal';
import useRulesModal from './rulesModal';

const Comp: React.FC = () => {
  const { modal: modalHistory, onShow: showHistory } = useHistoryModal();
  const { modal: modalPool, onShow: showPool } = usePoolModal();
  const { modal: modalRules, onShow: showRules } = useRulesModal();
  const { action, state } = useBalanceStore(s => s);

  return (
    <>
      <div className="poolNav">
        {PoolAddress[state.network].map((item, index) => (
          <div
            key={`${state.network}_${index}`}
            onClick={() => {
              action.updatePoolActive(state.network, index);
            }}
            className={classnames('item', {
              cur: state.poolActive[state.network] === index,
            })}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="tab">
        <div className={classnames(`item item${state.poolActive[state.network]}`)} onClick={showPool}>
          <Icon name="Pool" />
          <div>Pool</div>
        </div>
        <div className={classnames('item')} onClick={showHistory}>
          <Icon name="Clock" />
          <div>History</div>
        </div>
        <div className={classnames(`item item${state.poolActive[state.network]}`)} onClick={showRules}>
          <Icon name="Warning" />
          <div>Rules</div>
        </div>
        {modalHistory}
        {modalPool}
        {modalRules}
      </div>
    </>
  );
};

export default Comp;
