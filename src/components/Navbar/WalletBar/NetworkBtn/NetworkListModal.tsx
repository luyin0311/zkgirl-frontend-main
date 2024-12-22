// 选择网络的modal
import { useWallet } from '@c3/crypto';
import { noop } from '@c3/utils';
import { drRw375, vw } from '@src/common/rw';
import { modalCss } from '@src/constants/style';
import { useGlobalContext } from '@src/context/GlobalContext';
import CloseBtn from '@src/image/close-btn.svg';
import { Image, Space, Text } from '@unstyled-ui/atomic';
import { abs, flexCenter } from '@unstyled-ui/css';
import { useModal } from '@unstyled-ui/ct-modal';
import { Box, Col, NGrid } from '@unstyled-ui/layout';
import { CSSProperties, useEffect, useMemo, useRef } from 'react';

import NetworkBtn from '.';
import { supportedNetworksSorted } from './const';

const useNetworkListModal = (css: CSSProperties = {}) => {
  const wallet = useWallet();
  const { isMobile } = useGlobalContext();
  const hideRef = useRef<() => void>(noop);
  const [modal, show, hide, visible] = useModal(
    useMemo(
      () => ({
        css: { ...modalCss, zIndex: 1051, ...css },
        body: (
          <Col
            css={{
              w: drRw375(347, 616),
              borderRadius: drRw375(16),
              background: '#151716',
              '&&': {
                fx: 'center',
              },
              // px: drRw375(40),
            }}
          >
            <Space size={30} />

            <Text
              css={{
                color: 'white',
                typo: {
                  fontSize: 24,
                  fontWeight: 500,
                  pl: 40,
                },
                alignSelf: 'flex-start',
              }}
            >
              Select Network
            </Text>
            <Space size={30} />
            <NGrid
              data={supportedNetworksSorted}
              css={{
                gridTemplateColumns: isMobile ? 'repeat(1fr, auto)' : 'repeat(2, auto)',
                columnGap: vw(16),
                rowGap: vw(16, 16),
                maxH: vw(400),
                alignContent: 'stretch',
                px: vw(10),
                overflowY: 'auto',
                alignSelf: 'center',
                '& .network-btn': {
                  cursor: 'pointer',
                  w: vw(260),
                  fontSize: vw(16),
                  h: vw(50),
                  justifyContent: 'center',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, .3)',
                },
                '&::-webkit-scrollbar': {
                  display: 'block',
                  width: '4px',
                  borderRadius: '4px',
                },
              }}
              renderCell={network => {
                return (
                  <NetworkBtn
                    icon={network.icon}
                    text={network.name}
                    showHoverEffect
                    onClick={async () => {
                      await wallet.switchNetwork(network.chain);
                      hideRef.current();
                    }}
                  />
                );
              }}
            />
            <Space size={50} />
          </Col>
        ),
        closeBtn: (
          <Box
            role="button"
            shape="round"
            onClick={() => {
              console.log('');
            }}
            css={{
              w: drRw375(26),
              h: drRw375(26),
              background: 'rgba(255, 255, 255, 0.1)',
              ...abs({ top: drRw375(16), right: drRw375(16) }),
              cursor: 'pointer',
              ...flexCenter,
              _hover: {
                background: 'rgba(255, 255, 255, 0.2)',
                transition: 'background 0.2s',
              },
              borderRadius: drRw375(130),
            }}
          >
            <Image src={CloseBtn} css={{ w: drRw375(20) }} />
          </Box>
        ),
      }),
      [css, wallet, isMobile]
    )
  );
  useEffect(() => {
    hideRef.current = hide;
  });
  return [modal, show, hide, visible] as const;
};

export default useNetworkListModal;
