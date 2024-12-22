import { isMobile } from '@c3/css';
import useWindowSize, { WindowSize } from '@src/hooks/useWindowSize';
import React, { useContext } from 'react';
type Props = {
  children: React.ReactNode;
};

// @ts-ignore
window.__isMobile = isMobile;

export const GlobalContext = React.createContext({} as unknown as WindowSize);

export const GlobalContextProvider = (props: Props) => {
  const size = useWindowSize();
  return <GlobalContext.Provider {...props} value={size} />;
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
