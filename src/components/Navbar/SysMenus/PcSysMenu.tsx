import { noop } from '@c3/utils';
import { isExternalLink } from '@src/common/externalLink';
import { vw } from '@src/common/rw';
import { sysMenus } from '@src/constants/sysmenu';
import { Button } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { BaseListItemType, List } from '@unstyled-ui/layout';
import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { getActiveMenuCls } from '../utils';

const linkStyle = {
  fontSize: vw(18),
  fontWeight: 400,
  lineHeight: 1,
};

type MenuItemType = BaseListItemType & {
  path: string;
  name: string | React.ReactElement;
  icon?: string;
};
export type MenusProps = CSSProps & {
  sysMenu: MenuItemType[];
};
const PcSysMenus: React.FC<MenusProps> = props => {
  const { sysMenu: sysMenu, ...restProps } = props;
  return sysMenus.length ? (
    <List
      data={sysMenu}
      direction="row"
      updateData={noop}
      css={{
        gap: `clamp(12px,calc((100% - 480px) / ${sysMenus.length}),48px)`,
        h: '100%',
        mr: vw('auto', 20),
        w: 'auto',
        flexGrow: 1,
        '& > a, &>button': {
          h: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          color: '$white08',
        },
        '& > a:hover, & > button:hover': {
          color: 'white',
        },
        '& a.active::after, & a:hover::after': {
          position: 'absolute',
          content: '""',
          width: '100%',
          height: '100%',
          borderBottom: '2px solid #0CFFA7',
        },
      }}
      renderItem={(e: MenuItemType) => {
        if (isExternalLink(e.path)) {
          return (
            <Button
              css={{ ...linkStyle }}
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                window.open(e.path, '_blank');
              }}
            >
              {e.name}
            </Button>
          );
        }
        return (
          <Link
            className={getActiveMenuCls(e.path)}
            key={e.path}
            to={e.path}
            style={{
              ...linkStyle,
            }}
            onClick={event => {
              // try2NavOnZkBridgePage(event, e.path);
            }}
          >
            {e.name}
            {e.icon ? <img style={{ marginLeft: '7px' }} src={e.icon} /> : ''}
          </Link>
        );
      }}
    ></List>
  ) : null;
};

export default PcSysMenus;
