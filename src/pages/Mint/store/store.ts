import { defaultNetwork, ticket } from '@src/config';
import { produce } from 'immer';
import create from 'zustand';

export type IBalance = {
  state: {
    expchain: { [k: string]: number };
    // matic: { [k: string]: number; },
    // BSCPanda: { [k: string]: number; },
    // maticPanda: { [k: string]: number; },
    refresh: boolean;
    network: 'expchain';
    // network: 'expchain' | 'matic'
    poolActive: {
      expchain: number;
      // matic: number
    };
    showNavBar: boolean;
  };
  action: {
    update: (state: Partial<IBalance['state']>) => void;
    updateNetwork: (state: Partial<IBalance['state']['network']>) => void;
    // updatePoolActive: (type: 'expchain' | 'matic', value: number) => void;
    updatePoolActive: (type: 'expchain', value: number) => void;
  };
};

const defaultStates: IBalance['state'] = {
  expchain: Object.fromEntries(Object.keys(ticket.expchain).map((item: string) => [item, 0])),
  // matic: Object.fromEntries(Object.keys(ticket.matic).map((item: string) => [item, 0])),
  // BSCPanda: Object.fromEntries(Object.keys(pandaAddress.expchain).map((item: string) => [item, 0])),
  // maticPanda: Object.fromEntries(Object.keys(pandaAddress.matic).map((item: string) => [item, 0])),
  refresh: true,
  // network: (localStorage.getItem('network') as Partial<IBalance['state']['network']> | null) || defaultNetwork,
  network: defaultNetwork,
  poolActive: {
    expchain: 0,
    // matic: 0
  },
  showNavBar: true,
};

export const useBalanceStore = create<IBalance>(set => ({
  state: defaultStates,
  action: {
    update: (state: Partial<IBalance['state']>) =>
      set(
        produce(draft => {
          draft.state = { ...draft.state, ...state };
        })
      ),
    updateNetwork: (state: Partial<IBalance['state']['network']>) =>
      set(
        produce(draft => {
          draft.state.network = state;
          localStorage.setItem('network', state);
        })
      ),
    updatePoolActive: (type, value) =>
      set(
        produce(draft => {
          draft.state.poolActive[type] = value;
        })
      ),
  },
}));
