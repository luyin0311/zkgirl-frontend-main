import { vw } from '@src/common/rw';
import { CopyButton } from '@src/components/Image/Copy';
import { CSSProps } from '@unstyled-ui/core';
import { Row } from '@unstyled-ui/layout';
import React from 'react';

import EllipseText from './EllipseText';

export type EllipseTextCopableProps = {
  text: string;
  leftCount?: number;
  rightCount?: number;
  isGray?: boolean;
} & CSSProps;

const EllipseTextCopable: React.FC<EllipseTextCopableProps> = props => {
  const { text, isGray, leftCount, rightCount, css = {}, ...restProps } = props;
  return (
    <Row
      className="txid"
      css={{
        w: vw(320, 'auto'),
        justifyContent: vw('space-between', 'flex-end'),
        gap: vw(4),
        ...css,
      }}
    >
      <EllipseText
        className="ellipse-text"
        leftCount={leftCount}
        rightCount={rightCount}
        css={{
          typo: {
            fontWeight: 400,
            fontSize: vw(14, 16),
            lineHeight: vw(14, 24),
          },
          // textDecorationLine: 'underline',
        }}
        text={text}
      />
      <CopyButton content={text} isGray={isGray} />
    </Row>
  );
};

export default EllipseTextCopable;
