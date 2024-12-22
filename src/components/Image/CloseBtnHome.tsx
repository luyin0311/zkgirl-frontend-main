import { vw } from '@src/common/rw';
import CloseBtnImg from '@src/image/Group3384.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';

export type CloseBtnHomeProps = CSSProps & { img?: string };
export const CloseBtnHome: React.FC<CloseBtnHomeProps> = (props: CloseBtnHomeProps) => {
  const { img = CloseBtnImg, css = {}, ...restProps } = props;
  return (
    <Image
      src={img}
      css={{
        marginTop: '-25px',
        w: vw(20),
        h: vw(20),
        opacity: 0.8,
        cursor: 'pointer',
        _hover: { opacity: 1 },
        transition: 'all 200ms',
        ...css,
      }}
      {...restProps}
    />
  );
};
