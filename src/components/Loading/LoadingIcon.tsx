import { drRw750 } from '@src/common/rw';
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
        border: '2px solid rgba(0,0,0,0.3)',
        borderTopColor: '#0CFFF0',
        borderRadius: '50%',
        width: 20,
        height: 20,
        animation: `${spin} 1s linear infinite`,
        ...css,
      }}
      {...restProps}
    ></Box>
  );
};

export default LoadingIcon;
