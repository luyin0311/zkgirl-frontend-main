import { vw } from '@src/common/rw';
import { useGlobalContext } from '@src/context/GlobalContext';
import { Space, Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { AutoRC, Col, Row } from '@unstyled-ui/layout';
import React from 'react';

import { CopyButton } from './Image/Copy';
import EllipseText from './Text/EllipseText';

export type TxIdProps = {
  title?: string;
  name: string;
  txId: string;
  leftCount: number;
  rightCount: number;
} & CSSProps;

const TxId: React.FC<TxIdProps> = props => {
  const { name, title, txId, leftCount = 6, rightCount = 6, css = {}, ...restProps } = props;
  const { isMobile } = useGlobalContext();
  return (
    <Col
      className="container"
      css={{
        justifyContent: 'flex-start',
        w: vw(320, 756),
        gap: vw(16),
        background: isMobile ? 'none' : 'rgba(255, 255, 255, 0.03)',
        px: vw(0, 24),
        py: vw(18, 24),
        borderRadius: vw(0, 8),
        color: '#fff',
        ...(isMobile
          ? {
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }
          : {}),
        ...css,
      }}
    >
      {title && (
        <Text
          css={{
            color: 'rgba(255,255,255,0.3)',
            typo: { fontSize: vw(12, 14), fontWeight: 400, lineHeight: 1 },
          }}
        >
          {title}
        </Text>
      )}
      <AutoRC
        className="content"
        css={{
          alignItems: vw('flex-start'),
          w: vw('100%', '100%'),
        }}
        {...restProps}
      >
        <Text
          className="name"
          css={{
            typo: {
              fontWeight: 400,
              fontSize: vw(12, 16),
              lineHeight: vw(12, 24),
              opacity: isMobile ? 0.5 : 1,
              whiteSpace: 'nowrap',
            },
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          {name}
        </Text>
        <Space size={vw(5, 16)} />
        <Row
          className="txid"
          css={{
            w: vw(320, 'auto'),
            justifyContent: vw('space-between', 'flex-end'),
          }}
        >
          <EllipseText
            className="ellipse-text"
            leftCount={leftCount}
            rightCount={rightCount}
            css={{
              typo: {
                fontWeight: 400,
                fontSize: vw(12, 16),
                lineHeight: vw(12, 24),
              },
              textDecorationLine: 'underline',
            }}
            text={txId}
          />
          {!isMobile && <Space size={vw(5, 10)} css={{ h: 1 }} />}
          <CopyButton content={txId} />
        </Row>
      </AutoRC>
    </Col>
  );
};

export default TxId;
