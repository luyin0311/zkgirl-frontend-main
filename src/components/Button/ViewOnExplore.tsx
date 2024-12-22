import { RawChainType } from '@c3/chain';
import { getTxExplorerByChainId } from '@src/common/getTxExporer';
import { CSSProps } from '@unstyled-ui/core';
import React from 'react';

export type ViewOnExplorerProps = {
  chainId: RawChainType['chainId'];
  redeemTxId: string;
  explorer?: string;
  title?: string;
} & CSSProps;
const ViewOnExplorer: React.FC<ViewOnExplorerProps> = props => {
  const { chainId, redeemTxId, css = {}, explorer, title = 'View on explorer' } = props;
  const url = explorer || getTxExplorerByChainId(chainId, redeemTxId);
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div>
        <span>{title}</span>
      </div>
    </a>
  );
};

export default ViewOnExplorer;
