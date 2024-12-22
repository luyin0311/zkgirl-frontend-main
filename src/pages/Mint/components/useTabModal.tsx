import React, { useCallback, useState } from 'react';

import TabModal, { ICompProps, IParams } from './TabModal';

interface ITabModal {
  modal: React.FunctionComponentElement<ICompProps> | null;
  visible: boolean;
  onClose: () => void;
  onShow: () => void;
}

export const useTabModal = (params: IParams): ITabModal => {
  const [visible, setShow] = useState(false);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  const onShow = useCallback(() => {
    setShow(true);
  }, []);

  const modal = React.cloneElement(<TabModal params={params} open={visible} onClose={onClose} />);

  return { visible, modal, onClose, onShow };
};
