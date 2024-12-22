import { useGlobalContext } from '@src/context/GlobalContext';
import { Image, Space } from '@unstyled-ui/atomic';
import { abs, absXYCenter } from '@unstyled-ui/css';
import { Col } from '@unstyled-ui/layout';
import React from 'react';

import ConnectWallet from './ConnectWallet/ConnectWallet';
import StartImg from './star-legend.png';
import StartH5Img from './start-legend-h5.png';

const NotLogined: React.FC = props => {
  const { ...restProps } = props;
  const { isMobile } = useGlobalContext();
  const imgSrc = isMobile ? StartH5Img : StartImg;

  const styleObj = isMobile ? abs({ top: 294, left: 0, right: 0 }) : absXYCenter();

  return (
    <Col
      css={{
        ...styleObj,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11,
      }}
      {...restProps}
    >
      <Image src={imgSrc} css={{ w: isMobile ? 230 : 727 }} />
      <Space size={isMobile ? 48 : 72} />
      <ConnectWallet css={{ alignSelf: 'center' }} />
    </Col>
  );
};

export default NotLogined;
