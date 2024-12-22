import { vw } from '@src/common/rw';
import Logo from '@src/image/logo-single.svg';
import { Image, Text } from '@unstyled-ui/atomic';
import { Row } from '@unstyled-ui/layout';
import React from 'react';

const textStyle = {
  typo: {
    fontSize: vw(120, 240),
    fontWeight: 500,
    lineHeight: 1.1,
  },
};
const Logo404: React.FC = props => {
  const { ...restProps } = props;
  return (
    <Row css={{ gap: vw(16, 24) }} {...restProps}>
      <Text css={{ ...textStyle }}>4</Text>
      <Image src={Logo} css={{ w: vw(80, 120) }} />
      <Text css={{ ...textStyle }}>4</Text>
    </Row>
  );
};

export default Logo404;
