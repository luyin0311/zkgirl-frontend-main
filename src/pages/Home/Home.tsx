import './index.less';

import { useWallet } from '@c3/crypto';
import { urlPath } from '@src/constants/urlPath';
import { walletMap } from '@src/constants/wallet';
import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import avatar from '@src/image/user.png';
import { useGlobalStore } from '@src/store/globalStore';
import debounce from 'lodash/debounce';
import React from 'react';
import { useNavigate } from 'react-router';

import Img1 from './img/1.png';
import Img10 from './img/11.png';
import btn1 from './img/btn/1.png';
import btn2 from './img/btn/2.png';
import btn3 from './img/btn/3.png';
import btn4 from './img/btn/4.png';
import btn5 from './img/btn/5.png';
import btn6 from './img/btn/6.png';

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
        <img className="role" src={isMobile ? Img10 : Img1} alt="" />
      </div>
      <div className="pc" style={{ width: w(349 + 414 + 44), top: w(-250), right: 0 }}>
        <div className="ticket" style={{ marginTop: w(190) }} onClick={() => (isLogined ? nav(urlPath.ticket) : login())}>
          <img src={btn1} alt="" style={{ width: w(349) }} />
        </div>
        <div className="resonators" style={{ marginBottom: w(42), marginLeft: w(42) }} onClick={() => (isLogined ? nav(urlPath.mint) : login())}>
          <img src={btn2} alt="" style={{ width: w(414) }} />
        </div>
        <div className="active" style={{ marginLeft: w(42) }} onClick={() => (isLogined ? nav(urlPath.reward) : login())}>
          <img src={btn3} alt="" style={{ width: w(414) }} />
        </div>
      </div>
      <div className="h5" style={{ width: w(172 + 142 + 20), bottom: w(-340) }}>
        <div>
          <div className="resonators" onClick={() => (isLogined ? nav(urlPath.mint) : login())}>
            <img src={btn4} alt="" style={{ width: w(172) }} />
          </div>
          <div className="active" style={{ marginTop: w(20) }} onClick={() => (isLogined ? nav(urlPath.reward) : login())}>
            <img src={btn6} alt="" style={{ width: w(172) }} />
          </div>
        </div>
        <div className="ticket" onClick={() => (isLogined ? nav(urlPath.ticket) : login())}>
          <img src={btn5} alt="" style={{ width: w(142), marginTop: w(190) }} />
        </div>
      </div>
      {isLogined ? (
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
      )}
    </div>
  );
};

export default Page;
