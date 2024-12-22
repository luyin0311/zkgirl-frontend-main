import { vw } from '@src/common/rw';
import Loading from '@src/image/loading.gif';
import { Image } from '@unstyled-ui/atomic';
import { styled } from '@unstyled-ui/core';
import { fixedXYCenter } from '@unstyled-ui/css';

//菊花
const _Image: React.FC = props => <Image src={Loading} {...props} />;
export const LoadingIcon = styled(_Image, {
  variants: {
    location: {
      global: {
        w: 80,
        ...fixedXYCenter(),
      },
    },
  },
});
