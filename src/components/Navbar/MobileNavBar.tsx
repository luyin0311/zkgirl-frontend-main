import { vw } from '@src/common/rw';
import { SysMenu } from '@src/constants/sysmenu';
import { useIsLogined } from '@src/hooks/useIsLogined';
import { Space } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { Box, Row } from '@unstyled-ui/layout';
import React from 'react';

import Account from './Account';
import Logo from './Logo';
import MobileSysMenu from './SysMenus/MobileMenu';

export type MobileNavBarProps = CSSProps & {
  onVisibleChange?: (open: boolean) => void;
  systemMenus: SysMenu[];
  logo?: React.ReactNode;
};

const MobileNavBar: React.FC<MobileNavBarProps> = props => {
  const { onVisibleChange, systemMenus, logo, css, ...restProps } = props;
  const isLogined = useIsLogined();
  const myLogo = logo || <Logo width={vw(149)} />;

  return (
    <Row
      as="nav"
      css={{
        ...css,
      }}
      {...restProps}
    >
      <Space size={vw(18)} />
      <MobileSysMenu onVisibleChange={onVisibleChange} initialData={systemMenus} />
      <Space size={vw(12)} />
      {myLogo}
      <Box css={{ ml: 'auto' }}>
        {isLogined ? null : <Account />}
        <Space size={vw(20)} />
      </Box>
    </Row>
  );
};
export default MobileNavBar;
