import React, { useEffect, useState } from 'react';

export const useDebounce = <T>(val: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(val);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [val, delay]);

  return debouncedValue;
};
