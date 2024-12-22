import './index.less';

import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { convertIpfsUrlIfNeeded } from '@src/common/convertIpfsUrlIfNeeded';
import sleep from '@src/common/sleep';
import { createERC1155Contracts } from '@src/components/ERC1155/createContract';
import LoadingIcon from '@src/components/Loading/LoadingIcon';
import { useLoadingModal } from '@src/components/Loading/LoadingModal';
import Media from '@src/components/Media';
import { LevelGIF, LevelMP4, PoolAddress, ticket, ticket10NftIcon, ticketImg } from '@src/config';
import { urlPath } from '@src/constants/urlPath';
import { useSwitchNetwork } from '@src/hooks/useSwitchNetwork';
import useWindowSize from '@src/hooks/useWindowSize';
import { useGlobalStore } from '@src/store/globalStore';
import classnames from 'classnames';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { getHistory, INFTEntity } from './api';
import { createLegendFactoryContract } from './api/createContract';
import CountDown from './components/CountDown';
import useNotEnoughTicketsModal from './components/notEnoughTicketsModal';
import Tab from './components/tab';
import usePoolInfo from './hooks/usePoolInfo';
import ActiveBtnSvg from './img/activeBtn.svg';
import CrossCloud from './img/CrossCloud.mp4';
import { useBalanceStore } from './store/store';

type IMintType = 'Once' | 'Ten';

