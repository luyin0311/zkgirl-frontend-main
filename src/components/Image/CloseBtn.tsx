import { vw } from '@src/common/rw';
import CloseBtnImg from '@src/image/close-btn.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';

export type CloseBtnProps = CSSProps & { img?: string };
export const CloseBtn: React.FC<CloseBtnProps> = (props: CloseBtnProps) => {
  const { img = CloseBtnImg, css = {}, ...restProps } = props;
  return (
    <Image
      src={img}
      css={{
        w: vw(20),
        h: vw(20),
        cursor: 'pointer',
        _hover: { opacity: 0.8 },
        transition: 'all 300ms',
        ...css,
      }}
      {...restProps}
    />
  );
};
