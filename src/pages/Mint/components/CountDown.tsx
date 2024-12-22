import useCountDown from '@src/hooks/useCountDown';
import React from 'react';

export type IProps = {
  time: number;
  stop: boolean;
};

const Comp: React.FC<IProps> = props => {
  const countDown = useCountDown(props.time, props.stop);
  return (
    <>
      {countDown.days} D {countDown.hours} H {countDown.minutes} M
    </>
  );
};

export default Comp;
