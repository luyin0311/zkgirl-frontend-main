// @ts-nocheck
import { useIsLogined } from '@src/hooks/useIsLogined';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

import { ErrorBoundary } from '../ErrorBoundary';
import NotLogined from '../NotLogined';

export type IPageContentProps = CSSProps;
const PageContent: React.FC<IPageContentProps> = props => {
  const isLogined = useIsLogined();
  return (
    <>
      <ErrorBoundary>{isLogined ? props.children : <NotLogined />}</ErrorBoundary>
    </>
  );
};
export default PageContent;