const NewHome: React.FC = () => {
  const { action: globalAction } = useGlobalStore(s => s);
  const { action, state } = useBalanceStore(s => s);
  const { isMobile, width, height } = useWindowSize();
  const nav = useNavigate();
  const wallet = useWallet();

  // mint
  const { poolInfo, networkError } = usePoolInfo();

  const fetchBalance = useCallback(async () => {
    action.update({
      opbnb_mainnet: {
        ...state.opbnb_mainnet,
      },
      // matic: {
      //   ...state.matic,
      // },
      refresh: true,
    });
  }, [state, action]);

  const [freeMintStatus, setFreeMintStatus] = useState<string>();
  useEffect(() => {
    if (!state.refresh) {
      // if (Object.values(state[state.network]).reduce((sum, i) => sum + i, 0) - state[state.network].Ticket10) {
      if (Object.values(state[state.network]).reduce((sum, i) => sum + i, 0)) {
        // if (state[state.network].Ticket) {
        //   setFreeMintStatus('Ticket');
        // }
        // Object.keys(state[state.network])
        //   .filter(key => !['Ticket', 'Ticket10', 'FreeTicket'].includes(key))
        //   .forEach(item => {
        //     if (state[state.network][item]) {
        //       setFreeMintStatus(item);
        //     }
        //   });
        if (state[state.network].PartnerTicket) {
          setFreeMintStatus('PartnerTicket');
        }
      } else {
        setFreeMintStatus(undefined);
      }
    }
  }, [state, state.refresh]);

  const [mintStatus, setMintStatus] = useState<'Approving' | 'Minting'>();
  const [nftInfo, setNftInfo] = useState<INFTEntity>();
  const [nftInfoList, setNftInfoList] = useState<INFTEntity[]>();
  const [mintType, setMintType] = useState<IMintType>();

  const {
    modal: modalNotEnoughTickets,
    onShow: showModalNotEnoughTickets,
    onClose: hideModalNotEnoughTickets,
  } = useNotEnoughTicketsModal(freeMintStatus, mintType);
  const [modalProcessing, showProcessing, hideProcessing] = useLoadingModal({
    title: mintStatus || 'Processing',
    description: 'Please confirm this transaction in your wallet.',
  });

  const switchChain = useSwitchNetwork();
  const [mintLoading, setMintLoading] = useState(false);
  const handleGetHistory = async (orderId: number, pid: null | number, type?: IMintType) => {
    if (!wallet.account) return;
    const res = await getHistory({
      pageSize: 10,
      pageStart: 1,
      userAddress: wallet.account,
      orderId,
      sourceChainId: NAME2ID_MAP[state.network],
      ...(pid ? { pid } : {}),
    });
    const data = res.data.data;
    if (data && data[0] && data[0].nft) {
      hideProcessing();
      if (type === 'Once') {
        setNftInfo(data[0].nft[0]);
      } else {
        setNftInfoList(data[0].nft);
      }
    } else {
      await sleep(1);
      await handleGetHistory(orderId, pid, type);
    }
  };
  const mint = async (mType?: IMintType, type?: string) => {
    if (!wallet.provider || !wallet.account || mintLoading) return;
    setMintLoading(true);
    const chainId = await wallet.getChainId();
    if (chainId !== NAME2ID_MAP[state.network]) {
      await switchChain(state.network);
      setMintLoading(false);
      return;
    }
    setMintType(mType);
    await fetchBalance();
    if (!type) {
      showModalNotEnoughTickets();
      setMintLoading(false);
      return;
    }
    const walletBalanceRes = await wallet.provider.getBalance(wallet.account);
    if (!(+ethers.utils.formatEther(walletBalanceRes) > 0)) {
      globalAction.update({
        message: { type: 'error', content: 'Insufficient Gas' },
      });
      setMintLoading(false);
      return;
    }
    try {
      hideModalNotEnoughTickets();
      showProcessing();
      const pool = PoolAddress[state.network][state.poolActive[state.network]];
      const ticketInfo = ticket[state.network][type];
      const erc1155Contract = (await createERC1155Contracts(wallet.provider, ticketInfo.address))[1];
      const isApproved = await erc1155Contract.isApprovedForAll(wallet.account, pool.legendFactory);
      if (!isApproved) {
        setMintStatus('Approving');
        const approveRes = await erc1155Contract.setApprovalForAll(pool.legendFactory, true);
        await approveRes.wait();
      }
      setMintStatus('Minting');
      const LegendFactory = (await createLegendFactoryContract(wallet.provider, pool.legendFactory, pool.pid))[1];
      const fee = pool.pid ? await LegendFactory.getFee(pool.pid) : await LegendFactory.fee();
      if (pool.pid) {
        const supportSingleToken = await LegendFactory.getSupportSingleToken(pool.pid);
        const _supportSingleToken = supportSingleToken.filter(
          (item: any) => item.token.toLocaleLowerCase() === ticketInfo.address.toLocaleLowerCase() && item.tokenId.toNumber() === ticketInfo.tokenId
        );
        if (!_supportSingleToken.length) {
          setMintStatus(undefined);
          setMintType(undefined);
          setMintLoading(false);
          hideProcessing();
          return;
        }
      }
      if (mType === 'Once') {
        const encode = ethers.utils.defaultAbiCoder.encode(['address', 'uint256'], [wallet.account, new Date().getTime()]);
        const seedHash = ethers.utils.keccak256(encode);
        const commonArgs = [ticketInfo.address, ticketInfo.tokenId, 1, [seedHash], { value: fee }];
        const commitArgs = pool.pid ? [pool.pid, ...commonArgs] : [...commonArgs];
        const commitRes = await LegendFactory.commit(...commitArgs);
        const commitRec = await commitRes.wait();
        const events = commitRec.events.filter((item: any) => item.event === 'Commit')[0];
        if (events) {
          const orderId = events.args.orderId.toNumber();
          setMintStatus(undefined);
          await handleGetHistory(orderId, pool.pid, mType);
        } else {
          globalAction.update({
            message: { type: 'error', content: 'Internal JSON-RPC error' },
          });
        }
      } else {
        const seedByteArr = [];
        for (let i = 0; i < 10; i++) {
          const text = ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'uint256'], [wallet.account, i, new Date().getTime()]);
          const seedByte = ethers.utils.keccak256(text);
          seedByteArr.push(seedByte);
        }
        const commonArgs = [ticketInfo.address, ticketInfo.tokenId, seedByteArr.length, seedByteArr, { value: fee.mul(seedByteArr.length) }];
        const commitArgs = pool.pid ? [pool.pid, ...commonArgs] : [...commonArgs];
        const commitRes = await LegendFactory.commit(...commitArgs);
        const commitRec = await commitRes.wait();
        const events = commitRec.events.filter((item: any) => item.event === 'Commit')[0];
        if (events) {
          const orderId = events.args.orderId.toNumber();
          setMintStatus(undefined);
          await handleGetHistory(orderId, pool.pid, mType);
        } else {
          globalAction.update({
            message: { type: 'error', content: 'Internal JSON-RPC error' },
          });
        }
      }
      await fetchBalance();
      setIsStartAnimation(true);
      setMintLoading(false);
    } catch (error) {
      hideProcessing();
      setMintStatus(undefined);
      setMintType(undefined);
      setMintLoading(false);
      if (error) {
        let msg = (error as any).message;
        if (msg.toLowerCase().includes('user rejected')) {
          msg = 'User rejected transaction';
          globalAction.update({ message: { type: 'error', content: msg } });
          return;
        }
        globalAction.update({ message: { type: 'error', content: msg } });
        console.error(error);
      }
    }
  };

  // animation
  const [isStartAnimation, setIsStartAnimation] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const handleStartAnimation = async () => {
      if (isStartAnimation) {
        setStep(1); // mask enter
        await sleep(10);
        setStep(2); // mask exit
        await sleep(1);
        setIsStartAnimation(false);
        setStep(3);
        action.update({ showNavBar: false });
        if (mintType === 'Once') {
          await sleep(0.25);
          setStep(4);
          await sleep(1);
          setStep(5);
        } else {
          // setNftInfo(
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'Halo',
          //     level: 'Uncommon'
          //   },
          // );
          // setNftInfoList([
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'Halo',
          //     level: 'Uncommon'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'Nekomata',
          //     level: 'Rare'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'string',
          //     level: 'Epic'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'string',
          //     level: 'Legendary'
          //   }, {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'Halo',
          //     level: 'Uncommon'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'Nekomata',
          //     level: 'Rare'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'string',
          //     level: 'Epic'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'string',
          //     level: 'Legendary'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'string',
          //     level: 'Epic'
          //   },
          //   {
          //     contract: 'string',
          //     tokenId: 'string',
          //     imgUrl: CardImg,
          //     nftName: 'string',
          //     level: 'Special'
          //   }
          // ]);
          await sleep(0.25);
          setStep(4);
          await sleep(0.4);
          setStep(5);
        }
      }
    };
    handleStartAnimation();
  }, [isStartAnimation, mintType, action]);

  const tenBoxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>();
  useEffect(() => {
    if (tenBoxRef.current) {
      const h = tenBoxRef.current.offsetHeight || 0;
      setScale((h / 900) * (isMobile ? 0.55 : 0.9));
    }
  }, [tenBoxRef.current?.offsetHeight, isMobile, width]);

  useEffect(() => {
    if (nftInfo || nftInfoList) {
      setStep(0);
      setNftInfo(undefined);
      setNftInfoList(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.network]);

  const singleTicketBtn = (cls?: string) => {
    return (
      <div
        className={classnames('item', 'once', cls, {
          disabled: !freeMintStatus || mintLoading,
        })}
        onClick={() => mint('Once', freeMintStatus)}
      >
        <div>
          <i>
            <img src={ticketImg[state.network].PartnerTicket} alt="" />
            <em>x1</em>
          </i>
          <span>{networkError ? 'Switch network' : (mintType !== 'Once' && mintStatus) || 'Summon Once'}</span>
        </div>
      </div>
    );
  };

  const tenTicketBtn = (cls?: string) => {
    return (
      <div
        className={classnames('item', 'ten', cls, {
          disabled: state[state.network].PartnerTicket < 10 || mintLoading,
        })}
        onClick={() => mint('Ten', freeMintStatus)}
      >
        <div>
          <i>
            <img src={ticket[state.network].PartnerTicket.img} alt="" />
            <em>x10</em>
          </i>
          <span>{networkError ? 'Switch network' : (mintType === 'Ten' && mintStatus) || 'Summon 10'}</span>
        </div>
      </div>
    );
  };

  const bottomBox = () => {
    const curPool = poolInfo ? poolInfo[state.poolActive[state.network]] : undefined;
    if (!curPool && !poolInfo)
      return (
        <div className="btnWrap">
          <LoadingIcon />
        </div>
      );

    if (curPool && curPool.startTime && curPool.endTime) {
      if (new Date(curPool.startTime * 1000) > new Date()) {
        return (
          <div className="btnWrap">
            <div className={classnames('item', 'once', 'start')}>
              <div>
                <span>
                  Summon after <CountDown time={curPool.startTime * 1000 - +new Date()} stop={new Date(curPool.startTime * 1000) < new Date()} />
                </span>
              </div>
            </div>
          </div>
        );
      }
      if (new Date() > new Date(curPool.endTime * 1000)) {
        return (
          <div className="btnWrap">
            <div className={classnames('item', 'ten', 'end')}>
              <div>
                <span>Ended</span>
              </div>
            </div>
          </div>
        );
      }
    }
    return isMobile ? (
      <>
        <div className="top">
          {singleTicketBtn('active2')}
          {tenTicketBtn('active')}
        </div>
        <div className={classnames('item', 'once', 'link')} onClick={() => nav(urlPath.reward)}>
          <div>
            <i>
              <img src={ActiveBtnSvg} alt="" />
            </i>
            <span>My Reward</span>
          </div>
        </div>
      </>
    ) : (
      <div className="btnWrap">
        {singleTicketBtn()}
        {tenTicketBtn()}
      </div>
    );
  };

  return (
    <div
      className={classnames('page-mint', {
        end: step >= 5 && nftInfo,
        hiddenNavBar: !state.showNavBar,
      })}
    >
      {!nftInfo && !nftInfoList ? <Tab /> : null}
      {nftInfo && step >= 3 ? (
        <div className={classnames('content', { animation: step >= 3 })}>
          <div className={classnames('topWrap single')}>
            <div className="placeholder" />
            <div className="box">
              <div className="back">
                {isMobile ? (
                  step === 4 ? (
                    <Media type={'image'} src={LevelGIF[nftInfo.level].back} />
                  ) : null
                ) : step >= 5 ? (
                  <Media type={'video'} loop={false} src={LevelMP4[nftInfo.level].back} />
                ) : null}
              </div>
              <div className={classnames('card', { show: step >= 4 })}>
                <img src={convertIpfsUrlIfNeeded(nftInfo.imgUrl)} alt="" />
              </div>
              <div className="front">
                {isMobile ? (
                  step === 4 ? (
                    <Media type={'image'} src={LevelGIF[nftInfo.level].front} />
                  ) : null
                ) : step >= 5 ? (
                  <Media type={'video'} loop={false} src={LevelMP4[nftInfo.level].front} />
                ) : null}
              </div>
              <div className="particle">
                {isMobile ? (
                  step >= 5 ? (
                    <Media type={'image'} src={LevelGIF[nftInfo.level].particle} />
                  ) : null
                ) : step >= 5 ? (
                  <Media type={'video'} loop={false} src={LevelMP4[nftInfo.level].particle} />
                ) : null}
              </div>
            </div>
          </div>
          <div className={classnames('btnWrap', { show: step >= 5 })}>
            {/* <div
              className={classnames('item', 'once')}
              onClick={() => {
                setStep(0);
                nav(urlPath.bridge);
              }}
            >
              <div>
                <span>Activate</span>
              </div>
            </div> */}
            <div
              className={classnames('item', 'again', {
                disabled: !(freeMintStatus && state[state.network][freeMintStatus]),
              })}
              onClick={async () => {
                setStep(0);
                setNftInfo(undefined);
                setNftInfoList(undefined);
                action.update({ showNavBar: true });
                if (!freeMintStatus) return;
                await fetchBalance();
                if (state[state.network][freeMintStatus]) {
                  await mint(mintType, freeMintStatus);
                }
              }}
            >
              <div>
                <span>Mint Again</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {nftInfoList && step >= 3 ? (
        <>
          <div className="contentMask" />
          <div className={classnames('content', { animation: step >= 3 })}>
            <div className="topWrap">
              <div className="placeholder" />
              <div className={classnames('tenBox', { show: step >= 4 })} ref={tenBoxRef}>
                <div className="wrap wrap1" style={{ transform: `translateY(-50%) scale(${scale})` }}>
                  {nftInfoList.map((item, index) => (
                    <div className="tenCard" key={index}>
                      <div className="tenCardVideo">
                        <div className={classnames(`back ${item.level}`)}>
                          <Media type={isMobile ? 'image' : 'video'} src={isMobile ? LevelGIF[item.level].ticket10 : LevelMP4[item.level].ticket10} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="wrap wrap2" style={{ transform: `translateY(-50%) scale(${scale})` }}>
                  {nftInfoList.map((item, index) => (
                    <div className="tenCard" key={index}>
                      <div className="imgBox">
                        <Media src={convertIpfsUrlIfNeeded(item.imgUrl)} type={'image'} className="img" />
                      </div>
                      {ticket10NftIcon[item.nftName] ? (
                        <div className="logo">
                          <img src={ticket10NftIcon[item.nftName]} alt="" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="wrap wrap3" style={{ transform: `translateY(-50%) scale(${scale})` }}>
                  {nftInfoList.map((item, index) => (
                    <div className="tenCard" key={index}>
                      <div className="front">
                        {item.level === 'Legendary' ? (
                          <Media
                            type={isMobile ? 'image' : 'video'}
                            src={isMobile ? LevelGIF['Legendary'].ticket10Front : LevelMP4['Legendary'].ticket10Front}
                          />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={classnames('btnWrap', { show: step >= 5 })}>
              {/* <div
                className={classnames('item', 'once')}
                onClick={() => {
                  setStep(0);
                  nav(urlPath.bridge);
                }}
              >
                <div>
                  <span>Activate</span>
                </div>
              </div> */}
              <div
                className={classnames('item', 'again', {
                  disabled: freeMintStatus && state[state.network][freeMintStatus] < 10,
                })}
                onClick={async () => {
                  setStep(0);
                  setNftInfo(undefined);
                  setNftInfoList(undefined);
                  action.update({ showNavBar: true });
                  if (!freeMintStatus) return;
                  await fetchBalance();
                  if (state[state.network][freeMintStatus]) {
                    await mint(mintType, freeMintStatus);
                  }
                }}
              >
                <div>
                  <span>Mint Again</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {!nftInfo && !nftInfoList ? (
        <div className="content poolBox">
          <div className={classnames('poolWrap')}>
            {PoolAddress[state.network].map((item, index) => (
              <Media src={item.img} type={'image'} className="img" key={`${state.network}_${index}`} />
            ))}
          </div>
          {isMobile ? <div className="btnWrap mobileBtnWrap">{bottomBox()}</div> : bottomBox()}
        </div>
      ) : null}
      {modalProcessing}
      {modalNotEnoughTickets}
      {!nftInfo && !isMobile ? (
        <div className="activeBtn" onClick={() => nav(urlPath.reward)}>
          <div>My Reward</div>
        </div>
      ) : null}
      {isStartAnimation ? (
        <div
          className={classnames('animationMask', {
            enter: step === 1,
            exit: step === 2,
          })}
        >
          <Media type={width <= 500 ? 'image' : 'video'} src={width <= 500 ? '/CrossCloud-mobile.gif' : CrossCloud} />
        </div>
      ) : null}
      {/* <div className='activeBtn' onClick={() => setIsStartAnimation(true)}>Active</div> */}
    </div>
  );
};

export default NewHome;
