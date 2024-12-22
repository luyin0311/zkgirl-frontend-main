import { vw } from '@src/common/rw';
import { Button as _Button } from '@unstyled-ui/atomic';
import { styled } from '@unstyled-ui/core';
import { flexCenter } from '@unstyled-ui/css';

export const Button = styled(_Button, {
  // w: vw(112),
  h: vw(44),
  borderRadius: vw(48),
  fontSize: vw(16),
  fontWeight: 600,
  lineHeight: 1,
  border: '1px solid #FFFFFF',
  color: 'white',
  background: 'black',
  ...flexCenter,
});
