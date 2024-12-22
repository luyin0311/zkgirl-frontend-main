import { vw } from '@src/common/rw';
import { Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';
export type NewTagProps = CSSProps;
const NewTag: React.FC<NewTagProps> = props => {
  const { css = {}, ...restProps } = props;
  return (
    <Text
      as="span"
      css={{
        fontSize: vw(14),
        fontWeight: 400,
        lineHeight: 1,
        background: 'linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)',
        borderRadius: vw(4),
        px: vw(5),
        py: vw(3),
        color: '#000000',
        ...css,
      }}
      {...restProps}
    >
      New
    </Text>
  );
};

export default NewTag;
