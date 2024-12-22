import UnloginedImage from '@src/components/Layout/img/unlogin-bg.png';
import Page from '@src/components/Layout/Page';
import BackBtn from '@src/components/NavBtn/BackBtn';
import NotLogined from '@src/components/NotLogined';
import { urlPath } from '@src/constants/urlPath';
import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import { bgImg } from '@unstyled-ui/css';
import React from 'react';
import { useNavigate } from 'react-router';

import ChainBtn from '../Mint/components/chainBtn';
import polygonBg from '../Mint/img/polygonBg.png';
import { useBalanceStore } from '../Mint/store/store';
import { default as PageHome } from './Home';
import mainBg from './img/bg.png';

const Home: React.FC = () => {
  const nav = useNavigate();
  const isLogined = useIsLogined();
  const { isMobile } = useWindowSize();
  const { state } = useBalanceStore(s => s);

  return (
    <Page
      showNavBar={isMobile}
      css={{
        ...bgImg(mainBg),
        nav: {
          background: 'transparent',
        },
      }}
    >
      <PageHome />
    </Page>
  );
};

export default Home;
