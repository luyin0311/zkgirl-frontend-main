import { Chain } from '@c3/chain';
import { ContractAddress } from '@src/common/type';
import { BaseListItemType } from '@unstyled-ui/layout';

// the chain will be used in the NFTBridge
export type NetMode = 'mainnet' | 'testnet';
export type ShowInNetMode = NetMode | 'both';

export type BaseChainDataItemType = {
  name: string;
  chain: Chain;
  icon: string;
  nativeNetMode: NetMode;
  appId: number;
  id: string;
  txExplorer?: string;
  lazyerZeroChainId: number;
};

//TODO:使用extends，把BaseListItemType展开
export type NFTBridgeChainItemType = {
  // address: ContractAddress; //contract address
  estimateFinalTime?: string;
  order: number;
  confirmBlockNumber?: number;
  showInNetMode: ShowInNetMode;
} & BaseListItemType &
  BaseChainDataItemType;

export interface NFTBridgeSenderChainItemType extends NFTBridgeChainItemType {
  address: {
    l0: { erc721: ContractAddress | ''; erc1155: ContractAddress | '' };
    //发送链配置的是NFTbridge地址，接收链配置的zkbridge的合约地址
    zk: { erc721: ContractAddress | ''; erc1155: ContractAddress | '' };
  };
}
export interface NFTBridgeReceiveChainItemType extends NFTBridgeChainItemType {
  //===========================================================  //
  //1.L0Bridge:不claim。没有第4步。所以不需要receive合约地址。（TODO:实际上接收链L0合约地址和发送链L0合约地址相同，再计算getL0AdaptePara会用到。）
  //2.zkBridge:不区分721还是1155，无论是721还是1155都是一个地址
  //===========================================================
  zkAddress: ContractAddress;
}
