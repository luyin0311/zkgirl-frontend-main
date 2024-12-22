import { useHover } from '@c3/react';
import { vw } from '@src/common/rw';
import { useShowLoginModal } from '@src/hooks/useShowLoginModal';
import { Button } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { Box } from '@unstyled-ui/layout';
import React, { useEffect } from 'react';

const ConnectWallet: React.FC<CSSProps> = props => {
  const { css = {}, ...restProps } = props;
  const showLogin = useShowLoginModal();

  return (
    <Box
      polygonBtn
      onClick={showLogin}
      className="polygonBtn"
      css={{
        w: 238,
        h: 64,
        fontSize: 20,
        fontWeight: 600,
        _hover: {
          color: 'black',
        },
        backgroundSize: 'contain',
        ...css,
      }}
      {...restProps}
    >
      <div>Connect Wallet</div>
    </Box>
  );
};

export default ConnectWallet;
