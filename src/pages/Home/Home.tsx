import './index.less';

import { useWallet } from '@c3/crypto';
import { urlPath } from '@src/constants/urlPath';
import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import { useGlobalStore } from '@src/store/globalStore';
import debounce from 'lodash/debounce';
import React from 'react';
import { useNavigate } from 'react-router';

import btn1 from './img/btn/1.png';
import btn2 from './img/btn/2.png';

const Page: React.FC = () => {
  const { isMobile, width, height } = useWindowSize();
  const nav = useNavigate();
  const { action } = useGlobalStore(s => s);
  const isLogined = useIsLogined();
  const wallet = useWallet();
  const ellipsedAddress = wallet.account ? `${wallet.account.slice(0, 4)}...${wallet.account.slice(-4)}` : '';
  const w = (n: number) => {
    return (n / (isMobile ? 375 : 1920)) * width;
  };

  // const h = (n: number) => {
  //     return (n / 675) * height;
  // };
  const login = debounce(() => {
    action.update({ showLoginModal: true });
  }, 200);

  return (
    <div className="page-home">
      <div className="wrap">
      <p className='introduction'>Embark on the Shovelverse,uncovermythical legends!<br/>

Combining 'Shovel' and 'Universe,' it conveys a sense of vast possibilities and acontinuously evolving ecosystem.</p>
      </div>
      {/* <div className="pc">
        <div className="ticket"  onClick={() => (isLogined ? nav(urlPath.ticket) : login())}>
          Claim Tickrt
        </div>
        <div className="resonators"  onClick={() => (isLogined ? nav(urlPath.mint) : login())}>
          Summon zkGirls
        </div>
      </div> */}
      {/* <div className="h5" style={{ width: w(172 + 142 + 20), bottom: w(-340) }}>

      </div> */}
      {/* {isLogined ? (
        <div className="user" style={{ width: w(226), height: w(226), bottom: w(80), right: w(80) }}>
          <div className="box">
            <div className="img" style={{ width: w(56), height: w(56) }}>
              <div className="icon" style={{ width: w(24), height: w(24) }}>
                <img style={{ width: w(16), height: w(16) }} src={walletMap[wallet.name || 'metamask']?.icon} />
              </div>
              <img className="avatar" src={avatar} />
            </div>
            <span style={{ fontSize: w(24) }} className="address">
              {ellipsedAddress}
            </span>
          </div>
        </div>
      ) : (
        <div
          className="btn"
          style={{
            width: w(226),
            height: w(226),
            bottom: w(80),
            right: w(80),
            fontSize: w(24),
          }}
          onClick={() => login()}
        >
          <span>Connect Wallet</span>
        </div>
      )} */}
    </div>
  );
};

export default Page;
