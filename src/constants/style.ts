import { vw } from '@src/common/rw';

import { geometry } from './geometry';

export const modalCss = {
  zIndex: 1000,
  background: 'rgba(0,0,0,0.8)',
};

export const minHOfMain = `calc(100vh - ${vw(geometry.navBarHeight - 1)})`;

export const mainColor = '#0CFFA7';
