import { RCSS } from '@unstyled-ui/core';

export const button = (css: RCSS = {}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&[disabled]': {
    cursor: 'not-allowed',
  },
  ...css,
});
