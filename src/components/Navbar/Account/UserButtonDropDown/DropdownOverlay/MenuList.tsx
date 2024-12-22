import { vw } from '@src/common/rw';
import { useLogout } from '@src/hooks/useIsLogined';
import { Image, Text } from '@unstyled-ui/atomic';
import { divider, flexYCenter } from '@unstyled-ui/css';
import { Box, List, Row } from '@unstyled-ui/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IMenuItem, logoutConfig } from '../../Common/consts';

const MenuList: React.FC = props => {
  const { ...restProps } = props;
  const [cfg, setCfg] = useState(logoutConfig);
  const logout = useLogout();

  return (
    <Box
      css={{
        mx: 'auto',
        w: vw(202, 180),
      }}
    >
      <List
        data={cfg}
        updateData={setCfg}
        css={{
          ...divider('rgba(255, 255, 255, 0.1)'),
          w: '100%',
        }}
        renderItem={(e: IMenuItem) => {
          const row = (
            <Row
              css={{
                gap: 12,
                ...flexYCenter,
                height: 52,
                width: '100%',
                transition: 'all 300ms',
                _hover: {
                  opacity: 0.8,
                },
              }}
            >
              <Image src={e.iconUrl} css={{ w: 24 }} />
              <Text
                css={{
                  typo: {
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1,
                  },
                }}
              >
                {e.title}
              </Text>
            </Row>
          );
          return e.blank ? (
            <a href={e.to} key={e.id} style={{ width: '100%', color: 'rgba(255,255,255,0.8)' }} target="_blank" rel="noopener noreferrer">
              {row}
            </a>
          ) : (
            <Link
              key={e.id}
              to={e.to}
              style={{ width: '100%', color: 'rgba(255,255,255,0.8)' }}
              onClick={event => {
                if (e.id === 'logout') {
                  logout();
                }
              }}
            >
              {row}
            </Link>
          );
        }}
      />
    </Box>
  );
};

export default MenuList;
