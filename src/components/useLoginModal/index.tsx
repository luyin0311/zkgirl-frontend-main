import Icon from '@src/components/Icon';
import useWindowSize from '@src/hooks/useWindowSize';
import { useGlobalStore } from '@src/store/globalStore';
import { Space, Text } from '@unstyled-ui/atomic';
import { Col } from '@unstyled-ui/layout';
import { Modal } from 'antd';

import { CoinBaseBtn, MetaMaskBtn, OkxBtn } from '../WalletLogin';
import { BNBWalletBtn } from '../WalletLogin/BNBWalletBtn';
import { TrustWalletBtn } from '../WalletLogin/TrustWalletBtn';
import css from './index.module.less';
import LogoText from './Logo';

export const LoginModal = () => {
  const { isMobile } = useWindowSize();
  const { state, action } = useGlobalStore(s => s);
  return (
    <Modal
      open={state.showLoginModal}
      onCancel={() => {
        action.update({ showLoginModal: false });
      }}
      footer={false}
      closable={false}
      maskClosable={false}
      centered
      className={css.root}
    >
      <Col
        css={{
          w: isMobile ? 346 : 504,
          fx: 'center',
          color: 'white',
          borderRadius: 16,
          background: '#151716',
          '& button': {
            border: '1px solid white',
            '&&& div': {
              color: '#fff',
            },
          },
          position: 'relative',
        }}
      >
        <Icon
          name="Close_XL"
          onClick={() => {
            action.update({ showLoginModal: false, loginModalRejected: true });
          }}
          style={{
            position: 'absolute',
            right: isMobile ? 20 : 24,
            top: isMobile ? 20 : 24,
            cursor: 'pointer',
          }}
        />
        <Space size={isMobile ? 40 : 32} />
        <LogoText text={'Connect Wallet'} />
        <Space size={isMobile ? 32 : 32} />
        <MetaMaskBtn />
        <Space size={isMobile ? 12 : 16} />
        {/* <TrustWalletBtn /> */}
        <Space size={isMobile ? 12 : 16} />
        {/* <OkxBtn /> */}
        <Space size={isMobile ? 12 : 16} />
        {/* <CoinBaseBtn /> */}
        <Space size={isMobile ? 12 : 16} />
        {/* <BNBWalletBtn /> */}
        <Space size={isMobile ? 32 : 40} />
        <Text
          css={{
            w: isMobile ? 306 : 376,
            textAlign: 'center',
            color: '#666666',
          }}
        >
          By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.
        </Text>
        <Space size={isMobile ? 20 : 64} />
      </Col>
    </Modal>
  );
};
