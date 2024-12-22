import React from 'react';

import { useBalanceStore } from '../../Mint/store/store';
import ElementImg from '../img/element.png';
import OKXImg from '../img/okx.png';
import OpenSeaImg from '../img/OpenSea.png';
import zkBridgeImg from '../img/zkBridge.png';

const Home: React.FC = () => {
  const { state } = useBalanceStore(s => s);

  return state.network === 'opbnb_mainnet' ? (
    <div className="linkWrap">
      <div className="linkItem">
        <div className="title">Get your Pandra King from open market</div>
        <div className="link">
          <a href="https://element.market/collections/legendary-pandra-king" target={'__blank'}>
            <img src={ElementImg} alt="" />
            <span>Element</span>
          </a>
          <a href="https://www.okx.com/cn/web3/marketplace/nft/collection/bsc/legendary-pandra-king" target={'__blank'}>
            <img src={OKXImg} alt="" />
            <span>OKX Marketplace</span>
          </a>
        </div>
      </div>
      <div className="linkItem">
        <div className="title">Purchase Star Legend Ticket</div>
        <div className="link">
          <a href="https://element.market/assets/opbnb/0x8be663ecd492b956fa0d7c054d77a97695b7ec48/0" target={'__blank'}>
            <img src={ElementImg} alt="" />
            <span>Element</span>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div className="linkWrap">
      <div className="linkItem">
        <div className="title">Receive more tickets based on Pandra Kings.</div>
        <div className="link">
          <a href="https://zkbridge.com/zknft" target={'__blank'}>
            <img src={zkBridgeImg} alt="" />
            <span>zkBridge</span>
          </a>
        </div>
      </div>
      <div className="linkItem">
        <div className="title">Get your Pandra King from open market</div>
        <div className="link">
          <a href="https://www.okx.com/cn/web3/marketplace/nft/collection/polygon/legendary-pandra-king-2" target={'__blank'}>
            <img src={OKXImg} alt="" />
            <span>OKX Marketplace</span>
          </a>
          <a href="https://opensea.io/collection/legendary-pandra-king-2" target={'__blank'}>
            <img src={OpenSeaImg} alt="" />
            <span>OpenSea</span>
          </a>
        </div>
      </div>
      <div className="linkItem">
        <div className="title">Purchase Star Legend Ticket</div>
        <div className="link">
          <a href="https://opensea.io/collection/unidentified-contract-740d9899-7fd4-46e3-a2f9-1283" target={'__blank'}>
            <img src={OpenSeaImg} alt="" />
            <span>OpenSea</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
