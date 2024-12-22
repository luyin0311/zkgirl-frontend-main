import CheckImg from '@src/image/check-bord-border.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProperties, CSSProps } from '@unstyled-ui/core';

export const BoldCheckImage: React.FC<CSSProps & { w: CSSProperties['width'] }> = props => {
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
