import { baseChainDataById, BaseChainId } from '@src/constants/baseChainDataById';

export type SupportedChainsProps = {
  chainList: BaseChainId[];
};

const ShownLength = 6;
export const SupporttedNetwork: React.FC<SupportedChainsProps> = props => {
  const { chainList } = props;
  const left = chainList.length - ShownLength;
  const chains = chainList.slice(0, ShownLength + 1);
  return (
    <>
      {chains.map((chainId, i) => {
        const icon = baseChainDataById[chainId]?.icon;
        if (i < ShownLength) {
          return <img key={chainId} data-index={i} src={icon} alt="" className="chain-icon-item" />;
        } else {
          return (
            <div className="chain-icon-item" key={chainId}>
              <img key={chainId} data-index={i} src={icon} alt="" />
              <div className="overlay">
                <div className="text">+{left}</div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};
