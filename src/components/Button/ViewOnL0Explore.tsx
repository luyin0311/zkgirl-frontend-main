import { RawChainType } from '@c3/chain';
import { CSSProps } from '@unstyled-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { getL0ScanExplorer } from './getL0ScanExplorer';

export type ViewOnExplorerProps = {
  chainId: RawChainType['chainId'];
  hash: string;
  isLink?: boolean;
  text?: string;
} & CSSProps;

const ViewOnL0Explorer: React.FC<ViewOnExplorerProps> = props => {
  const { hash, isLink, text = 'View on LayerZero Scan', chainId, css = {} } = props;
  const [url, setUrl] = useState('');
  const fetchUrl = useCallback(async () => {
    setUrl(await getL0ScanExplorer(chainId as RawChainType['chainId'], hash));
  }, [chainId, hash]);

  useEffect(() => {
    if (hash) {
      fetchUrl();
    }
  }, [hash, fetchUrl]);

  return isLink ? (
    <a href={url} target="_blank" rel="noreferrer">
      <div>
        <span>{text}</span>
      </div>
    </a>
  ) : (
    <a href={url} target="_blank" rel="noreferrer">
      <div>
        <span>{text}</span>
      </div>
    </a>
  );
};

export default ViewOnL0Explorer;
