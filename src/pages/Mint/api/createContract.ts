import { createContract } from '@c3/crypto';
import { ethers } from 'ethers';

import {
  Erc1155MulticallABI,
  freeTicketABI,
  LegendFactoryABI,
  LegendFactoryV2ABI,
  PartnerTicketABI,
  PartnerTicketFactoryABI,
  PartnerTicketRealTimeFactoryABI,
  ticketABI,
} from '../abi';

export const createFreeTicketContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, freeTicketABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};

export const createTicketContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, ticketABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};

export const createPartnerTicketContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, PartnerTicketABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};

export const createPartnerTicketFactoryContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, PartnerTicketFactoryABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};

export const createPartnerTicketRealTimeFactoryContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, PartnerTicketRealTimeFactoryABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};

export const createLegendFactoryContract = (provider: ethers.providers.Web3Provider, contractAddress: string, pid: null | number) => {
  const r = createContract(contractAddress, pid ? LegendFactoryV2ABI : LegendFactoryABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};

export const createMulticallContract = (provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider, contractAddress: string) => {
  const r = createContract(contractAddress, Erc1155MulticallABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};
