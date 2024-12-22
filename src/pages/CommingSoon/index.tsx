import Page from '@src/components/Layout/Page';
import useWindowSize from '@src/hooks/useWindowSize';
import { bgImg } from '@unstyled-ui/css';
import React from 'react';

import mainBg from './img/bg.png';
import H5Img from './img/h5.png';
import roleImg from './img/role.png';
import txtImg from './img/txt.png';

const Home: React.FC = () => {
  const { isMobile } = useWindowSize();

  return (
    <Page
      showNavBar={false}
      css={{
        ...bgImg(isMobile ? H5Img : mainBg),
        nav: {
          background: 'transparent',
        },
        position: 'relative',
      }}
    >
      {!isMobile && (
        <>
          <img
            src={txtImg}
            alt=""
            style={{
              position: 'absolute',
              left: 50,
              top: '50%',
              transform: 'translate(0, -50%)',
              zIndex: 1,
              height: 400,
            }}
          />
          <img src={roleImg} alt="" style={{ position: 'absolute', bottom: 0, right: 50 }} />
        </>
      )}
    </Page>
  );
};

export default Home;
