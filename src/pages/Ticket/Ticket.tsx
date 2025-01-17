import 'react-horizontal-scrolling-menu/dist/styles.css';
import './index.less';

import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { expchainData } from '@src/common/expchainData';
import Icon from '@src/components/Icon';
import LoadingIcon from '@src/components/Loading/LoadingIcon';
import { useLoadingModal } from '@src/components/Loading/LoadingModal';
import { Address, ticket, ticketImg } from '@src/config';
import { getChainByChainId } from '@src/constants/baseChainDataById';
import { useSwitchNetwork } from '@src/hooks/useSwitchNetwork';
import useWindowSize from '@src/hooks/useWindowSize';
import { useTabModal } from '@src/pages/Mint/components/useTabModal';
import { useGlobalStore } from '@src/store/globalStore';
import classNames from 'classnames';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useCallback, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router';

import { createPartnerTicketFactoryContract } from '../Mint/api/createContract';
import { expchainContract } from '../Mint/api/expchainContract';
import { useBalanceStore } from '../Mint/store/store';
import { getPartnerSign } from './api';
import useHistoryModal from './components/historyModal';

dayjs.extend(utc);

interface IPartnerTicketInfo {
  PartnerTicketIsClaimed: boolean;
  PartnerTicketExpireTime: number;
  PartnerTicketJwtExpireTime: number;
  PartnerTicketTokenId: number;
  PartnerTicketAmount: number;
  PartnerTicketSignature: string;
  PartnerTicketEpoch: number;
}

