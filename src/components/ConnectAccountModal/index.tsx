import { abs, flexCenter } from '@c3/css';
import { vw } from '@src/common/rw';
import LoadingIcon from '@src/components/Loading/LoadingIcon';
import { modalCss } from '@src/constants/style';
import CloseBtn from '@src/image/close-btn.svg';
import { Image, Space, Text } from '@unstyled-ui/atomic';
import { useModal } from '@unstyled-ui/ct-modal';
import { Box, Col } from '@unstyled-ui/layout';
import React from 'react';

//只用在pc端使用
export const ConfirmConnectingWalletModal: React.FC = () => {
  const [modal, show, hide] = useModal({
    css: { ...modalCss, zIndex: 101 },
    body: (
      <Col
        css={{
          fx: 'center',
          w: vw(477),
          h: vw(306),
          background: '#151716',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: vw(16),
        }}
      >
        <Space size={vw(64)} />
        <LoadingIcon css={{ w: vw(54), h: vw(54) }} />
        <Space size={vw(24)} />
        <Text css={{ typo: { fontSize: vw(28) }, fontWeight: 600, lineHeight: 1 }}>Confirm Wallet</Text>
        <Space size={vw(24)} />
        <Text
          css={{
            w: vw(349),
            textAlign: 'center',
            typo: { fontSize: vw(16), fontWeight: 300, lineHeight: 1.5 },
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Please sign into wallet to connect to zkGirl.
        </Text>
      </Col>
    ),
    closeBtn: (
      <Box
        role="button"
        shape="round"
        css={{
          w: vw(26),
          h: vw(26),
          background: 'rgba(255, 255, 255, 0.1)',
          ...abs({ top: vw(16), right: vw(16) }),
          cursor: 'pointer',
          ...flexCenter,
          _hover: {
            background: 'rgba(255, 255, 255, 0.2)',
            transition: 'background 0.2s',
          },
          borderRadius: vw(130),
        }}
      >
        <Image src={CloseBtn} css={{ w: vw(20) }} />
      </Box>
    ),
  });
  // useEffect(() => {
  //   if (isMobile) {
  //     return;
  //   }
  //   // window.ethereum?.on('connect-account-start', show);
  //   // window.ethereum?.on('connect-account-success', hide);
  //   // window.ethereum?.on('connect-account-fail', hide);
  //   return () => {
  //     // window.ethereum?.off('connect-account-start', show);
  //     // window.ethereum?.off('connect-account-success', hide);
  //     // window.ethereum?.off('connect-account-fail', hide);
  //   };
  // }, [hide, show]);

  return <div>{modal}</div>;
};
