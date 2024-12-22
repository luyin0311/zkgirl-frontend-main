import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

import { Button } from './Button';

export type NextButtonProps = CSSProps & JSX.IntrinsicElements['button'];
const NextButton: React.FC<NextButtonProps> = props => {
  const { children, onClick, ...restProps } = props;

  return (
    <Button
      onClick={async (e: any) => {
        onClick && (await onClick(e));
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
};
export default NextButton;
