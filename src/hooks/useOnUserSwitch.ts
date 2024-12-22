import { Fn } from '@c3/types';
import { user_switch_event } from '@src/constants/consts';
import { useEffect } from 'react';

export const useOnUserSwitch = (cb: Fn) => {
  useEffect(() => {
    window.addEventListener(user_switch_event, cb);
    return () => {
      window.removeEventListener(user_switch_event, cb);
    };
  }, [cb]);
};
