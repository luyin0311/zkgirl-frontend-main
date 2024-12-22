import { vw } from '@src/common/rw';
import { useGlobalContext } from '@src/context/GlobalContext';
import { Button, Space, Text } from '@unstyled-ui/atomic';
import { absYCenter } from '@unstyled-ui/css';
import { Box } from '@unstyled-ui/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { CloseBtn } from '../Image/CloseBtn';

export type SystemNotificationProps = {
  text: string;
  target: string;
  onClose?: () => void;
  style?: React.CSSProperties;
};

const SystemNotification: React.FC<SystemNotificationProps> = props => {
  const { text, target, onClose, style, ...restProps } = props;
  const [show, setShow] = useState(!localStorage.getItem('notification-closed'));
  const nav = useNavigate();
  const { isMobile } = useGlobalContext();
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box
      css={{
        w: '100vw',
        h: vw(40),
        top: 0,
        color: 'black',
        fontSize: vw(16),
        fontWeight: 600,
        position: 'fixed',
        zIndex: 1000,
        '&&': {
          display: show ? 'flex' : 'none',
        },

        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        ...style,
      }}
      onClick={() => {
        nav(target);
      }}
      {...restProps}
    >
      <Text css={{ color: 'black' }}>{text}</Text>
      <Space size={vw(40)} />
      {!isMobile && (
        <Button
          as="a"
          href={target}
          target="_blank"
          css={{
            color: 'black',
            cursor: 'pointer',
            border: '1px solid #000000',
            px: vw(20),
            borderRadius: 9999,
            transition: 'all 0.2s ease',
            _hover: {
              background: 'black',
              color: 'white',
            },
          }}
        >
          Click
        </Button>
      )}

      <CloseBtn
        css={{ ...absYCenter({ right: vw(24) }) }}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setShow(false);
          localStorage.setItem('notification-closed', '1');
          onClose?.();
        }}
      />
    </Box>
  );
};

export default SystemNotification;
