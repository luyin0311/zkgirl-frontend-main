import './index.less';

import Icon from '@src/components/Icon';
import { Dropdown } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

export type IStatus = 'initial' | 'loading' | 'success' | 'failure';
interface IProps {
  style?: React.CSSProperties;
  className?: string;
  btn: (string | React.ReactElement)[];
  onClick(index: number, item: string | React.ReactElement): void | boolean;
  active?: number;
  transparent?: boolean;
  placeHolder?: string;
  disabled: boolean;
}

const Select = (props: IProps): React.ReactElement | null => {
  const [active, setActive] = useState<number>(props.active || 0);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setActive(props.active || 0);
  }, [props.active]);

  return (
    <div className={classnames('selectRoot', props.className)} style={props.style} ref={rootRef}>
      <Dropdown
        trigger={['click']}
        open={visible && !props.disabled}
        onOpenChange={v => setVisible(v)}
        getPopupContainer={() => rootRef.current || document.body}
        overlayClassName="customizeSelectDropdown"
        overlay={
          <>
            {props.btn.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setVisible(false);
                  if (!props.onClick(index, item) && !props.disabled) {
                    setActive(index);
                  }
                }}
                className="selectDropdownItem"
              >
                {item}
              </div>
            ))}
          </>
        }
      >
        <div className={classnames('select', { disabled: props.disabled })}>
          <span className={classnames('txt')}>{props.btn[active] || props.placeHolder}</span>
          <Icon name="down" className={classnames({ transform: visible && !props.disabled })} />
        </div>
      </Dropdown>
    </div>
  );
};

export default Select;
