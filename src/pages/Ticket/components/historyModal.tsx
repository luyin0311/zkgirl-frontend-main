import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { Address, ticketImg } from '@src/config';
import useWindowSize from '@src/hooks/useWindowSize';
import InfiniteScroll from 'antd-mobile/es/components/infinite-scroll';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { useTabModal } from '../../Mint/components/useTabModal';
import { useBalanceStore } from '../../Mint/store/store';
import { getHistory, IHistoryEntity } from '../api';

export default () => {
  const { isMobile } = useWindowSize();
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState<IHistoryEntity[]>([]);
  const {
    visible,
    modal,
    onShow: on,
  } = useTabModal({
    title: 'History',
    // css: isMobile ? { alignItems: 'flex-end' } : undefined,
    content: (
      <div className="historyTable">
        <div className="header">
          <div className="time">Time</div>
          <div className="claimed">Claimed</div>
        </div>
        <div className="body">
          {historyData.map(item => (
            <div className="item" key={item.id}>
              <div className="time">{dayjs(item.created_at).format('YYYY/MM/DD HH:mm')}</div>
              <div className="claimed">
                {item.amount} Ticket{' '}
                <img
                  src={
                    item.tokenContract === Address[state.network].PartnerTicketAddress
                      ? ticketImg[state.network].PartnerTicket
                      : ticketImg[state.network].PartnerTicket
                  }
                  alt=""
                />
              </div>
            </div>
          ))}
          {!historyData.length && !loading ? <div className="noData">No Data</div> : null}
          <InfiniteScroll
            loadMore={async () => {
              if (!loading) {
                fetchHistory();
              }
            }}
            hasMore={hasMore}
          >
            {hasMore && <div>loading</div>}
          </InfiniteScroll>
        </div>
      </div>
    ),
  });
  const [pageStart, setPageStart] = useState(1);
  const fetchHistory = useCallback(async (): Promise<void> => {
    if (!visible || !wallet.account) return;
    setLoading(true);
    const res = await getHistory({
      pageSize: 10,
      pageStart,
      userAddress: wallet.account,
      sourceChainId: NAME2ID_MAP[state.network],
    });
    const data = res.data.data;
    if (!data || data.length < 10) {
      setHasMore(false);
    }
    setPageStart(pageStart + 1);
    setHistoryData([...historyData, ...(data || [])]);
    setLoading(false);
  }, [historyData, wallet, visible, pageStart, state.network]);

  useEffect(() => {
    if (!visible) {
      setPageStart(1);
      setHistoryData([]);
      setLoading(false);
      setHasMore(true);
    }
  }, [visible]);

  return [modal, on] as const;
};
