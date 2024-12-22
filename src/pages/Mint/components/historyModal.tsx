import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { convertIpfsUrlIfNeeded } from '@src/common/convertIpfsUrlIfNeeded';
import { Address, PoolAddress, ticketImg } from '@src/config';
import useWindowSize from '@src/hooks/useWindowSize';
import InfiniteScroll from 'antd-mobile/es/components/infinite-scroll';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { getHistory, IHistoryEntity } from '../api';
import { useBalanceStore } from '../store/store';
import { useTabModal } from './useTabModal';

export default () => {
  const { isMobile } = useWindowSize();
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  const [hasHistoryMore, setHistoryHasMore] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyData, setHistoryData] = useState<IHistoryEntity[]>([]);
  const [historyPageStart, setHistoryPageStart] = useState(1);
  const nameObj = Object.fromEntries(PoolAddress[state.network].map(item => [item.pid, item.name]));

  const loadData = () => {
    return (
      <>
        {!historyData.length && !historyLoading && !hasHistoryMore ? <div className="noData">No Data</div> : null}
        <InfiniteScroll
          loadMore={async () => {
            if (!historyLoading && fetchHistory) {
              fetchHistory();
            }
          }}
          hasMore={hasHistoryMore}
        >
          {hasHistoryMore && <div className="noData">loading</div>}
        </InfiniteScroll>
      </>
    );
  };

  const { visible, modal, onClose, onShow } = useTabModal({
    width: 700,
    title: 'History',
    className: 'HistoryTabModal',
    content: !isMobile ? (
      <div className="historyTable">
        <div className="header">
          <div className="name">Name</div>
          <div className="time">Time</div>
          <div className="used">Used</div>
          <div className="pool">Pool</div>
        </div>
        <div className="body">
          {historyData.map(item =>
            item.nft
              ? item.nft.map((subItem, subIndex) => (
                  <div className="item" key={`${item.mintHash}_${subIndex}`}>
                    <div className="name">
                      <img src={convertIpfsUrlIfNeeded(subItem.imgUrl)} alt="" />
                      <span>{subItem.nftName}</span>
                    </div>
                    <div className="time">{dayjs(item.commitAt * 1000).format('YYYY/MM/DD HH:mm')}</div>
                    <div className="used">
                      1 Ticket{' '}
                      <img
                        src={
                          item.ticketContract === Address[state.network].PartnerTicketAddress
                            ? ticketImg[state.network].PartnerTicket
                            : ticketImg[state.network].PartnerTicket
                        }
                        alt=""
                      />
                    </div>
                    <div className="pool">{nameObj[item.poolId as any] || PoolAddress[state.network][0].name}</div>
                  </div>
                ))
              : null
          )}
          {loadData()}
        </div>
      </div>
    ) : (
      <div className="historyList">
        <div className="list">
          {historyData.map(item =>
            item.nft
              ? item.nft.map((subItem, subIndex) => (
                  <div className="item" key={`${item.mintHash}_${subIndex}`}>
                    <div className="top">
                      <div>
                        <div className="name">
                          <span>{subItem.nftName}</span>
                        </div>
                        <div className="time">{dayjs(item.commitAt * 1000).format('YYYY/MM/DD HH:mm')}</div>
                      </div>
                      <img src={convertIpfsUrlIfNeeded(subItem.imgUrl)} alt="" />
                    </div>
                    <div className="bottom">
                      <div className="used">
                        <span>Used</span>
                        <div>
                          1 Ticket{' '}
                          <img
                            src={
                              item.ticketContract === Address[state.network].PartnerTicketAddress
                                ? ticketImg[state.network].PartnerTicket
                                : ticketImg[state.network].PartnerTicket
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="pool">
                        <span>Pool</span>
                        <div>{nameObj[item.poolId as any] || PoolAddress[state.network][0].name}</div>
                      </div>
                    </div>
                  </div>
                ))
              : null
          )}
        </div>
        {loadData()}
      </div>
    ),
  });

  const fetchHistory = useCallback(async (): Promise<void> => {
    if (!visible || !wallet.account) return;
    setHistoryLoading(true);
    const res = await getHistory({
      pageSize: 10,
      pageStart: historyPageStart,
      userAddress: wallet.account,
      sourceChainId: NAME2ID_MAP[state.network],
    });
    const data = res.data.data || [];
    if (!data || data.length < 10) {
      setHistoryHasMore(false);
    }
    setHistoryPageStart(historyPageStart + 1);
    setHistoryData([...historyData, ...data]);
    setHistoryLoading(false);
  }, [historyData, wallet, visible, historyPageStart, state.network]);

  useEffect(() => {
    if (!visible) {
      setHistoryPageStart(1);
      setHistoryData([]);
      setHistoryLoading(false);
      setHistoryHasMore(true);
    }
  }, [visible]);

  return { visible, modal, onClose, onShow };
};
