import './rulesModal.less';

import { useTabModal } from '../../Mint/components/useTabModal';

export default () => {
  return useTabModal({
    title: 'Shovel Synthesis Rules',
    className: 'RulesTabModal',
    content: (
      <div className="RewardRulesContent">
        <div>
          <p>The synthesis method follows a 2-to-1 system. Select the shovels to be combined and click the Synthesize button to proceed.
          </p>
          <p>
          - Synthesis Success Rates:
          </p>
          <p>- Iron → Copper: 80%</p>
          <p>
          - Copper → Silver: 50%
          </p>
          <p>- Silver → Gold: 20%</p>
          <p>
          - Gold → Rainbow: 1%
          </p>

        </div>
      </div>
    ),
  });
};
