import './index.less';

import Icon from '@src/components/Icon';
import useWindowSize from '@src/hooks/useWindowSize';
import classnames from 'classnames';
import React, { useState } from 'react';

export type IProps = {
  className?: string;
  isShowClose?: boolean;
};

const Comp: React.FC<IProps> = props => {
  const { isMobile } = useWindowSize();
  const [close, setClose] = useState(false);

  return !close ? (
    <div className={classnames('mintBanner', props.className)}>
      <div>
        {isMobile && props.isShowClose ? <Icon name="Close_XL" onClick={() => setClose(true)} /> : null}
        Join OKX Web3 Wallet Cryptopedia Season 11 to claim <em>$500,000 ZKB</em> token rewards!
      </div>
    </div>
  ) : null;
};

export default Comp;
