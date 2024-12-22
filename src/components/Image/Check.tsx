import CheckImg from '@src/image/check.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProperties, CSSProps } from '@unstyled-ui/core';

export const CheckImage: React.FC<CSSProps & { w: CSSProperties['width'] }> = props => {
  const { css = {}, w = 'auto', ...restProps } = props;
  return (
    <Image
      src={CheckImg}
      css={{
        w,
        ...css,
      }}
      {...restProps}
    />
  );
};
