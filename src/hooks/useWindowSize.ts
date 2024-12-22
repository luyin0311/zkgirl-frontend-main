/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
export type WindowSize = {
  height: number;
  width: number;
  isMobile: boolean;
};

export default function useWindowSize(): WindowSize {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    isMobile: document.documentElement.clientWidth <= 768,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      isMobile: document.documentElement.clientWidth <= 768,
    });
    // @ts-ignore
    // 为了少改点代码，先暂时这样处理
    window.__isMobile = document.documentElement.clientWidth <= 768;
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return size;
}
