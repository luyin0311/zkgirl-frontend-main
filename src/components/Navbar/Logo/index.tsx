import './index.less';

import { vw } from '@src/common/rw';
import { urlPath } from '@src/constants/urlPath';
import useWindowSize from '@src/hooks/useWindowSize';
import logoMini from '@src/image/logo.svg';
import logo from '@src/image/logo-with-text.svg';
import { Image, Link } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router';

export type LogoProps = CSSProps & {
  width?: number | string;
  style?: CSSProperties;
};
const Logo: React.FC<LogoProps> = props => {
  const { isMobile } = useWindowSize();
  const nav = useNavigate();
  return (
    <Link className="navLogo" onClick={() => nav(urlPath.home)}>
      <Image src={isMobile ? logoMini : logo} />
    </Link>
  );
};
export default Logo;
