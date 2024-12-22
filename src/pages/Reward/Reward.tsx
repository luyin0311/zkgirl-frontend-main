import './index.less';

import { useWallet } from '@c3/crypto';
import { handleProvider } from '@src/common/provider';
import Icon from '@src/components/Icon';
import { createMulticallContract } from '@src/pages/Mint/api/createContract';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

import { getStat, getStatByAddress, IStat } from './api';
import useRulesModal from './components/rulesModal';

const erc721ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const erc721Iface = new ethers.utils.Interface(erc721ABI);

const Page: React.FC = () => {
  const { modal: modalRules, onShow: showRules } = useRulesModal();
  const wallet = useWallet();

  const fetchMultiBalance = useCallback(async () => {
    const { account, provider } = wallet;
    if (!account || !provider) return;
    try {
      const walletChainId = await wallet.getChainId();
      const _opBNBProvider = await handleProvider(walletChainId, 'opbnb_mainnet', provider);
      if (_opBNBProvider) {
        const opBNBContract = await createMulticallContract(_opBNBProvider, '0x657Afed1243ef03c77532b13f44463350613Fe46');
        const data = await opBNBContract[0].multicall(
          import.meta.env.REACT_APP_ZKGRIRLS.split(',') // Legendary, Epic, Epic, Rare, Rare, Rare, Uncommon, Uncommon, Uncommon, Uncommon
            .map(target => ({
              target,
              callData: erc721Iface.encodeFunctionData('balanceOf', [account]),
            }))
        );
        setUserBalanceOfs([
          { level: 'Legendary', amount: new BigNumber(data[0]).toNumber() },
          { level: 'Epic', amount: new BigNumber(data[1]).plus(data[2]).toNumber() },
          { level: 'Rare', amount: new BigNumber(data[3]).plus(data[4]).plus(data[5]).toNumber() },
          { level: 'Uncommon', amount: new BigNumber(data[6]).plus(data[7]).plus(data[8]).plus(data[9]).toNumber() },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [wallet]);

  const [userBalanceOfs, setUserBalanceOfs] = useState<IStat[]>([
    { level: 'Legendary', amount: 0 },
    { level: 'Epic', amount: 0 },
    { level: 'Rare', amount: 0 },
    { level: 'Uncommon', amount: 0 },
  ]);
  const fetchStatUser = useCallback(async () => {
    if (wallet.account) {
      const res = await getStatByAddress(wallet.account);
      if (res.data.data) {
        if (res.data.data.status) {
          setUserBalanceOfs(res.data.data.stat);
        } else {
          fetchMultiBalance();
        }
      }
    }
  }, [wallet.account, fetchMultiBalance]);
  useEffect(() => {
    fetchStatUser();
  }, [wallet, fetchStatUser]);

  const [list, setList] = useState<IStat[]>([]);
  const fetchStat = async () => {
    const res = await getStat();
    setList(res.data.data.stat);
  };
  useEffect(() => {
    fetchStat();
  }, []);

  return (
    <div className="page-reward">
      <div className="header">
        <div className="box">
          <div className="title">My Estimated Total Reward</div>
          <div className="number">
            {new BigNumber(
              list.reduce((sum, item, index) => {
                return new BigNumber(sum)
                  .plus(item.amount ? new BigNumber(25000).multipliedBy(new BigNumber(userBalanceOfs[index].amount).dividedBy(item.amount)) : '0.00')
                  .toNumber();
              }, 0)
            )
              .decimalPlaces(2, BigNumber.ROUND_DOWN)
              .toString()}{' '}
            USDT
          </div>
          <div className="time">
            <div>
              <div className="tit">July 11, 2024 00:00(UTC)</div>
              <div className="txt">Snapshot Time</div>
            </div>
            <div>
              <div className="tit">July 11, 2024—July 18, 2024</div>
              <div className="txt">AirDrop Time</div>
            </div>
          </div>
          <div className="rules" onClick={showRules}>
            <Icon name="Warning" />
            <div>Rules</div>
          </div>
          {modalRules}
        </div>
      </div>
      <div className="list">
        {list.map((item, index) => (
          <div className="item" key={index}>
            <div>
              <div className="title">My Estimated Reward</div>
              <div className="number">
                {item.amount
                  ? new BigNumber(25000)
                      .multipliedBy(new BigNumber(userBalanceOfs[index].amount).dividedBy(item.amount))
                      .decimalPlaces(2, BigNumber.ROUND_DOWN)
                      .toString()
                  : '0.00'}{' '}
                USDT
              </div>
              <div className="info">
                <div className="top">
                  <div>
                    <div className="tit">Single Reward</div>
                    <div className="num">
                      {item.amount ? new BigNumber(25000).dividedBy(item.amount).decimalPlaces(2, BigNumber.ROUND_DOWN).toString() : '0.00'} USDT
                    </div>
                  </div>
                  <div>
                    <div className="tit">My {item.level} zkGirl</div>
                    <div className="num">{Math.floor(userBalanceOfs[index].amount)}</div>
                  </div>
                </div>
                <div className="bottom">
                  <div>{item.level} Pool : 25000.00 USDT</div>
                  <div>
                    Total {item.level} zkGirl : {item.amount}
                  </div>
                </div>
              </div>
            </div>
            <img src={`/reward/${index}.png`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
