// import UserNameId from './UserNameId';
import { vw } from '@src/common/rw';
import { CSSProps } from '@unstyled-ui/core';
import { Col } from '@unstyled-ui/layout';
import React from 'react';

import MenuList from './MenuList';
// import { useMyAccount } from '@src/hooks/useIsLogined';
// import useWindowSize from '@src/hooks/useWindowSize';
// import WalletBar from '../../../WalletBar';
// import { styled } from '@unstyled-ui/core';
export type DropdownOverlayProps = CSSProps;

// const DividerLine = styled('div', {
//   height: 1,
//   w: '100%',
//   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   marginTop: 16,
// });

const DropdownOverlay: React.FC<DropdownOverlayProps> = props => {
  const { css, ...restProps } = props;
  // const user = useMyAccount();
  // const { isMobile } = useWindowSize();

  return (
    <Col
      css={{
        w: vw(254, 220),
        pt: vw(16, 0),
        mt: 20,
        background: '#151716',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        fx: 'flex-start',
        '& *': {
          fontFamily: 'Poppins',
        },
        ...css,
      }}
      {...restProps}
    >
      {/* {user && <UserNameId name={user.name || 'Username'} id={user.id} />} */}

      {/* {isMobile ? (
        <>
          <WalletBar />
          <DividerLine />
        </>
      ) : (
        <></>
      )} */}
      <MenuList />
    </Col>
  );
};

export default DropdownOverlay;
