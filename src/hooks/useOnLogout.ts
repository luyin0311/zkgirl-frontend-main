import { user_logout_event } from '@src/constants/consts';
import { useCallback, useEffect } from 'react';

export const useOnLogout = (cb: (...args: any[]) => void) => {
  useEffect(() => {
    window.addEventListener(user_logout_event, cb);
    return () => {
      window.removeEventListener(user_logout_event, cb);
    };
  }, [cb]);
};
