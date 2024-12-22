import React, { useCallback, useState } from 'react';

import Reminder, { ReminderProps } from './Reminder';

export const useReminder = (props: Omit<ReminderProps, 'onClose'>) => {
  const [visible, setShow] = useState(true);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);
  //@ts-ignore
  const reminder = React.cloneElement(<Reminder {...props} />, {
    onClose: onClose,
  });

  if (visible) {
    return { reminder, visible };
  }
  return { reminder: null, visible };
};
