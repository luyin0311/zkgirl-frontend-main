import UserIcon from '@src/image/user.png';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { Row } from '@unstyled-ui/layout';
import React from 'react';

export type UserNameIdProps = CSSProps & {
  name: string;
  uid: string;
};

const UserNameId: React.FC<CSSProps> = props => {
  const { name, uid, ...restProps } = props;
  return (
    <Row
      css={{
        gap: 11,
        py: 15,
        pl: 20,
        w: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
      {...restProps}
    >
      <Image src={UserIcon} css={{ w: 54 }} />
    </Row>
  );
};

export default UserNameId;
