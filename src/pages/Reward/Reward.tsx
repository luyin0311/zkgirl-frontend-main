import './index.less';

import { useWallet } from '@c3/crypto';
import { handleProvider } from '@src/common/provider';
import Icon from '@src/components/Icon';
import LoadingIcon from '@src/components/Loading/LoadingIcon';
import { useLoadingModal } from '@src/components/Loading/LoadingModal';
import { Address,PoolAddress} from '@src/config';
import shovel01 from '@src/image/shovel1.png';
import shovel02 from '@src/image/shovel2.png';
import shovel03 from '@src/image/shovel3.png';
import shovel04 from '@src/image/shovel4.png';
import shovel05 from '@src/image/shovel05.png';
import { createMulticallContract } from '@src/pages/Mint/api/createContract';
import { Button, Modal,notification, Space } from 'antd';
import BigNumber from 'bignumber.js';
import classnames from 'classnames';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useRef,useState } from 'react';

import { cardContract } from '../Mint/api/cardContract';
import { expchainContract } from '../Mint/api/expchainContract';
import { useBalanceStore } from '../Mint/store/store';
import { getStat, getStatByAddress, IStat } from './api';
import useRulesModal from './components/rulesModal';
interface Shovel {
  name: string;
  number: number;
  img: string;
}

const Page: React.FC = () => {
  const { modal: modalRules, onShow: showRules } = useRulesModal();
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  const [poolData, setPoolData] = useState<Shovel[]>([]);

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [btnStatus, setBtnStatus] = useState(false);
  const contract = useRef({});
  const synthesisCard = useRef(1);
  const [btnLoading, setBtnLoading] = useState(false);

  const [modalProcessing, showProcessing, hideProcessing] = useLoadingModal({
    title: 'Processing',
    description: 'Please confirm this transaction in your wallet.',
  });

  const fetchStatUser = useCallback(async () => {
    if (wallet.account) {
      const contract =  (
        await cardContract(wallet.provider, Address[state.network].cardAddress)
      )[1];
      const balanceOf1 = await contract.balanceOf(wallet.account,0);// 获取用户的铲子
      const balanceOf2 = await contract.balanceOf(wallet.account,1);// 获取用户的铲子
      const balanceOf3 = await contract.balanceOf(wallet.account,2);// 获取用户的铲子
      const balanceOf4 = await contract.balanceOf(wallet.account,3);// 获取用户的铲子
      const balanceOf5 = await contract.balanceOf(wallet.account,4);// 获取用户的铲子

      setPoolData([
        {
          name: '铁铲',
          number: ethers.BigNumber.from(balanceOf1._hex).toNumber(),
          img: shovel01,
        },
        {
          name: '铜铲',
          number: ethers.BigNumber.from(balanceOf2._hex).toNumber(),
          img: shovel02,
        },
        {
          name: '银铲',
          number: ethers.BigNumber.from(balanceOf3._hex).toNumber(),
          img: shovel03,
        },
        {
          name: '金铲',
           number: ethers.BigNumber.from(balanceOf4._hex).toNumber(),
          img: shovel04,
        },
        {
          name: '钻石铲',
           number: ethers.BigNumber.from(balanceOf5._hex).toNumber(),
          img: shovel05,
        },
      ]);
    }
  }, [wallet.account]);
  useEffect(() => {
    fetchStatUser();
  }, [wallet, fetchStatUser]);


  useEffect(() => {
    const handleCardSynthesized = async (user,oldCardType, newCardType) => {
      console.log('CardSynthesized', user,oldCardType, newCardType);
      synthesisCard.current = ethers.BigNumber.from(newCardType._hex).toNumber(),
      setIsModalOpen(true);
    };
    const handleSynthesisFailed = async (user,cardType) => {
      console.log('SynthesisFailed', user,cardType);
      openNotificationWithIcon();
    };
    const initEventListeners = async () => {
      if (wallet.provider && wallet.account) {
        contract.current = (
          await expchainContract(wallet.provider, Address[state.network].Address)
        )[1];

        // 注册事件监听器
        contract.current.on('CardSynthesized', handleCardSynthesized);
        contract.current.on('SynthesisFailed', handleSynthesisFailed);
      }
    };

    initEventListeners();

    // // 组件卸载时取消监听
    return () => {
      if (contract.current) {
        contract.current.off('CardSynthesized', handleCardSynthesized);
        contract.current.off('SynthesisFailed', handleSynthesisFailed);
      }
    };
  }, [wallet.provider, wallet.account, state.network]);


  // 处理点击事件，选中某一项
  const handleSelectItem = (index: number,item: Shovel) => {
    setSelectedItem(index);
    if(item.number > 1){
      setBtnStatus(true);
    }else{
      setBtnStatus(false);

    }
  };
  const synthesis = async () => {
    if(!btnStatus){
      return;
    }
    setBtnLoading(true);
    showProcessing();
    try {
      const synthesisCost = await contract.current.synthesisCost();// 获取单次抽卡费用
      console.log('合成费用:', synthesisCost.toString());
      // 调用 synthesize 函数，传递 cardType 和 ETH 金额
      const tx = await contract.current.synthesize(selectedItem, {
        value: synthesisCost,
        gasLimit: 300000, // 设置一个更高的 Gas Limit
      });

      // 等待交易完成
      const receipt =  await tx.wait();

      console.log('交易已确认');
      setBtnLoading(false);
      hideProcessing();
      fetchStatUser(); // 更新用户卡牌数量
    } catch (error) {
      console.error('合成失败:', error);
      setBtnLoading(false);
      hideProcessing();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const openNotificationWithIcon = () => {
    notification.error({
      message: 'Synthesis failed',

    });
  };
  return (
    <div className="page-reward">
      <div className="tab">
        {/* <div className={classnames(`item item${state.poolActive[state.network]}`)} onClick={showPool}>
          <Icon name="Pool" />
          <div>Pool</div>
        </div> */}
        {/* <div className={classnames('item')} onClick={showHistory}>
          <Icon name="Clock" />
          <div>History</div>
        </div> */}
        <div className={classnames(`item item${state.poolActive[state.network]}`)} onClick={showRules}>
          <Icon name="Warning" />
          <div>Rules</div>
        </div>
        {modalRules}
      </div>
      <div className="header">
        <div className="box">
            {poolData.map((item, index) => (
              <div key={index}  className={`poolItem ${selectedItem === index ? 'selected' : ''}`}
                onClick={() => handleSelectItem(index,item)}>
                {/* <div>{item.name}</div> */}
                <img src={item.img} alt="" />
                <div className='number'>x{item.number}</div>
              </div>
            ))}
        </div>
        <div className='btn-box'>
          {btnLoading ? (
           <div className='btn'>
            <LoadingIcon css={{ borderTopColor: '#ddd', marginRight: 10 }} />
            <span>Loading</span>
          </div>
            ) : (<div onClick={() => synthesis()} className={`btn ${btnStatus ? '' : 'disabled'}`}><div>Synthesize</div></div>)
          }
        </div>
      </div>
      {modalProcessing}
      <Modal maskClosable={false} centered title="Synthesis successful" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} className='sucModal'>
        <div className='sucModal-content'>
          <p>Congratulations on obtaining{poolData[synthesisCard.current]?poolData[synthesisCard.current].name:''}</p>
          <img src={poolData[synthesisCard.current]?poolData[synthesisCard.current].img:''} alt="" />
        </div>
      </Modal>
    </div>
  );
};

export default Page;
