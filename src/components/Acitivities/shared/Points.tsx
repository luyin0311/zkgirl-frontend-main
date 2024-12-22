import React from 'react';

export type PointsProps = {
  value: string;
};
const Points: React.FC<PointsProps> = props => {
  const { value, ...restProps } = props;
  return (
    <div className="reward-txt">
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Points;
