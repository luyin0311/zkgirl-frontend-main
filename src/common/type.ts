import { AllChainName } from '@src/constants/baseChainDataById';

// export type ContractAddress = `0x${string & { length: 4 }}`;
export type ContractAddress = `0x${string}`;

export type ErcType = 'erc721' | 'erc1155';
export type BridgeType = 'l0' | 'zk';

export type TokenIdentity = {
  [chainName in AllChainName]?: ContractAddress[];
};

export type NFTMetaData = {
  name: string;
  image: string;
  description: string;
  animation_url?: string;
  attributes: Record<string, string | number>[];
  // hobbies: string;
  // level: string;
  extraData?: Record<string, any>;
};

export type CollieCSSProps = {
  css?: any;
  className?: string;
};
