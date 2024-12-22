import { BaseListItemType } from '@unstyled-ui/layout';
import React from 'react';

import { urlPath } from './urlPath';

export interface SysMenu extends BaseListItemType {
  path: string;
  name: React.ReactElement | string;
  device: 'mobile' | 'pc' | 'both' | 'none';
  icon?: string;
}

export const sysMenus: SysMenu[] = [
  {
    name: 'Mint',
    path: urlPath.mint,
    id: 'mint',
    device: 'both',
  },
  {
    name: 'Ticket',
    path: urlPath.ticket,
    id: 'ticket',
    device: 'both',
  },
];
