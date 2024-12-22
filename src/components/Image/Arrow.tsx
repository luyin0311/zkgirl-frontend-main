import { vw } from '@src/common/rw';
import ArrowImageHover from '@src/image/arrow-green.svg';
import ArrowImageLight from '@src/image/arrow-light.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

export type ArrowProps = CSSProps & { hovered: boolean };
const Arrow: React.FC<ArrowProps> = props => {
  const { hovered, css = {}, ...restProps } = props;
  // const { hovered, ...hoverProps } = useHover();
  return <Image src={hovered ? ArrowImageHover : ArrowImageLight} css={{ w: vw(16), ...css }} {...restProps}></Image>;
};

export default Arrow;
