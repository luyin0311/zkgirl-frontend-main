import { isExternalLink } from '@src/common/externalLink';
import { vw } from '@src/common/rw';
import mobileMenuBtnPic from '@src/image/mobile-menu-btn.svg';
import closeBtn from '@src/image/nh-close-btn.svg';
import { Button } from '@unstyled-ui/atomic';
import { Dropdown } from '@unstyled-ui/ct-floating-ui';
import { Box, List } from '@unstyled-ui/layout';
import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SysMenu } from '../../../../constants/sysmenu';
import MobileMenuBtn from './MobileMenuBtn';

export type MobileSysMenuProps = {
  onVisibleChange?: (open: boolean) => void;
  initialData: SysMenu[];
};

const linkStyle = {
  height: vw(64),
  fontSize: vw(18),
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: vw(20),
  color: 'rgba(255,255,255,.8)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
};

const MobileSysMenu: React.FC<MobileSysMenuProps> = props => {
  const { onVisibleChange, initialData, ...restProps } = props;
  useLocation();
  const [data, setData] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const overlay = useMemo(
    () => (
      <Box
        css={{
          h: isOpen ? '100vh' : 0,
          mt: vw(12), //FIXME
          w: '100vw',
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(14px)',
          zIndex: 100,
        }}
      >
        <List
          data={data}
          css={{
            background: 'rgba(0, 0, 0, 0.3)',
            w: '100vw',

            '& > a': {
              background: 'Black',
              _hover: {
                background: '#111',
              },
            },
          }}
          updateData={setData}
          renderItem={(e: SysMenu) => {
            if (isExternalLink(e.path)) {
              return (
                <Button
                  css={{ ...linkStyle, justifyContent: 'flex-start' }}
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
                to={e.path}
                style={{
                  ...linkStyle,
                }}
              >
                {e.name}
                {e.icon ? <img style={{ marginLeft: '7px' }} src={e.icon} /> : ''}
              </Link>
            );
          }}
        />
      </Box>
    ),
    [data, isOpen]
  );

  return (
    <Dropdown
      onToggle={(open: boolean) => {
        setIsOpen(open);
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        onVisibleChange && onVisibleChange(open);
      }}
      overlay={overlay}
      trigger={['click']}
    >
      <MobileMenuBtn src={isOpen ? closeBtn : mobileMenuBtnPic} />
    </Dropdown>
  );
};

export default MobileSysMenu;
