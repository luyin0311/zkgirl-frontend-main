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

import mainBg from './img/bg.png';
import mainBgH5 from './img/bgH5.png';
import { default as Reward } from './Reward';

const Home: React.FC = () => {
  const nav = useNavigate();
  const isLogined = useIsLogined();
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (!isLogined) {
      nav(urlPath.home);
    }
  }, [isLogined, nav]);

  return (
    <Page
      logo={!isLogined ? null : <BackBtn onClick={() => nav(urlPath.home)} style={{ marginLeft: isMobile ? 20 : 32 }} />}
      css={{
        ...bgImg(isLogined ? (isMobile ? mainBgH5 : mainBg) : UnloginedImage),
        nav: {
          background: 'transparent',
        },
      }}
    >
      {isLogined ? <Reward /> : <NotLogined />}
    </Page>
  );
};

export default Home;
