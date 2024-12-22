import { copyToClipBoard } from '@src/common/copy-to-clipboard';
import { vw } from '@src/common/rw';
import CopyImg from '@src/image/copy.svg';
import GrayCopyImg from '@src/image/copy-icon.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';

export type CopyProps = {
  content: string;
  isGray?: boolean;
} & CSSProps;
export const CopyButton: React.FC<CopyProps> = (props: CopyProps) => {
  const { isGray = false, content, css = {}, ...restProps } = props;
  return (
    <Image
      src={isGray ? GrayCopyImg : CopyImg}
      css={{
        w: vw(20),
        h: vw(20),
        cursor: 'pointer',
        _hover: { opacity: 0.8 },
        ...css,
      }}
      {...restProps}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        copyToClipBoard(content);
      }}
    />
  );
};
