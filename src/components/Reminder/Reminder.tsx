import { vw } from '@src/common/rw';
import CloseImg from '@src/image/close-btn-yellow.svg';
import { Image, Space, Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { abs } from '@unstyled-ui/css';
import { Col } from '@unstyled-ui/layout';
import React from 'react';

export type ReminderProps = {
  title: string;
  desc: string;
  onClose?: () => void;
  showClose?: boolean;
} & CSSProps;

const Reminder: React.FC<ReminderProps> = props => {
  const { title, onClose, desc, css = {}, showClose = true, ...restProps } = props;

  return (
    <Col
      css={{
        w: vw(320, 716),
        border: '1px solid #F09C1D',
        borderRadius: vw(8),
        background: '#211503',
        py: vw(18),
        px: vw(18),
        position: 'relative',
        ...css,
      }}
      {...restProps}
    >
      <Text
        css={{
          fontSize: vw(16),
          fontWeight: 500,
          lineHeight: 1,
          color: '#F09C1D',
        }}
      >
        {title}
      </Text>
      <Space size={vw(10)} />
      <Text
        css={{
          fontSize: vw(14),
          fontWeight: 400,
          lineHeight: 1.6,
          color: '$white05',
          w: vw(283, 'auto'),
        }}
      >
        {desc}
      </Text>
      {showClose && (
        <Image
          onClick={onClose}
          src={CloseImg}
          css={{
            w: vw(20),
            h: vw(20),
            cursor: 'pointer',
            _hover: { opacity: 0.8 },
            position: 'absoluted',
            ...abs({ right: vw(15), top: vw(13) }),
          }}
          {...restProps}
        />
      )}
    </Col>
  );
};

export default Reminder;
