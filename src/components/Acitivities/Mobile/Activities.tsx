// 活动页
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../index.less';

import Icon from '@src/components/Icon';
import { Box } from '@unstyled-ui/layout';
import React, { useEffect, useState } from 'react';
import { EffectFade, Pagination } from 'swiper/modules';
// import Swiper core and required modules
// import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ActivityItem } from '../shared/ActiveItem';
import { IActiveItemType } from '../type';

// SwiperCore.use([Autoplay]);

export type MobileActivitiesProps = {
  list: IActiveItemType[];
};
const MobileActivities: React.FC<MobileActivitiesProps> = props => {
  const { list } = props;
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    setVisible(true);
  }, [list]);

  const close = () => {
    setVisible(false);
  };
  if (!visible) {
    return null;
  }
  return (
    <Box className="mobile-activities">
      <Box
        className="wrap-container"
        css={{
          width: 347,
          borderRadius: 12,
        }}
      >
        <Icon name="Close_XL" onClick={close} />
        <Swiper
          modules={[Pagination, EffectFade]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop
          pagination
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          width={347}
          setWrapperSize
        >
          {list.map((item, i) => (
            <SwiperSlide key={i}>
              <ActivityItem activity={item}></ActivityItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MobileActivities;
