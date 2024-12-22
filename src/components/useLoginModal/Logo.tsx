import LogoImg from '@src/image/logo-single.svg';
import { Image, Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { Col } from '@unstyled-ui/layout';
import React from 'react';

export type LogoTextProps = { text: string } & CSSProps;
const LogoText: React.FC<LogoTextProps> = props => {
  const { text, ...restProps } = props;

  return (
    <Col css={{ gap: 32, fx: 'center' }} {...restProps}>
      <Image src={LogoImg} css={{ w: 60 }} />
      <Text css={{ typo: { fontSize: 32, fontWeight: 500, lineHeight: 1 } }}>{text}</Text>
    </Col>
  );
};

export default LogoText;
