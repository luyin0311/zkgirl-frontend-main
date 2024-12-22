import { drRw375 } from '@src/common/rw';
import { isMobile } from '@unstyled-ui/responsive';

export const geometry = {
  get navBarHeight() {
    return isMobile ? 72 : 88;
  },
  get footerHeight() {
    return drRw375(502, 412);
  },
};
