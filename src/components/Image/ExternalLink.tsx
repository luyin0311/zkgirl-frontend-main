import ArrowImage from '@src/image/arrow-external-link.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

export type GoToExternalLinkImgProps = CSSProps;
const GoToExternalLinkImg: React.FC<GoToExternalLinkImgProps> = props => {
  const { css, ...restProps } = props;
  return <Image src={ArrowImage} css={css} {...restProps}></Image>;
};

export default GoToExternalLinkImg;
