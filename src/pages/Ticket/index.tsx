import UnloginedImage from '@src/components/Layout/img/unlogin-bg.png';
import Page from '@src/components/Layout/Page';
import BackBtn from '@src/components/NavBtn/BackBtn';
import NotLogined from '@src/components/NotLogined';
import { urlPath } from '@src/constants/urlPath';
import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import { bgImg } from '@unstyled-ui/css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useBalanceStore } from '../Mint/store/store';
import mainBg from './img/bg.png';
import { default as Ticket } from './Ticket';

const Home: React.FC = () => {
  const nav = useNavigate();
  const isLogined = useIsLogined();
  const { isMobile } = useWindowSize();
  const { state } = useBalanceStore(s => s);

  useEffect(() => {
    if (!isLogined) {
      nav(urlPath.home);
    }
  }, [isLogined, nav]);

  return (
    <Page
      // extra={isLogined ? <ChainBtn /> : null}
      logo={!isLogined ? null : <BackBtn onClick={() => nav(urlPath.home)} style={{ marginLeft: isMobile ? 20 : 32 }} />}
      css={{
        ...bgImg(isLogined ? mainBg : UnloginedImage),
        nav: {
          background: 'transparent',
        },
      }}
    >
      {isLogined ? <Ticket /> : <NotLogined />}
    </Page>
  );
};

export default Home;
