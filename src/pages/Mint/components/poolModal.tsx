import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { convertIpfsUrlIfNeeded } from '@src/common/convertIpfsUrlIfNeeded';
import { getShortenAddress } from '@src/common/tool';
import { PoolAddress } from '@src/config';
import { getChainByAppId } from '@src/constants/baseChainDataById';
import { Tooltip } from 'antd';
import InfiniteScroll from 'antd-mobile/es/components/infinite-scroll';
import { useCallback, useEffect, useState } from 'react';

import { getPool, IGetPoolEntity } from '../api';
import { useBalanceStore } from '../store/store';
import { useTabModal } from './useTabModal';

export default () => {
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  const [hasPoolMore, setPoolHasMore] = useState(true);
  const [poolLoading, setPoolLoading] = useState(false);
  const [poolData, setPoolData] = useState<IGetPoolEntity[]>([]);
  const pid = PoolAddress[state.network][state.poolActive[state.network]].pid;

  const { visible, modal, onClose, onShow } = useTabModal({
    width: 834,
    title: 'Pool',
    className: 'PoolModal',
    content: (
      <div className="PoolContent">
        <div className="main">
          {poolData.map((item, index) => (
            <Tooltip
              key={index}
              title={
                <div className="modalPoolTooltip">
                  <div>
                    <span>Name:</span>
                    <span>{item.nftName}</span>
                  </div>
                  <div>
                    <span>Network:</span>
                    <span>
                      <img src={getChainByAppId(item.majorAppChainId)?.icon as any} />
                      {getChainByAppId(item.majorAppChainId)?.name}
                    </span>
                  </div>
                  <div>
                    <span>Contract Address:</span>
                    <span>{getShortenAddress(item.MajorContract)}</span>
                  </div>
                  <div>
                    <span>Rarity level:</span>
                    <span>{item.level}</span>
                  </div>
                  {/* <div>
                      <span>Supported Networks:</span>
                      <span>
                        {
                          item.mapperReponses.map(mapper => (
                            <i key={mapper.mapperAppChainId}>
                              <img src={(getChainByAppId(mapper.mapperAppChainId)?.icon as any)} />
                            </i>
                          ))
                        }
                      </span>
                    </div> */}
                </div>
              }
            >
              <div className="img">
                <img src={convertIpfsUrlIfNeeded(item.nftImageUrl)} alt="" />
              </div>
            </Tooltip>
          ))}
        </div>
        <InfiniteScroll
          loadMore={async () => {
            if (!poolLoading) {
              fetchPool();
            }
          }}
          hasMore={hasPoolMore}
        >
          {hasPoolMore && <div>loading</div>}
        </InfiniteScroll>
      </div>
    ),
  });
  const [poolPageStart, setPoolPageStart] = useState(1);
  const fetchPool = useCallback(async (): Promise<void> => {
    if (!visible || !wallet.account) return;
    setPoolLoading(true);
    const res = await getPool({
      pageSize: 10,
      pageStart: poolPageStart,
      sourceChainId: NAME2ID_MAP[state.network],
      ...(pid ? { pid } : {}),
    });
    // if (!res.list || res.list.length < 10) {
    //   setPoolHasMore(false);
    // }
    setPoolHasMore(false); // once req
    setPoolPageStart(poolPageStart + 1);
    setPoolData([...poolData, ...(res.data.data || [])]);
    setPoolLoading(false);
  }, [poolData, wallet, visible, poolPageStart, state.network, pid]);

  useEffect(() => {
    if (!visible) {
      setPoolData([]);
      setPoolHasMore(true);
      setPoolLoading(false);
    }
  }, [visible]);

  return { visible, modal, onClose, onShow };
};
