import { isMobile, origin, vw as _vw } from '@unstyled-ui/responsive';

export const breakpointsForChakra = {
  // mob: '0px',
  pad: '768px',
  pc: '1300px',
};

//375设计稿宽度.使用在chakra-ui组件中
export const ckRw375 = (mobile: number | string, pc: number | string) => [_vw(mobile, 375), pc, pc];

//375设计稿宽度.使用在stitches组件中
export const stRw375 = (mobile: number | string, pc: number | string) => ({
  mob: _vw(mobile, 375),
  pad: pc,
  pc: pc,
});

export const drRw750 = (mobilePx: number | string, pcPx?: number | string) => {
  if (isMobile) {
    return _vw(mobilePx, 750);
  }
  return origin(pcPx ?? mobilePx);
};

export const vw = (mobilePx: number | string, pcPx?: number | string) => {
  // @ts-ignore
  // 为了少改点代码，先暂时这样处理，可以不用刷新页面
  if (window.__isMobile) {
    return _vw(mobilePx, 375);
  }
  return origin(pcPx ?? mobilePx);
};

export const drRw375 = vw;
