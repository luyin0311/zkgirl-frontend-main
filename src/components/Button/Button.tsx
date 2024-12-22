import { useHover } from '@c3/react';
import { vw } from '@src/common/rw';
import { Button as ___Button, Text, useButton } from '@unstyled-ui/atomic';
import { CSSProps, styled } from '@unstyled-ui/core';

import LoadingIcon from './LoadingIcon';

export type ButtonProps = {
  disabled?: boolean;
} & CSSProps;

const __Button = styled(___Button, {
  variants: {
    variant: {
      outline: {
        border: '1px solid #0CFFD3',
      },
    },
  },
});

const _Button: React.FC<ButtonProps> = props => {
  const { disabled, children, css = {}, ...restProps } = props;
  const { hovered, ...events } = useHover();

  return (
    <__Button
      disabled={!!disabled}
      loadingIcon={<LoadingIcon />}
      {...events}
      css={{
        w: vw(320, 260),
        minH: vw(40, 50),
        border: 'none',
        borderRadius: vw(40),
        background: disabled ? 'rgba(255, 255, 255, 0.05)' : 'linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)',
        _after: {
          w: '100%',
          h: '100%',
          background: hovered ? 'black' : 'transparent',
          opacity: hovered ? 0.1 : 0,
          transition: 'opacity 0.2s',
        },
        ...css,
      }}
      {...restProps}
    >
      <Text
        css={{
          typo: {
            fontSize: vw(14, 16),
            fontWeight: 600,
            letterSpacing: '0.05em',
          },
          color: disabled ? 'rgba(255, 255, 255, 0.3)' : 'black ',
        }}
      >
        {children}
      </Text>
    </__Button>
  );
};

export const Button: React.FC<CSSProps & ButtonProps> = props => {
  return useButton(<_Button {...props} />, { useLoading: true });
};
