import { LoadingOutlined } from '@ant-design/icons';
import { Atomic } from '@unstyled-ui/atomic';
import { CSSProps, memoF, useStitches } from '@unstyled-ui/core';
import { rgap } from '@unstyled-ui/css';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';

import { button } from './utils';

export type ButtonProps = {
  loading?: boolean;
  loadingIcon?: JSX.Element;
  preventDefault?: boolean;
  debounce?: number | boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  CSSProps;

export const Button = memoF<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { styled } = useStitches();
  const { preventDefault, onClick, loading, loadingIcon, children, disabled, debounce: _debounce = 400, ...restProps } = props;
  const debounce: number = typeof _debounce === 'boolean' ? (_debounce ? 400 : 0) : _debounce;

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (preventDefault) {
        e.preventDefault();
      }
      if (loading) {
        return;
      }
      await onClick?.(e);
    },
    [loading, onClick, preventDefault]
  );
  const _Button = useMemo(
    () =>
      styled(Atomic, {
        ...(loading ? rgap('0.5em') : {}),
        ...button(),
      }),
    [loading, styled]
  );

  const DebouncedClick = useMemo(
    () =>
      debounce > 0
        ? _.debounce(handleClick, debounce, {
            leading: true,
            trailing: false,
          })
        : handleClick,
    [debounce, handleClick]
  );

  return (
    <_Button as="button" ref={ref} onClick={DebouncedClick} disabled={disabled || loading} {...restProps}>
      <div>
        {loading && (loadingIcon || <LoadingOutlined className="loading-icon" />)}
        {children}
      </div>
    </_Button>
  );
});
