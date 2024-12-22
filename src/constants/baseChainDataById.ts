import { Name2CHAIN_MAP, NAME2ID_MAP, RawChainType } from '@c3/chain';
import { BaseChainDataItemType } from '@src/components/ChainSelector/type';
import ArbitrumOne from '@src/image/arbitrum.png';
import ArbitrumNova from '@src/image/arbitrum-nova.svg';
import Avalanche from '@src/image/Avalanche.png';
import Binance from '@src/image/binance.png';
import Celo from '@src/image/celo.png';
import Base from '@src/image/chain-base.png';
import KlaytnCrypress from '@src/image/chain-klaytn.png';
import Manta from '@src/image/chain-manta.png';
import Oasis from '@src/image/chain-Oasis-Network.png';
import Scroll from '@src/image/chain-scroll.png';
import Combo from '@src/image/combo.png';
import CoreDao from '@src/image/core-dao-chain.png';
import Ethernet from '@src/image/ethernet.png';
import Evmos from '@src/image/Evmos.png';
import Fantom from '@src/image/Fantom.png';
import Gnosis from '@src/image/gnosis.svg';
import Linea from '@src/image/linea.png';
import Mantle from '@src/image/mantle.png';
import Metis from '@src/image/metis.svg';
import Moonbeam from '@src/image/Moonbeam.png';
import OPBNB from '@src/image/opbnb-logo.png';
import Optimism from '@src/image/optimism.png';
import Polygon from '@src/image/Polygon.png';
import Taiko from '@src/image/taiko-logo.png';
import zkSync from '@src/image/zksync-era.png';

