import { vw } from '@src/common/rw';
import { CSSProps, keyframes } from '@unstyled-ui/core';
import { Box } from '@unstyled-ui/layout';
import React from 'react';
const spin = keyframes({
  to: {
    transform: 'rotate(360deg)',
  },
});
export type LoadingIconProps = CSSProps;
const LoadingIcon: React.FC<LoadingIconProps> = props => {
  const { css = {}, ...restProps } = props;
  return (
    <Box
      css={{
        border: `${vw(2)} solid rgba(0,0,0,0.3)`,
        borderTopColor: 'black',
        borderRadius: '50%',
        width: vw(16, 20),
        height: vw(16, 20),
        animation: `${spin} 1s linear infinite`,
        ...css,
      }}
      {...restProps}
    ></Box>
  );
};

export default LoadingIcon;
