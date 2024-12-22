import { useWallet } from '@c3/crypto';
// import { should_close_menu_event } from '@src/constants/consts';
// import { useGlobalStore } from '@src/store/globalStore';
import { walletMap } from '@src/constants/wallet';
import useWindowSize from '@src/hooks/useWindowSize';
import avatar from '@src/image/user.png';
import { Image } from '@unstyled-ui/atomic';
import { Dropdown } from 'antd';
import React from 'react';

// overlay里是子菜单
import DropdownOverlay from './DropdownOverlay';
import css from './index.module.less';

const UserButtonDropDown: React.FC = props => {
  const { isMobile } = useWindowSize();
  const { ...restProps } = props;
  const wallet = useWallet();
  const ellipsedAddress = wallet.account ? `${wallet.account.slice(0, 4)}...${wallet.account.slice(-4)}` : '';
  // const showMenu = useGlobalStore(state => state.state.showMenu);
  // const action = useGlobalStore(store => store.action);

  // const handleClick = () => {
  //   action.update({ showMenu: !showMenu });
  // };
  return (
    <>
      {isMobile ? (
        <Dropdown
          //@ts-ignore
          trigger="click"
          placement="bottomRight"
          overlay={<DropdownOverlay />}
          // visible={showMenu}
        >
          <Image
            src={avatar}
            css={{ w: isMobile ? 32 : 48, cursor: 'pointer' }}
            // onClick={handleClick}
          />
        </Dropdown>
      ) : (
        <Dropdown
          //@ts-ignore
          trigger="hover"
          placement="bottomRight"
          overlay={<DropdownOverlay />}
        >
          <div className={css.root}>
            <div className={css.address}>{ellipsedAddress}</div>
            <div className={css.avatar}>
              <div className={css.icon}>
                <Image src={walletMap[wallet.name || 'metamask']?.icon} css={{ w: 16 }} />
              </div>
              <Image src={avatar} css={{ w: 64, cursor: 'pointer' }} />
            </div>
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default UserButtonDropDown;
