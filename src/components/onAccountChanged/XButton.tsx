import { Fn } from '@c3/types';
import { drRw375 } from '@src/common/rw';
import LoadingIcon from '@src/components/Loading/LoadingIcon';
import { Button, useButton } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
const TOP = 296;

const btnStyle = (color: string) => ({
  w: drRw375(283, 392),
  h: drRw375(50),
  border: `1px solid ${color}`,
  borderRadius: drRw375(80),
  typo: {
    fontSize: drRw375(18),
    fontWeight: 600,
    lineHeight: 1,
  },
});
export type XButtonProps = {
  onClick?: Fn;
} & CSSProps;
export const XButton: React.FC<XButtonProps> = props => {
  const { onClick, css = {}, ...restProps } = props;
  const btn = useButton(
    <Button
      loadingIcon={<LoadingIcon />}
      shape="round"
      css={{
        ...btnStyle('#0CFFF0'),
        color: '#0CFFF0',
        gap: drRw375(12),
        // ...abs({ top: drRw375(TOP), left: drRw375(268) }),
        ...css,
      }}
      onClick={onClick}
      {...restProps}
    ></Button>,
    { useLoading: true }
  );
  return btn;
};
