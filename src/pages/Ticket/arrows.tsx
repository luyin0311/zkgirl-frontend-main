import Icon from '@src/components/Icon';
import classnames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
  useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <div className={classnames('arrow', 'left', { disabled })} onClick={() => scrollPrev()}>
      <Icon name="arrow" />
    </div>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!visibleElements.length && isLastItemVisible);
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <div className={classnames('arrow', 'right', { disabled })} onClick={() => scrollNext()}>
      <Icon name="arrow" />
    </div>
  );
}
