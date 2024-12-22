import classnames from 'classnames';
import React from 'react';

type IProps = {
  name: string;
  wrapClassName?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

const Icon = (props: IProps): React.ReactElement => {
  return (
    <span className={classnames(props.wrapClassName, 'iconWrap')} onClick={e => props.onClick && props.onClick(e)} style={props.style}>
      <svg className={classnames(props.className, 'icon')}>
        <use xlinkHref={'#' + props.name} />
      </svg>
    </span>
  );
};

export default Icon;
