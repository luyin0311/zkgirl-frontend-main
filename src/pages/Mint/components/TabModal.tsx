import Icon from '@src/components/Icon';
import { Modal } from 'antd';
import classnames from 'classnames';
import React from 'react';

export type IParams = {
  title?: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  showClose?: boolean;
  width?: number | string;
};

export type ICompProps = {
  open: boolean;
  onClose: () => void;
  params?: IParams;
};

const Comp: React.FC<ICompProps> = props => {
  const { open, onClose, params } = props;

  return params ? (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      closable={false}
      maskClosable={false}
      centered
      className={classnames('TabModal', params.className)}
      width={params.width || 520}
      destroyOnClose
    >
      {params.title ? (
        <div className="TabModalHeader">
          {params.title}
          <Icon name="Close_XL" onClick={() => onClose()} />
        </div>
      ) : params.showClose ? (
        <Icon wrapClassName="closeBox" className="close" name="Close_XL" onClick={() => onClose()} />
      ) : null}
      <div className="TabModalMain">{params.content}</div>
    </Modal>
  ) : null;
};

export default Comp;
