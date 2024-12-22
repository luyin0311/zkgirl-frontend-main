import { useIsLogined } from '@src/hooks/useIsLogined';
import useWindowSize from '@src/hooks/useWindowSize';
import { CSSProps } from '@unstyled-ui/core';
import { Row } from '@unstyled-ui/layout';
import React from 'react';

import ConnectAccountButton from './ConnectAccountBtn';
import UserButtonDropDown from './UserButtonDropDown';

export type AccountProps = CSSProps;
const Account: React.FC<AccountProps> = props => {
  const { css, ...restProps } = props;
  const isLogined = useIsLogined();
  const { isMobile } = useWindowSize();

  return (
    <Row css={{ mr: isMobile ? 20 : 32, ...css, position: 'relative', zIndex: 1 }} {...restProps}>
      {isLogined ? <UserButtonDropDown /> : <ConnectAccountButton />}
    </Row>
  );
};

export default Account;
