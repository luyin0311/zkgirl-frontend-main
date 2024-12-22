import { useOnUserSwitch } from '@src/hooks/useOnUserSwitch';
import { useSwitch2Opbnb } from '@src/hooks/useSwitch2Opbnb';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

import PcNavBar from './PcNavBar';

export type NavBarProps = CSSProps & {
  logo?: React.ReactNode;
  extra?: React.ReactNode;
  scrollTop: number;
};
const NavBar: React.FC<NavBarProps> = props => {
  const { logo, extra, hiddenUser, scrollTop } = props;
  const switch2Opbnb = useSwitch2Opbnb();
  useOnUserSwitch(() => {
    switch2Opbnb();
  });

  return <PcNavBar hiddenUser={hiddenUser} sysMenus={[]} logo={logo} extra={extra} fixed={scrollTop !== 0} />;
};
export default NavBar;
