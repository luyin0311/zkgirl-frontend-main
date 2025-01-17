import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { convertIpfsUrlIfNeeded } from '@src/common/convertIpfsUrlIfNeeded';
import {shovelData} from '@src/common/shovel';
import { getShortenAddress } from '@src/common/tool';
import { Address,PoolAddress} from '@src/config';
import { getChainByAppId } from '@src/constants/baseChainDataById';
import { Tooltip } from 'antd';
import InfiniteScroll from 'antd-mobile/es/components/infinite-scroll';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { getPool, IGetPoolEntity } from '../api';
import { cardContract } from '../api/cardContract';
import { useBalanceStore } from '../store/store';
import { useTabModal } from './useTabModal';

interface Shovel {
  name: string;
  number: number;
  img: string;
}

export default () => {
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  const [hasPoolMore, setPoolHasMore] = useState(true);
  const [poolLoading, setPoolLoading] = useState(false);
  const [poolData, setPoolData] = useState<Shovel[]>([]);
  const { visible, modal, onClose, onShow } = useTabModal({
    width: 834,
    title: 'Pool',
    className: 'PoolModal',
    content: (
      <div className="PoolContent">
        <div className="main">
          {poolData.map((item, index) => (
            <div key={index} className="poolItem">
              <div>{item.name}</div>
              <img src={item.img} alt="" />
              <div>{item.number}</div>
            </div>
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
    const contract =  (
      await cardContract(wallet.provider, Address[state.network].cardAddress)
    )[1];
    const balanceOf1 = await contract.balanceOf(wallet.account,0);// 获取用户的铲子
    const balanceOf2 = await contract.balanceOf(wallet.account,1);// 获取用户的铲子
    const balanceOf3 = await contract.balanceOf(wallet.account,2);// 获取用户的铲子
    const balanceOf4 = await contract.balanceOf(wallet.account,3);// 获取用户的铲子
    const balanceOf5 = await contract.balanceOf(wallet.account,4);// 获取用户的铲子


    setPoolHasMore(false);
    setPoolData([
      {
        name: '铁铲',
        number: ethers.BigNumber.from(balanceOf1._hex).toNumber(),
        img: '/src/image/shovel01.png',
      },
      {
        name: '铜铲',
        number: ethers.BigNumber.from(balanceOf2._hex).toNumber(),
        img: '/src/image/shovel02.png',
      },
      {
        name: '银铲',
        number: ethers.BigNumber.from(balanceOf3._hex).toNumber(),
        img: '/src/image/shovel03.png',
      },
      {
        name: '金铲',
         number: ethers.BigNumber.from(balanceOf4._hex).toNumber(),
        img: '/src/image/shovel04.png',
      },
      {
        name: '钻石铲',
         number: ethers.BigNumber.from(balanceOf5._hex).toNumber(),
        img: '/src/image/shovel05.png',
      },
    ]);
    setPoolLoading(false);
  }, [poolData, wallet, visible, state.network]);

  useEffect(() => {
    if (!visible) {
      setPoolData([]);
      setPoolHasMore(true);
      setPoolLoading(false);
    }
  }, [visible]);

  return { visible, modal, onClose, onShow };
};
