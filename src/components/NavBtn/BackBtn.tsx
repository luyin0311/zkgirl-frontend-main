import './index.less';

import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

import BackImg from './back.svg';

export type BackBtnProps = CSSProps;

const BackBtn: React.FC<BackBtnProps> = props => {
  const { ...restProps } = props;
  return (
    <div className="navBtn" {...restProps}>
      <img src={BackImg} alt="" />
      <div>Back</div>
    </div>
  );
};

export default BackBtn;
