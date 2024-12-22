import { Fn } from '@c3/types';
import { drRw375 } from '@src/common/rw';
import { modalCss } from '@src/constants/style';
import Logo from '@src/image/logo-single.svg';
import { Image, Space } from '@unstyled-ui/atomic';
import { useModal } from '@unstyled-ui/ct-modal';
import { Col } from '@unstyled-ui/layout';

import Desc from './Desc';
import Title from './Title';
import { XButton } from './XButton';

export const useLoginPromptModal = (onOK: Fn, onReject: Fn) => {
  const [model, on, off] = useModal({
    css: { ...modalCss },
    body: (
      <Col
        css={{
          fx: 'center',
          w: drRw375(347, 520),
          h: drRw375(464, 476),
          background: '#151716',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: drRw375(16),
        }}
      >
        <Space size={drRw375(64)} />

        <Image src={Logo} css={{ w: drRw375(60) }} />
        <Space size={drRw375(24)} />
        <Title />
        <Space size={drRw375(24)} />
        <Desc />
        <Space size={drRw375(48)} />
        <Col>
          <XButton
            css={{
              color: '#0CFFF0',
              left: drRw375(268),
            }}
            onClick={async () => {
              await onOK();
              off();
            }}
          >
            Accept and sign
          </XButton>
          <Space size={drRw375(16)} />
          <XButton
            onClick={async () => {
              await onReject?.();
              off();
            }}
            css={{
              left: drRw375(64),
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            Cancel
          </XButton>
        </Col>
      </Col>
    ),
  });
  return [model, on, off] as const;
};
