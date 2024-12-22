import { SysMenu } from '@src/constants/sysmenu';
import BalanceBox from '@src/pages/Mint/components/balanceBox';
import classNames from 'classnames';
import React from 'react';

import Account from './Account';
import css from './index.module.less';
import Logo from './Logo';
import PcSysMenus from './SysMenus/PcSysMenu';
import WalletBar from './WalletBar';

export type PcNavBarProps = {
  sysMenus: SysMenu[];
  logo?: React.ReactNode;
  extra?: React.ReactNode;
  hiddenUser?: boolean;
  fixed: boolean;
};
const PcNavBar: React.FC<PcNavBarProps> = props => {
  const { sysMenus, logo, extra, hiddenUser, fixed } = props;
  const myLogo = logo || <Logo />;
  return (
    <div className={classNames(css.root, { [css.fixed]: fixed })}>
      {myLogo}
      {sysMenus.length ? <PcSysMenus sysMenu={sysMenus} /> : null}
      {extra}
      {!hiddenUser ? (
        <div className={css.user}>
          <div className={css.bar}>
            <WalletBar />
            <BalanceBox />
          </div>
          <Account />
        </div>
      ) : null}
    </div>
  );
};
export default PcNavBar;
