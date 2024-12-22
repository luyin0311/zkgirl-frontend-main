import { drRw375 } from '@src/common/rw';
import { Text } from '@unstyled-ui/atomic';
import React from 'react';

const Desc: React.FC = props => {
  const { ...restProps } = props;
  return (
    <Text
      css={{
        w: drRw375(283, 392),
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        typo: {
          fontSize: drRw375(16),
          fontWeight: 300,
          lineHeight: 1.5,
        },
      }}
    >
      By connecting your wallet and using zkGirl, you agree to our{' '}
      <a
        style={{ color: '#0CFFF0' }}
        href={'https://polyhedra-network.notion.site/zkGirl-Official-Rules-27e4839de7ef402f94e835cfd11b33ea?pvs=4'}
        target="_blank"
        rel="noreferrer"
      >
        Official Rules
      </a>
    </Text>
  );
};

export default Desc;
