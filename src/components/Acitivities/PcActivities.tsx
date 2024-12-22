// 活动页
import './index.less';

import { styled } from '@unstyled-ui/core';
import { Popover } from 'antd';
import React, { useState } from 'react';

import SwitchIcon from './img/activity-switch.svg';
import { PopWind } from './Popwind';
import { IActiveItemType } from './type';

const offsetY = 90;
const ToggleBtn = styled('div', {
  width: 24,
  height: 24,
  borderRadius: '6px 0px 0px 6px',
  // borderTop: '1px solid rgba(255, 255, 255, 0.10)',
  // borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
  // borderLeft: '1px solid rgba(255, 255, 255, 0.10)',
  background: '#151716',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '& > img': {
    width: 24,
    height: 24,
  },
  top: 150,
});

export type FloatingActivitiesProps = {
  list: IActiveItemType[];
};

const PcFloatingActivities: React.FC<FloatingActivitiesProps> = props => {
  const { list } = props;
  const [visible, setVisible] = useState<boolean>(true);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Popover
      content={
        <div className="ActivitiesPopupContent">
          <PopWind list={list} />
          <img className="iconBtn" src={SwitchIcon} alt="" onClick={toggleVisibility} />
        </div>
      }
      open={visible}
      placement="leftTop"
    >
      <ToggleBtn
        css={{
          position: 'fixed',
          top: 150,
          right: 16,
          zIndex: 1,
          transition: 'all 0.3s',
          transform: !visible ? 'roate(0deg)' : 'rotate(180deg)',
        }}
        onClick={toggleVisibility}
      >
        <img src={SwitchIcon} alt="" onClick={toggleVisibility} />
      </ToggleBtn>
    </Popover>
  );
};

export default PcFloatingActivities;
