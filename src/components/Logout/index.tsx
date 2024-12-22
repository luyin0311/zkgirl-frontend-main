import { Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React, { useCallback } from 'react';

import { useLogout } from '../../hooks/useIsLogined';

export type LogoutBtnProps = CSSProps;

const LogoutBtn: React.FC<LogoutBtnProps> = props => {
  const { onClick, css, ...restProps } = props;
  const logout = useLogout();
  const onClickLogout = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      logout();
      onClick && onClick(e);
    },
    [logout, onClick]
  );
  return (
    <Text onClick={onClickLogout} css={{ cursor: 'pointer', ...css }} {...restProps}>
      Log out
    </Text>
  );
};
export default LogoutBtn;
