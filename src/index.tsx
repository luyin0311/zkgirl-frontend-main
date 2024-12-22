import './common/console';
import 'normalize.css';
import 'virtual:svg-icons-register';

import { WalletName, Web3Provider } from '@c3/crypto';
import { Buffer } from 'buffer';
import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';

import App from './App';
import { GlobalContextProvider } from './context/GlobalContext';

//FIX Buffer is not defined
//@ts-ignore
window.Buffer = Buffer;

//@ts-ignore
window.__build_version = __buildVersion;

const walletName = localStorage.getItem('walletName') as WalletName;
const root = createRoot(document.getElementById('root')!);

//@ts-ignore
window.__root = root._internalRoot;

root.render(
  // <React.StrictMode>
  <Web3Provider value={walletName}>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </Web3Provider>
  // </React.StrictMode>
);
