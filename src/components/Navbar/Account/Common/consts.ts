import { Plateform } from '@c3/types';
import { urlPath } from '@src/constants/urlPath';
import CategoryIcon from '@src/image/Category.svg';
import LogoutIcon from '@src/image/Logout.svg';
import { BaseListItemType } from '@unstyled-ui/layout';

export type IMenuItem = BaseListItemType & {
  iconUrl: string;
  device: Plateform;
  title: string;
  to: string;
  isSelected: boolean;
  blank?: boolean;
};

export const logoutConfig: IMenuItem[] = [
  // {
  //   id: 'MyResonators',
  //   title: 'My Resonators',
  //   to: urlPath.bridge,
  //   device: 'both',
  //   iconUrl: MyResonatorsIcon,
  //   isSelected: false,
  // },
  // {
  //   id: 'history',
  //   title: 'Active History',
  //   to: urlPath.bridgeHistory,
  //   device: 'both',
  //   iconUrl: ClockIcon,
  //   isSelected: false,
  // },
  {
    id: 'my',
    title: 'My NFTs',
    to: urlPath.reward,
    device: 'both',
    iconUrl: CategoryIcon,
    isSelected: false,
    // blank: true,
  },
  {
    id: 'logout',
    title: 'Log out',
    to: urlPath.home,
    device: 'both',
    iconUrl: LogoutIcon,
    isSelected: false,
  },
];
