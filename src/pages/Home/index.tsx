import Page from '@src/components/Layout/Page';
import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import { bgImg } from '@unstyled-ui/css';
import React from 'react';
import { useNavigate } from 'react-router';

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
      showNavBar={true}
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
