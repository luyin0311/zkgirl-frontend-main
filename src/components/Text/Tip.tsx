import { flexCenter } from '@c3/css';
import { vw } from '@src/common/rw';
import { useGlobalContext } from '@src/context/GlobalContext';
import { Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { pseudoArrow } from '@unstyled-ui/css';
import { Popover } from '@unstyled-ui/ct-floating-ui';
import React, { useState } from 'react';

export type TipProps = {
  text: string;
  anchor: React.ReactElement;
  onClick?: () => void;
} & CSSProps;

const Tip: React.FC<TipProps> = props => {
  const { text, anchor, css = {}, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const { isMobile } = useGlobalContext();
  return (
    <Popover
      trigger={['hover']}
      visible={visible}
      overlay={
        isMobile ? (
          <></>
        ) : (
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
              zIndex: 101,
              ...css,
            }}
          >
            {text}
          </Text>
        )
      }
      placement="top"
      onToggle={setVisible}
      {...restProps}
    >
      {anchor}
    </Popover>
  );
};

export default Tip;
