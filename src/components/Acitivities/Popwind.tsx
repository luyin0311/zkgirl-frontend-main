import './index.less';

import { vw } from '@src/common/rw';
import { Space } from '@unstyled-ui/atomic';
import { Col } from '@unstyled-ui/layout';
import React from 'react';

import { ActivityItem } from './shared/ActiveItem';
import { IActiveItemType } from './type';

export type PopWindProps = {
  list: IActiveItemType[];
};
const _PopWind: React.ForwardRefRenderFunction<HTMLDivElement, PopWindProps> = (props, ref) => {
  const { list, ...restProps } = props;

  return (
    <Col
      className="activity-container"
      {...restProps}
      ref={ref}
      css={{
        overflow: 'hidden',
        maxW: vw(387),
        minW: vw(387),
        p: vw(20),
      }}
    >
      <div className="activity-title">Campaigns</div>
      <Space size={vw(22)}></Space>
      <Col
        css={{
          maxH: 348,
          gap: vw(12),
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            background: 'transparent',
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
          },
        }}
      >
        {list.map(activity => (
          <ActivityItem activity={activity} key={activity.key} />
        ))}
      </Col>
    </Col>
  );
};
_PopWind.displayName = 'PopWind';
export const PopWind = React.forwardRef(_PopWind);