const Page: React.FC = () => {
  const { action: globalAction } = useGlobalStore(s => s);
  const { isMobile } = useWindowSize();
  const nav = useNavigate();
  const { action, state } = useBalanceStore(s => s);
  const fetchBalance = useCallback(async () => {
    action.update({
      opbnb_mainnet: {
        ...state.opbnb_mainnet,
      },
      refresh: true,
    });
  }, [state, action]);

  const [modalProcessing, showProcessing, hideProcessing] = useLoadingModal({
    title: 'Processing',
    description: 'Please confirm this transaction in your wallet.',
  });
  const [modalHistory, showHistory] = useHistoryModal();

  const wallet = useWallet();
  const [PartnerTicketInfo, setPartnerTicketInfo] = useState<{
    [k: string]: IPartnerTicketInfo;
  }>();
  const [NetworkError, setNetworkError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const contract = useRef({});
  const isSameDayUTC = (timestamp1:any, timestamp2:any) =>{
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth();
    const day1 = date1.getUTCDate();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDate();

    return year1 === year2 && month1 === month2 && day1 === day2;
};
  const getInfo = useCallback(
    async () => {
      if (!wallet.provider || !wallet.account) return;
      try {
        const chainId = await wallet.getChainId();
        if (chainId !== expchainData.chainId) {
          setNetworkError(true);
          return;
        }
        setNetworkError(false);
        const lastClaimDay  = await contract.current.lastClaimDay(wallet.account);
        setIsSigned(isSameDayUTC(parseInt(lastClaimDay._hex, 16)*86400*1000,new Date().getTime()));

      } catch (error) {
        console.log(error);
      }
    },
    [wallet, state.network]
  );

  useEffect(() => {
    getInfo();
  }, [getInfo, state.network]);

  useEffect(() => {
    const handleFreeDrawsAdded = async (user, amount, event) => {
      console.log('用户:', user);
      console.log('添加的免费抽卡次数:', amount.toString());
      console.log('事件详情:', event);
      setLoading(false);
    };

    const initEventListeners = async () => {
      if (wallet.provider && wallet.account) {
        contract.current = (
          await expchainContract(wallet.provider, Address[state.network].Address)
        )[1];

        // 注册事件监听器
        contract.current.on('FreeDrawsAdded', handleFreeDrawsAdded);
      }
    };

    initEventListeners();

    // 组件卸载时取消监听
    return () => {
      if (contract.current) {
        contract.current.off('FreeDrawsAdded', handleFreeDrawsAdded);
      }
    };
  }, [wallet.provider, wallet.account, state.network]);

  const [mintType, setMintType] = useState<'Ticket' | 'FreeTicket' | 'PartnerTicket' | 'PartnerTicketRealTime'>('Ticket');
  const [PartnerTicketKey, setPartnerTicketKey] = useState<string>();
  const {
    modal: modalClaim,
    onShow: showModalClaim,
    onClose: hideModalClaim,
  } = useTabModal({
    className: 'modalClaim',
    content: (
      <>
        <div className="title">Congratulations!</div>
        <div className="img">
          <img src={ticketImg[state.network].PartnerTicket} alt="" />
          {mintType === 'PartnerTicket' && PartnerTicketInfo && PartnerTicketKey ? (
            <span>
              <em>{PartnerTicketInfo[PartnerTicketKey].PartnerTicketAmount}</em>
            </span>
          ) : null}
        </div>
        <div
          className="btn active"
          onClick={async () => {
            hideModalClaim();
            setPartnerTicketInfo(undefined);
            getInfo();
          }}
        >
          <div>
            <span>Done</span>
          </div>
        </div>
      </>
    ),
  });

  const switchChain = useSwitchNetwork();
  const switchNetwork = useCallback(async () => {
    if (NetworkError) {
      try {
        console.log('switchChain', state.network);
        await switchChain(state.network);
        setNetworkError(false);
        return;
      } catch (error) {
        if (error instanceof Error) {
          let msg = error.message;
          if (msg.toLowerCase().includes('user rejected')) {
            msg = 'User rejected transaction';
          }
          globalAction.update({ message: { type: 'error', content: msg } });
        }
        console.error(error);
      }
    }
  }, [NetworkError, switchChain, state, globalAction]);

  const mintPartnerTicket = useCallback(
    async (key: string) => {
      if (!wallet.provider || !PartnerTicketInfo || !PartnerTicketInfo[key]) return;
      try {
        showProcessing();
        const contract = (await createPartnerTicketFactoryContract(wallet.provider, Address[state.network].PartnerTicketFactoryAddress))[1];
        const res = await contract.mint(
          wallet.account,
          PartnerTicketInfo[key].PartnerTicketTokenId,
          PartnerTicketInfo[key].PartnerTicketAmount,
          PartnerTicketInfo[key].PartnerTicketEpoch,
          PartnerTicketInfo[key].PartnerTicketExpireTime,
          PartnerTicketInfo[key].PartnerTicketSignature
        );
        await res.wait();
        await getInfo('PartnerTicket');
        await fetchBalance();
        setPartnerTicketKey(key);
        hideProcessing();
        setMintType('PartnerTicket');
        showModalClaim();
      } catch (error) {
        hideProcessing();
        if (error instanceof Error) {
          let msg = error.message;
          if (msg.toLowerCase().includes('user rejected')) {
            msg = 'User rejected transaction';
          }
          globalAction.update({ message: { type: 'error', content: msg } });
        }
        console.error(error);
      }
    },
    [wallet, getInfo, PartnerTicketInfo, showProcessing, hideProcessing, showModalClaim, fetchBalance, state.network, globalAction]
  );


  const dailyAttendance = useCallback(async () => {
    // const { account, provider } = wallet;
    // const PartnerTicketFactoryContract = (
    //   await expchainContract(provider, Address[state.network].Address)
    // )[1];
    setLoading(true);
    try{
      const claimDailyFreeDraws  = await contract.current.claimDailyFreeDraws();
      console.log('交易已发送，等待确认...');
      await claimDailyFreeDraws.wait(); // 等待交易确认
      console.log('交易已确认');
      setLoading(false);
      getInfo();//更新信息
    }catch (error) {
      console.error('捕获到错误');
      setLoading(false);
    }
  }, []);
  const mintPartnerTicketBtn = (key: string) => {
    // return (
    //   <div className="btn" onClick={() => dailyAttendance()}>
    //     <div>
    //       <span>签到</span>
    //     </div>
    //   </div>
    // );
    if (NetworkError) {
      return (
        <div className="btn" onClick={() => switchNetwork()}>
          <div>
            <span>Switch network</span>
          </div>
        </div>
      );
    }
    if (loading) {
      return (
        <div className="btn disabled">
          <div>
            <LoadingIcon css={{ borderTopColor: '#ddd', marginRight: 10 }} />
            <span>Loading</span>
          </div>
        </div>
      );
    }
    if(isSigned){
      return (
        <div className="btn disabled">
          <div>
            <span>已签到</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="btn" onClick={() => dailyAttendance()}>
          <div>
            <span>签到</span>
          </div>
        </div>
      );
    }
    // if (!PartnerTicketInfo[key].PartnerTicketSignature) {
    //   return (
    //     <div className="btn disabled">
    //       <div>
    //         <span>Not Eligible</span>
    //       </div>
    //     </div>
    //   );
    // }
    // if (new Date() > new Date(PartnerTicketInfo[key].PartnerTicketJwtExpireTime * 1000)) {
    //   return (
    //     <div className="btn disabled">
    //       <div>
    //         <span>Ended</span>
    //       </div>
    //     </div>
    //   );
    // }
    // if (PartnerTicketInfo[key].PartnerTicketIsClaimed) {
    //   return (
    //     <div className="btn inactive">
    //       <div>
    //         <span>Claimed</span>
    //       </div>
    //     </div>
    //   );
    // }
    // if (PartnerTicketInfo[key].PartnerTicketSignature) {
    //   return (
    //     <div className="btn" onClick={() => mintPartnerTicket(key)}>
    //       <div>
    //         <span>Claim +{PartnerTicketInfo[key].PartnerTicketAmount}</span>
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div className="btn disabled">
        <div>
          <span>Not Eligible</span>
        </div>
      </div>
    );
  };
console.log('ticket', state.network);
  const ticketData = Object.values(ticket[state.network])
    .filter((_, index) => Object.keys(ticket[state.network])[index] !== 'Ticket10')
    .filter(item => item.show);
  console.log(ticketData);
  const [curTicket, setCurTicket] = useState<{
    show: boolean;
    name: string;
    type: string;
    address: string;
    tokenId: number;
    img: string;
    title: string;
    rules: React.ReactNode;
  }>(ticketData[0]);

  return (
    <div className="page-ticket">
      <div className="tab">
        <div className="item" onClick={showHistory}>
          <Icon name="Clock" />
          <div>History</div>
        </div>
        {modalHistory}
      </div>
      <div className="tickets">
        {ticketData.map((item, index) => {
          return (
            <div key={index} className={classNames({ cur: item.name === curTicket.name })} onClick={() => setCurTicket(item)}>
              <img src={item.img} alt="" />
            </div>
          );
        })}
      </div>
      <div className="content">
        <div className="card">
          <div className="img">
            <img src={curTicket.img} alt="" />
          </div>
          <div className="info">
            <div className="title">{curTicket.title}</div>
            <div className="text">{curTicket.rules}</div>
            { mintPartnerTicketBtn(curTicket.name)}
            {/* {curTicket.address === Address[state.network].Address &&
              mintPartnerTicketBtn(curTicket.name)} */}
          </div>
        </div>
      </div>
      {modalProcessing}
      {modalClaim}
    </div>
  );
};

export default Page;
