import { Chain, Name2CHAIN_MAP, NAME2ID_MAP } from '@c3/chain';
import { baseChainDataById } from '@src/constants/baseChainDataById';
import Binance from '@src/image/binance.png';
import dangerIcon from '@src/image/danger.svg';
import NetworkUnConnectedIcon from '@src/image/network-unconnected.svg';
import Polygon from '@src/image/Polygon.png';
export const clipPath = (pathSize = 15) =>
  `polygon(0 ${pathSize}px,${pathSize}px 0, 100% 0, 100% calc(100% - ${pathSize}px),calc(100% - ${pathSize}px) 100%, 0 100%)`;

type NetworkInfo = {
  name: string;
  icon: string;
  chain: Chain;
  order: number;
};
export const supportedNetworks: { [id: number]: NetworkInfo } = {
  // opBNB
  [NAME2ID_MAP['opbnb_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['opbnb_mainnet']],
    order: 1,
  },
  // Polygon
  [NAME2ID_MAP['matic']]: {
    name: 'Polygon ',
    icon: Polygon,
    chain: Name2CHAIN_MAP['matic'],
    order: 2,
  },
  // BNB Chain
  [NAME2ID_MAP['bnb']]: {
    name: 'BNB Chain',
    icon: Binance,
    chain: Name2CHAIN_MAP['bnb'],
    order: 3,
  },
  // Combo
  [NAME2ID_MAP['combo_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['combo_mainnet']],
    order: 4,
  },

  // Mantle
  [NAME2ID_MAP['mantle_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['mantle_mainnet']],
    order: 5,
  },

  // Linea
  [NAME2ID_MAP['linea_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['linea_mainnet']],
    order: 6,
  },

  // Ethereum
  [NAME2ID_MAP['eth']]: {
    ...baseChainDataById[NAME2ID_MAP['eth']],
    order: 7,
  },
  // Avalanche
  [NAME2ID_MAP['avax']]: {
    ...baseChainDataById[NAME2ID_MAP['avax']],
    order: 8,
  },
  // Fantom
  [NAME2ID_MAP['ftm']]: {
    ...baseChainDataById[NAME2ID_MAP['ftm']],
    order: 9,
  },
  // Optimism
  [NAME2ID_MAP['oeth']]: {
    ...baseChainDataById[NAME2ID_MAP['oeth']],
    order: 10,
  },
  // Arbitrum One
  [NAME2ID_MAP['arb1']]: {
    ...baseChainDataById[NAME2ID_MAP['arb1']],
    order: 11,
  },
  // Arbitrum Nova
  [NAME2ID_MAP['arb-nova']]: {
    ...baseChainDataById[NAME2ID_MAP['arb-nova']],
    order: 12,
  },
  // Moonbeam
  [NAME2ID_MAP['mbeam']]: {
    ...baseChainDataById[NAME2ID_MAP['mbeam']],
    order: 13,
  },
  // Gnosis Chain
  [NAME2ID_MAP['gno']]: {
    ...baseChainDataById[NAME2ID_MAP['gno']],
    order: 14,
  },
  // Metis
  [NAME2ID_MAP['metis-andromeda']]: {
    ...baseChainDataById[NAME2ID_MAP['metis-andromeda']],
    order: 15,
  },
  // Core DAO
  [NAME2ID_MAP['coredao']]: {
    ...baseChainDataById[NAME2ID_MAP['coredao']],
    order: 16,
  },
  // Celo
  [NAME2ID_MAP['CELO']]: {
    ...baseChainDataById[NAME2ID_MAP['CELO']],
    order: 17,
  },
  // Base
  [NAME2ID_MAP['base_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['base_mainnet']],
    order: 18,
  },
  // Manta Pacific Mainnet
  [NAME2ID_MAP['manta_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['manta_mainnet']],
    order: 19,
  },
  // Scroll
  [NAME2ID_MAP['scroll_mainnet']]: {
    ...baseChainDataById[NAME2ID_MAP['scroll_mainnet']],
    order: 20,
  },

  // Ethereum Goerli Testnet
  [NAME2ID_MAP['gor']]: {
    ...baseChainDataById[NAME2ID_MAP['gor']],
    order: 21,
  },
  // BNB Chain Testnet
  [NAME2ID_MAP['bnbt']]: {
    ...baseChainDataById[NAME2ID_MAP['bnbt']],
    order: 22,
  },
  // Polygon Testnet
  [NAME2ID_MAP['maticmum']]: {
    ...baseChainDataById[NAME2ID_MAP['maticmum']],
    order: 23,
  },
  // Avalanche Testnet
  [NAME2ID_MAP['Fuji']]: {
    ...baseChainDataById[NAME2ID_MAP['Fuji']],
    order: 24,
  },
  // Fantom Testnet
  [NAME2ID_MAP['tftm']]: {
    ...baseChainDataById[NAME2ID_MAP['tftm']],
    order: 25,
  },
  // Optimism Testnet
  [NAME2ID_MAP['ogor']]: {
    ...baseChainDataById[NAME2ID_MAP['ogor']],
    order: 26,
  },
  // Arbitrum Testnet
  [NAME2ID_MAP['arb-goerli']]: {
    ...baseChainDataById[NAME2ID_MAP['arb-goerli']],
    order: 27,
  },
  // Moonbase Alpha Testnet
  [NAME2ID_MAP['mbase']]: {
    ...baseChainDataById[NAME2ID_MAP['mbase']],
    order: 28,
  },
  // Evmos Testnet
  [NAME2ID_MAP['evmos-testnet']]: {
    ...baseChainDataById[NAME2ID_MAP['evmos-testnet']],
    order: 29,
  },
  // Combo Testnet
  [NAME2ID_MAP['combo_testnet']]: {
    ...baseChainDataById[NAME2ID_MAP['combo_testnet']],
    order: 30,
  },
  // Linea Testnet
  [NAME2ID_MAP['linea_testnet']]: {
    ...baseChainDataById[NAME2ID_MAP['linea_testnet']],
    order: 31,
  },
  // opBNB Testnet
  [NAME2ID_MAP['opbnb_testnet']]: {
    ...baseChainDataById[NAME2ID_MAP['opbnb_testnet']],
    order: 32,
  },
  // Taiko Jólnir Alpha-5 Testnet
  [NAME2ID_MAP['taiko_a5_testnet']]: {
    ...baseChainDataById[NAME2ID_MAP['taiko_a5_testnet']],
    order: 33,
  },
  // Manta Pacific Testnet
  [NAME2ID_MAP['manta_testnet']]: {
    ...baseChainDataById[NAME2ID_MAP['manta_testnet']],
    order: 34,
  },
};
export const supportedNetworksSorted = Object.values(supportedNetworks).sort((x, y) => x.order - y.order);
export const NetworkUnconnected = 'Network Unconnected';
export const UnknownNetwork = 'Switch network';

export type NetworkStatus = typeof NetworkUnconnected | typeof UnknownNetwork;

export const networkStatusIcon: { [k in NetworkStatus]: string } = {
  [NetworkUnconnected]: NetworkUnConnectedIcon,
  [UnknownNetwork]: dangerIcon,
};
