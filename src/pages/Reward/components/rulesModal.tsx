import { useTabModal } from '../../Mint/components/useTabModal';

export default () => {
  return useTabModal({
    title: 'Reward Distribution',
    className: 'RulesTabModal',
    content: (
      <div className="RewardRulesContent">
        <div>
          <p>
            <span>
              A snapshot of zkGirl holdings will be taken on July 11, 2024, at 00:00 UTC. Your Total Rewards = Legendary Prize + Epic Prize + Rare
              Prize + Uncommon Prize
            </span>
          </p>
          <p>
            <span>- Legendary Prize:</span>
          </p>
          <p>- Formula: (Number of Legendary zkGirls you hold / Total Supply of Legendary zkGirls) * 25,000 USDT</p>
          <p>
            <span>- Epic Prize:</span>
          </p>
          <p>- Formula: (Number of Epic zkGirls you hold / Total Supply of Epic zkGirls) * 25,000 USDT</p>
          <p>
            <span>- Rare Prize:</span>
          </p>
          <p>- Formula: (Number of Rare zkGirls you hold / Total Supply of Rare zkGirls) * 25,000 USDT</p>
          <p>
            <span>- Uncommon Prize:</span>
          </p>
          <p>- Formula: (Number of Uncommon zkGirls you hold / Total Supply of Uncommon zkGirls) * 25,000 USDT</p>
        </div>
      </div>
    ),
  });
};
