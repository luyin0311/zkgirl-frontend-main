import { flexCenter } from '@c3/css';
import { getEllipseText } from '@src/common/getEllipseText';
import { vw } from '@src/common/rw';
import useWindowSize from '@src/hooks/useWindowSize';
import { Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { pseudoArrow } from '@unstyled-ui/css';
import { Popover } from '@unstyled-ui/ct-floating-ui';
import React, { useState } from 'react';

export type EllipseTextProps = {
  text: string;
  leftCount?: number;
  rightCount?: number;
  onClick?: () => void;
} & CSSProps;

const EllipseText: React.FC<EllipseTextProps> = props => {
  const { text, leftCount = 10, rightCount = 10, css = {}, onClick, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const { isMobile } = useWindowSize();
  const textDom = (
    <Text
      className="ellipse-text"
      onClick={onClick}
      css={{
        typo: { fontSize: vw(12, 16), fontWeight: 400, lineHeight: vw(24) },
        ...css,
      }}
    >
      {getEllipseText(text, leftCount, rightCount)}
    </Text>
  );
  return isMobile ? (
    <>{textDom}</>
  ) : (
    <Popover
      trigger={['hover']}
      visible={visible}
      overlay={
        <Text
          key={visible ? 1 : 0}
          css={{
            h: vw(36),
            px: vw(11),
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#151716',
            borderRadius: 8,
            color: 'white',
            '&&&': {
              position: 'absolute',
            },
            ...flexCenter,
            overflow: 'visible',
            bottom: 'calc(120% + 8px)',
            ...pseudoArrow('bottom', 12, 6, {
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }),
            zIndex: 1001,
            ...css,
          }}
        >
          {text}
        </Text>
      }
      placement="top"
      onToggle={setVisible}
      {...restProps}
    >
      {textDom}
    </Popover>
  );
};

export default EllipseText;
