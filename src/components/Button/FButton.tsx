import { Button as ___Button, Text, useButton } from '@unstyled-ui/atomic';
import { styled } from '@unstyled-ui/core';

export const FButton = styled(___Button, {
  variants: {
    type: {
      outline_hl: {
        border: '1px solid #0CFFD3',
        color: '#0CFFD3',
        _hover: {
          color: '#0CFFD3',
        },
      },
      fill_hl: {
        color: 'black',
        _hover: {
          color: 'black',
        },
        background: 'linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)',
      },
      outline_gray: {
        border: '1px solid rgba(255,255,255,0.3)',
        color: 'white',
      },
    },
    round: {
      true: {
        borderRadius: '999px',
      },
    },
  },
});
