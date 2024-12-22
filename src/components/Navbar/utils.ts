import { urlPath } from '@src/constants/urlPath';

export const getIsHomePage = () => location.pathname === urlPath.home;
export const getActiveMenuCls = (menuPath: string) => {
  const path = window.location.pathname;
  const hash = window.location.hash;
  return path === menuPath || path + hash === menuPath ? 'active' : '';
};
