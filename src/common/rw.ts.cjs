'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.vw = exports.stRw375 = exports.drRw750 = exports.drRw375 = exports.ckRw375 = exports.breakpointsForChakra = void 0;
var _responsive = require('@unstyled-ui/responsive');
const breakpointsForChakra = {
  // mob: '0px',
  pad: '768px',
  pc: '1300px',
};

//375设计稿宽度.使用在chakra-ui组件中
exports.breakpointsForChakra = breakpointsForChakra;
const ckRw375 = (mobile, pc) => [(0, _responsive.vw)(mobile, 375), pc, pc];

//375设计稿宽度.使用在stitches组件中
exports.ckRw375 = ckRw375;
const stRw375 = (mobile, pc) => ({
  mob: (0, _responsive.vw)(mobile, 375),
  pad: pc,
  pc: pc,
});
exports.stRw375 = stRw375;
const drRw750 = (mobilePx, pcPx) => {
  if (_responsive.isMobile) {
    return (0, _responsive.vw)(mobilePx, 750);
  }
  return (0, _responsive.origin)(pcPx ?? mobilePx);
};
exports.drRw750 = drRw750;
const vw = (mobilePx, pcPx) => {
  if (_responsive.isMobile) {
    return (0, _responsive.vw)(mobilePx, 375);
  }
  return (0, _responsive.origin)(pcPx ?? mobilePx);
};
exports.vw = vw;
const drRw375 = vw;
exports.drRw375 = drRw375;
