import 'swiper/css';

import { isTokenValid } from '@src/common/isTokenValid';
import { sysMenus } from '@src/constants/sysmenu';
import { useGlobalContext } from '@src/context/GlobalContext';
import { useFetchUserInfo } from '@src/hooks/useFetchUserInfo';
import { CSSProps } from '@unstyled-ui/core';
import { bgImg } from '@unstyled-ui/css';
import { Col } from '@unstyled-ui/layout';
import throttle from 'lodash/throttle';
import React, { useEffect, useRef, useState } from 'react';

import { useHasGotUserInfo, useIsLogined, useMount } from '../../hooks/useIsLogined';
import NavBar from '../Navbar';
import UnLoginImage from './img/unlogin-bg.png';

type IPageProps = {
  sysNtfy?: React.ReactNode;
  navBar?: React.ReactNode;
  content?: React.ReactNode;
  showFooter?: boolean;
  tabbar?: React.ReactNode;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  logo?: React.ReactNode;
} & CSSProps;
const Page: React.FC<IPageProps> = props => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(mainRef.current ? mainRef.current.scrollTop : 0);
  useEffect(() => {
    const mainCurrent = mainRef.current;
    if (!mainCurrent) return;
    const handleScroll = (): void => {
      setScrollTop(mainCurrent.scrollTop);
    };
    const throttledHandleScroll = throttle(handleScroll, 10);
    mainCurrent.addEventListener('scroll', throttledHandleScroll);
    return () => {
      mainCurrent.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [mainRef]);

  const {
    navBar = <NavBar logo={props.logo} extra={props.extra} menus={sysMenus} scrollTop={scrollTop} />,
    content,
    showNavBar = true,
    children,
    sysNtfy,
    css = {},
    ...restProps
  } = props;

  const got = useHasGotUserInfo();

  const fetch = useFetchUserInfo();
  useMount(() => {
    !got && isTokenValid() && fetch();
  });
  const isLogined = useIsLogined();
  const { isMobile } = useGlobalContext();

  return (
    <Col
      ref={mainRef}
      as="div"
      id="lt-layout"
      css={{
        color: 'white',
        position: 'relative',
        h: '100%',
        fx: 'center',
        overflow: 'auto',
        ...(isLogined ? { background: 'black' } : bgImg(UnLoginImage)),
        ...css,
        ...(isLogined
          ? {}
          : {
              _after: {
                display: 'none',
              },
            }),
      }}
      {...restProps}
    >
      {/* {
        isMobile && !isLogined ? (
          <div className='unLoginSwiper'>
            <Swiper
              loop
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              spaceBetween={10}
            >
              <SwiperSlide>
                <img src={H1Image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={H2Image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={H3Image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={H4Image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={H5Image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={H6Image} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        ) : null
      } */}

      {/* <div className="top"> */}
      {sysNtfy}
      {showNavBar ? navBar : null}
      {/* </div> */}

      {/* main */}
      {children || content}

      {/* {showFooter && <Footer />} */}
    </Col>
  );
};
export default Page;
