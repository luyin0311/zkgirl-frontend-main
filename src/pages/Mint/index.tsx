import Page from '@src/components/Layout/Page';
import BackBtn from '@src/components/NavBtn/BackBtn';
import NotLogined from '@src/components/NotLogined';
import { urlPath } from '@src/constants/urlPath';
import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import { bgImg } from '@unstyled-ui/css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import mainBg from './img/bg.png';
import { default as Mint } from './Mint';
import { useBalanceStore } from './store/store';

const Home: React.FC = () => {
  const nav = useNavigate();
  const isLogined = useIsLogined();
  const { state } = useBalanceStore(s => s);
  const { isMobile } = useWindowSize();

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
        // ...(isLogined ? bgImg(state.network === 'matic' ? polygonBg  : mainBg) : {}),
        ...(isLogined ? bgImg(mainBg) : {}),
        nav: {
          background: 'transparent',
        },
      }}
      showNavBar={isMobile ? state.showNavBar : true}
      // onClick={()=>showProcessing()}
    >
      {isLogined ? <Mint /> : <NotLogined />}
      {/* {modalProcessing} */}
    </Page>
  );
};

export default Home;
