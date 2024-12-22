import { vw } from '@src/common/rw';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

export interface IMobileMenuBtnProps extends CSSProps {
  src: string;
}

const MobileMenuBtn = React.forwardRef<HTMLImageElement, IMobileMenuBtnProps>((props, ref) => {
  const { src, css, ...restProps } = props;
  return (
    //@ts-ignore
    <img src={src} style={{ width: vw(28), ...css }} {...restProps} ref={ref} />
  );
});

MobileMenuBtn.displayName = 'MobileMenuBtn';

export default MobileMenuBtn;
