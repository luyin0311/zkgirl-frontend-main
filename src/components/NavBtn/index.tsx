import { urlPath } from '@src/constants/urlPath';
import { CSSProps } from '@unstyled-ui/core';
import { Row } from '@unstyled-ui/layout';
import React from 'react';
import { useNavigate } from 'react-router';

// import HistoryBtn from './HistoryBtn';
import BackBtn from './BackBtn';
export type NavBarProps = CSSProps;
const NavBtn: React.FC<NavBarProps> = props => {
  const { ...restProps } = props;
  const nav = useNavigate();
  return (
    <Row {...restProps}>
      <BackBtn
        onClick={() => {
          nav(urlPath.home);
        }}
      />
      {/* <HistoryBtn /> */}
    </Row>
  );
};

export default NavBtn;