export const baseChainDataById = {
  //=====================================================================================================
  // eth
  //=====================================================================================================
  [NAME2ID_MAP.eth]: {
    name: 'Ethereum',
    chain: Name2CHAIN_MAP['eth'],
    icon: Ethernet,
    nativeNetMode: 'mainnet',
    appId: 2,
    lazyerZeroChainId: 101,
    id: 'eth',
  },
  [NAME2ID_MAP.gor]: {
    name: 'Ethereum Goerli Testnet',
    chain: Name2CHAIN_MAP['gor'],
    icon: Ethernet,
    nativeNetMode: 'testnet',
    appId: 102,
    id: 'gor',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP.sep]: {
    name: 'Ethereum Sepolia Testnet ',
    chain: Name2CHAIN_MAP['sep'],
    icon: Ethernet,
    nativeNetMode: 'testnet',
    appId: 119,
    id: 'sep',
    lazyerZeroChainId: -1,
  },
  //=====================================================================================================
  // BNB
  //=====================================================================================================
  [NAME2ID_MAP.bnbt]: {
    name: 'BNB Chain Testnet',
    chain: {
      ...Name2CHAIN_MAP['bnbt'],
      rpcUrls: ['https://bsc-testnet.publicnode.com'],
    },
    icon: Binance,
    nativeNetMode: 'testnet',
    appId: 103,
    id: 'bnbt',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP.bnb]: {
    name: 'BNB Chain',
    chain: Name2CHAIN_MAP['bnb'],
    icon: Binance,
    nativeNetMode: 'mainnet',
    appId: 3,
    id: 'bnb',
    lazyerZeroChainId: 102,
  },
  //=====================================================================================================
  // Polygon
  //=====================================================================================================
  [NAME2ID_MAP.maticmum]: {
    name: 'Polygon Testnet',
    chain: { ...Name2CHAIN_MAP['maticmum'], rpcUrls: ['https://rpc-mumbai.maticvigil.com'] },
    icon: Polygon,
    nativeNetMode: 'testnet',
    appId: 104,
    id: 'maticmum',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP.matic]: {
    name: 'Polygon',
    chain: {
      ...Name2CHAIN_MAP['matic'],
      rpcUrls: ['https://polygon-bor.publicnode.com'],
    },
    icon: Polygon,
    nativeNetMode: 'mainnet',
    appId: 4,
    id: 'matic',
    lazyerZeroChainId: 109,
  },

  //=====================================================================================================
  // Avalanche
  //=====================================================================================================
  [NAME2ID_MAP.Fuji]: {
    name: 'Avalanche Testnet',
    chain: Name2CHAIN_MAP['Fuji'],
    icon: Avalanche,
    nativeNetMode: 'testnet',
    appId: 105,
    id: 'Fuji',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP.avax]: {
    name: 'Avalanche',
    chain: Name2CHAIN_MAP['avax'],
    icon: Avalanche,
    nativeNetMode: 'mainnet',
    appId: 5,
    id: 'avax',
    lazyerZeroChainId: 106,
  },
  //=====================================================================================================
  // Fantom
  //=====================================================================================================
  [NAME2ID_MAP.tftm]: {
    name: 'Fantom Testnet',
    chain: Name2CHAIN_MAP['tftm'],
    icon: Fantom,
    nativeNetMode: 'testnet',
    appId: 106,
    id: 'tftm',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP.ftm]: {
    name: 'Fantom',
    chain: Name2CHAIN_MAP['ftm'],
    icon: Fantom,
    nativeNetMode: 'mainnet',
    appId: 6,
    id: 'ftm',
    lazyerZeroChainId: 112,
  },
  //=====================================================================================================
  //Optimism
  //=====================================================================================================
  [NAME2ID_MAP.ogor]: {
    name: 'Optimism Testnet',
    chain: Name2CHAIN_MAP['ogor'],
    icon: Optimism,
    nativeNetMode: 'testnet',
    appId: 107,
    id: 'ogor',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP.oeth]: {
    name: 'Optimism',
    chain: Name2CHAIN_MAP['oeth'],
    icon: Optimism,
    nativeNetMode: 'mainnet',
    appId: 7,
    lazyerZeroChainId: 111,
    id: 'oeth',
  },
  //=====================================================================================================
  //Arbitrum
  //=====================================================================================================
  //Arbitrum Goerli Testnet
  [NAME2ID_MAP['arb-goerli']]: {
    name: 'Arbitrum Testnet',
    chain: Name2CHAIN_MAP['arb-goerli'],
    icon: ArbitrumOne,
    nativeNetMode: 'testnet',
    appId: 108,
    id: 'arb-goerli',
    lazyerZeroChainId: -1,
  },
  //Arbitrum One  Mainnet
  [NAME2ID_MAP['arb1']]: {
    name: 'Arbitrum One',
    chain: Name2CHAIN_MAP['arb1'],
    icon: ArbitrumOne,
    nativeNetMode: 'mainnet',
    appId: 8,
    id: 'arb1',
    lazyerZeroChainId: 110,
  },
  //Arbitrum Nova Mainnet
  [NAME2ID_MAP['arb-nova']]: {
    name: 'Arbitrum Nova',
    chain: Name2CHAIN_MAP['arb-nova'],
    icon: ArbitrumNova,
    nativeNetMode: 'mainnet',
    appId: 14,
    id: 'arb-nova',
    lazyerZeroChainId: 175,
  },
  //=====================================================================================================
  // Moonbeam
  //=====================================================================================================
  [NAME2ID_MAP['mbase']]: {
    name: 'Moonbase Alpha Testnet',
    chain: Name2CHAIN_MAP['mbase'],
    icon: Moonbeam,
    nativeNetMode: 'testnet',
    appId: 109,
    id: 'mbase',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP['mbeam']]: {
    name: 'Moonbeam',
    chain: Name2CHAIN_MAP['mbeam'],
    icon: Moonbeam,
    nativeNetMode: 'mainnet',
    appId: 9,
    id: 'mbeam',
    lazyerZeroChainId: 126,
  },
  //=====================================================================================================
  // Evmos
  //=====================================================================================================
  [NAME2ID_MAP['evmos-testnet']]: {
    name: 'Evmos Testnet',
    chain: Name2CHAIN_MAP['evmos-testnet'],
    icon: Evmos,
    nativeNetMode: 'testnet',
    appId: 100,
    id: 'evmos-testnet',
    lazyerZeroChainId: -1,
  },
  //=====================================================================================================
  // Oasis
  //=====================================================================================================
  [NAME2ID_MAP['emerald']]: {
    name: 'Oasis Testnet',
    chain: Name2CHAIN_MAP['emerald'],
    icon: Oasis,
    nativeNetMode: 'testnet',
    appId: 111,
    id: 'emerald',
    lazyerZeroChainId: -1,
  },
  //=====================================================================================================
  // Gnosis
  //=====================================================================================================
  [NAME2ID_MAP['gno']]: {
    name: 'Gnosis Chain',
    chain: Name2CHAIN_MAP['gno'],
    icon: Gnosis,
    nativeNetMode: 'mainnet',
    appId: 12,
    id: 'gno',
    lazyerZeroChainId: 145,
  },
  [NAME2ID_MAP['gnosis_testnet']]: {
    name: 'Gnosis Chain Testnet',
    chain: Name2CHAIN_MAP['gnosis_testnet'],
    icon: Gnosis,
    nativeNetMode: 'testnet',
    appId: 112,
    id: 'gnosis_testnet',
    lazyerZeroChainId: -1,
  },
  //=====================================================================================================
  // Metis
  //=====================================================================================================
  [NAME2ID_MAP['metis-andromeda']]: {
    name: 'Metis',
    chain: Name2CHAIN_MAP['metis-andromeda'],
    icon: Metis,
    nativeNetMode: 'mainnet',
    appId: 13,
    id: 'metis-andromeda',
    lazyerZeroChainId: 151,
  },
  [NAME2ID_MAP['metis_testnet']]: {
    name: 'Metis Testnet',
    chain: Name2CHAIN_MAP['metis_testnet'],
    icon: Metis,
    nativeNetMode: 'testnet',
    appId: 113,
    id: 'metis_testnet',
    lazyerZeroChainId: -1,
  },
  //=====================================================================================================
  // combo testnet
  //=====================================================================================================
  [NAME2ID_MAP['combo_testnet']]: {
    name: 'Combo Network',
    chain: Name2CHAIN_MAP['combo_testnet'],
    icon: Combo,
    nativeNetMode: 'testnet', //实际上测试网，但是显示为主网
    appId: 114,
    id: 'combo_testnet',
    lazyerZeroChainId: -1,
  },
  //=====================================================================================================
  // linea
  //=====================================================================================================
  [NAME2ID_MAP['linea_testnet']]: {
    chain: {
      ...Name2CHAIN_MAP['linea_testnet'],
      blockExplorerUrls: ['https://goerli.lineascan.build/'],
    },
    name: 'Linea Testnet',
    icon: Linea,
    nativeNetMode: 'testnet', // 实际上测试网，但是显示为主网
    appId: 115,
    id: 'linea_testnet',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP['linea_mainnet']]: {
    chain: {
      ...Name2CHAIN_MAP['linea_mainnet'],
    },
    name: 'Linea',
    icon: Linea,
    nativeNetMode: 'mainnet',
    appId: 19,
    id: 'linea_mainnet',
    lazyerZeroChainId: -1,
  },

  //=====================================================================================================
  // zksync era
  //=====================================================================================================
  //mainnet
  [NAME2ID_MAP['zksync_era_mainnet']]: {
    chain: Name2CHAIN_MAP['zksync_era_mainnet'],
    name: 'zkSync Era',
    icon: zkSync,
    nativeNetMode: 'mainnet',
    appId: 15,
    id: 'zksync_era_mainnet',
    lazyerZeroChainId: 165,
  },
  //===========================================================
  // opBnb testnet
  //===========================================================
  [NAME2ID_MAP['opbnb_testnet']]: {
    name: 'opBNB Testnet',
    chain: Name2CHAIN_MAP['opbnb_testnet'],
    icon: OPBNB,
    nativeNetMode: 'testnet', //实际上测试网，但是显示为主网
    appId: 116,
    id: 'opbnb_testnet',
    lazyerZeroChainId: -1,
  },
  //===========================================================
  // CoreDao mainnet
  //===========================================================
  [NAME2ID_MAP['coredao']]: {
    name: 'Core DAO',
    chain: Name2CHAIN_MAP['coredao'],
    icon: CoreDao,
    nativeNetMode: 'mainnet',
    appId: 17,
    id: 'coredao',
    lazyerZeroChainId: 153,
  },
  //===========================================================
  // Celo
  //===========================================================
  //mainnent
  [NAME2ID_MAP['CELO']]: {
    name: 'Celo',
    chain: Name2CHAIN_MAP['CELO'],
    icon: Celo,
    nativeNetMode: 'mainnet',
    appId: 18,
    id: 'celo',
    lazyerZeroChainId: 125,
  },
  //===========================================================
  // mantle mainnet
  //===========================================================
  [NAME2ID_MAP['mantle_mainnet']]: {
    name: 'Mantle',
    chain: Name2CHAIN_MAP['mantle_mainnet'],
    icon: Mantle,
    nativeNetMode: 'mainnet',
    appId: 20,
    id: 'mantle_mainnet',
    lazyerZeroChainId: 181,
  },

  //===========================================================
  // Taiko
  //===========================================================
  [NAME2ID_MAP['taiko_a5_testnet']]: {
    name: 'Taiko Jólnir Alpha-5 Testnet',
    chain: Name2CHAIN_MAP['taiko_a5_testnet'],
    icon: Taiko,
    nativeNetMode: 'testnet',
    appId: 117,
    id: 'taiko_a5_testnet',
    lazyerZeroChainId: -1,
  },

  //===========================================================
  // scroll
  //===========================================================
  [NAME2ID_MAP['scroll_testnet']]: {
    name: 'Scroll Alpha',
    chain: Name2CHAIN_MAP['scroll_testnet'],
    icon: Scroll,
    nativeNetMode: 'testnet',
    appId: 120,
    id: 'scroll_testnet',
    lazyerZeroChainId: -1,
  },

  //===========================================================
  // Manta
  //===========================================================
  [NAME2ID_MAP['manta_testnet']]: {
    name: 'Manta Pacific Testnet',
    chain: Name2CHAIN_MAP['manta_testnet'],
    icon: Manta,
    nativeNetMode: 'testnet',
    appId: 121,
    id: 'manta_testnet',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP['manta_mainnet']]: {
    name: 'Manta Pacific Mainnet',
    chain: Name2CHAIN_MAP['manta_mainnet'],
    icon: Manta,
    nativeNetMode: 'mainnet',
    appId: 24,
    id: 'manta_mainnet',
    lazyerZeroChainId: -1,
  },

  //===========================================================
  // Base mainnet
  //===========================================================
  [NAME2ID_MAP['base_mainnet']]: {
    name: 'Base',
    chain: Name2CHAIN_MAP['base_mainnet'],
    icon: Base,
    nativeNetMode: 'mainnet',
    appId: 22,
    id: 'base_mainnet',
    lazyerZeroChainId: 184,
  },

  //===========================================================
  // OpBnb mainnet
  //===========================================================
  [NAME2ID_MAP['opbnb_mainnet']]: {
    name: 'opBNB Mainnet',
    chain: Name2CHAIN_MAP['opbnb_mainnet'],
    icon: OPBNB,
    nativeNetMode: 'mainnet',
    appId: 23,
    id: 'opbnb_mainnet',
    lazyerZeroChainId: -1,
  },
  [NAME2ID_MAP['Cypress']]: {
    name: 'Klaytn',
    chain: Name2CHAIN_MAP['Cypress'],
    icon: KlaytnCrypress,
    nativeNetMode: 'mainnet',
    appId: 25,
    id: 'Cypress',
    lazyerZeroChainId: -1,
  },
  //===========================================================
  // combo mainnet
  //===========================================================
  [NAME2ID_MAP['combo_mainnet']]: {
    name: 'Combo',
    chain: Name2CHAIN_MAP['combo_mainnet'],
    icon: Combo,
    nativeNetMode: 'mainnet',
    appId: 27,
    id: 'combo_mainnet',
    lazyerZeroChainId: -1,
  },

  //===========================================================
  // scroll
  //===========================================================
  [NAME2ID_MAP['scroll_mainnet']]: {
    name: 'Scroll',
    chain: Name2CHAIN_MAP['scroll_mainnet'],
    icon: Scroll,
    nativeNetMode: 'mainnet',
    appId: 26,
    id: 'scroll_mainnet',
    lazyerZeroChainId: -1,
  },

  //=====================================================================================================
  // Evmos
  //=====================================================================================================
  [NAME2ID_MAP['evmos-testnet']]: {
    name: 'Evmos Testnet',
    chain: Name2CHAIN_MAP['evmos-testnet'],
    icon: Evmos,
    nativeNetMode: 'testnet',
    appId: 100,
    id: 'evmos-testnet',
    lazyerZeroChainId: -1,
  },
} as const satisfies { [chainId: number]: BaseChainDataItemType };

export type BaseChainIds = keyof typeof baseChainDataById;
export type AllChainIds = RawChainType['chainId'];
//@ts-ignore
window.__baseChainDataById = baseChainDataById;

export const getChainByAppId = (appId: number): BaseChainDataItemType | undefined => {
  const chain = Object.values(baseChainDataById).find(chain => chain.appId === appId);
  return chain;
};

export const getChainByChainId = (chainId: number) => {
  const chain = Object.values(baseChainDataById).find(chain => chain.chain.chainId === chainId);
  return chain;
};
export type AllChainName = RawChainType['shortName'];
export type AllChainId = RawChainType['chainId'];
export type BaseChainId = keyof typeof baseChainDataById;
