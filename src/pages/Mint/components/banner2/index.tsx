import 'swiper/css';
import './index.less';

import Icon from '@src/components/Icon';
import useWindowSize from '@src/hooks/useWindowSize';
import classnames from 'classnames';
import React, { useRef, useState } from 'react';
import type { Swiper as ISwiper } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export type IProps = {
  className?: string;
  isShowClose?: boolean;
};

const Comp: React.FC<IProps> = props => {
  const { isMobile } = useWindowSize();
  const [close, setClose] = useState(false);
  const swiperRef = useRef<ISwiper>();
  const [active, setActive] = useState<number>(0);

  return !close ? (
    <div className={classnames('mintBanner2', props.className)}>
      <Swiper
        className="box"
        onSwiper={(swiper: any) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(e: any) => {
          setActive(e.realIndex);
        }}
        loop
        modules={[Autoplay]}
        // effect="fade"
        // fadeEffect={{
        //     crossFade: true,
        // }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
      >
        <SwiperSlide className="okx">
          <div>
            {props.isShowClose && isMobile ? <Icon name="Close_XL" onClick={() => setClose(true)} /> : null}
            Join OKX Web3 Wallet Cryptopedia Season 11 to claim <em>$500,000 ZKB</em> token rewards!
          </div>
        </SwiperSlide>
        {/* <SwiperSlide className='okx'>
                    <div>
                        {props.isShowClose && isMobile ? <Icon name="Close_XL" onClick={() => setClose(true)} /> : null}
                        Join OKX Web3 Wallet Cryptopedia Season 11 to claim <em>$500,000 ZKB</em> token rewards!
                    </div>
                </SwiperSlide>
                <SwiperSlide className='okx'>
                    <div>
                        {props.isShowClose && isMobile ? <Icon name="Close_XL" onClick={() => setClose(true)} /> : null}
                        Join OKX Web3 Wallet Cryptopedia Season 11 to claim <em>$500,000 ZKB</em> token rewards!
                    </div>
                </SwiperSlide> */}
      </Swiper>
      <div className="dot">
        {swiperRef.current?.slides?.map((item: any, index: any) => (
          <div className={classnames('item', { cur: index === active })} key={index} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Comp;
