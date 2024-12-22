import { drRw375 } from '@src/common/rw';
import { Text } from '@unstyled-ui/atomic';
import React from 'react';

const Title: React.FC = props => {
  const { ...restProps } = props;
  return (
    <Text
      css={{
        color: 'white',
        typo: {
          fontSize: drRw375(24, 28),
          fontWeight: 600,
          lineHeight: 1,
        },
      }}
    >
      Welcome to zkGirl
    </Text>
  );
};

export default Title;
