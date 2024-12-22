import { PoolAddress } from '@src/config';

import { useBalanceStore } from '../store/store';
import { useTabModal } from './useTabModal';

export default () => {
  const { state } = useBalanceStore(s => s);

  return useTabModal({
    title: `${PoolAddress[state.network][state.poolActive[state.network]].name} Rules`,
    className: 'RulesTabModal',
    content: (
      <div className="RulesContent">
        <div>{PoolAddress[state.network][state.poolActive[state.network]].rules}</div>
      </div>
    ),
  });
};
