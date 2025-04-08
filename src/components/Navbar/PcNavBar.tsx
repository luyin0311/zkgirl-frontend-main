import { SysMenu } from '@src/constants/sysmenu';
import { urlPath } from '@src/constants/urlPath';
import { useIsLogined } from '@src/hooks/useIsLogined';
import BalanceBox from '@src/pages/Mint/components/balanceBox';
import { useGlobalStore } from '@src/store/globalStore';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React from 'react';
import { useNavigate } from 'react-router';

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
  const isLogined = useIsLogined();
  const nav = useNavigate();
  const { action } = useGlobalStore(s => s);
  const login = debounce(() => {
    action.update({ showLoginModal: true });
  }, 200);
  return (
    <div className={classNames(css.root, { [css.fixed]: fixed })}>
      {myLogo}
      {sysMenus.length ? <PcSysMenus sysMenu={sysMenus} /> : null}
      <div className={classNames(css.pc)}>
        <div className={classNames(css.ticket)}  onClick={() => (isLogined ? nav(urlPath.ticket) : login())}>
          Claim Tickrt
        </div>
        <div  className={classNames(css.resonators)}  onClick={() => (isLogined ? nav(urlPath.mint) : login())}>
          Summon Shovel
        </div>
        <div  className={classNames(css.resonators)}  onClick={() => (isLogined ? nav(urlPath.reward) : login())}>
          Synthesize
        </div>
        {/* <div className="active" style={{ marginLeft: w(42) }} onClick={() => (isLogined ? nav(urlPath.reward) : login())}>
          <img src={btn3} alt="" style={{ width: w(414) }} />
        </div> */}
      </div>
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
