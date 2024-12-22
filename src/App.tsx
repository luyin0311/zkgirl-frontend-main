import './app.css';
import './global.less';

import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { LoadingIcon } from './components/Loading/flowerLoading';
import { MessageModal } from './components/Message';
import { useOnMyAccountChanged } from './components/onAccountChanged';
import ScrollToTop from './components/ScrollToTop';
import { LoginModal } from './components/useLoginModal';
import { urlPath } from './constants/urlPath';
import { useConnectWalletModal } from './hooks/useConnectWalletModal';
import { useIsLogined } from './hooks/useIsLogined';
import { useGlobalStore } from './store/globalStore';

//@ts-ignore
window.__ethers = ethers;

const Home = React.lazy(() => import('./pages/Home'));
const Mint = React.lazy(() => import('./pages/Mint'));
const Ticket = React.lazy(() => import('./pages/Ticket'));
// const PageNotFound = React.lazy(() => import('./pages/404'));
const Tos = React.lazy(() => import('./pages/pdfViewer'));
const Reward = React.lazy(() => import('./pages/Reward'));

const RouteMap = [
  { path: urlPath.mint, comp: Mint },
  { path: urlPath.ticket, comp: Ticket },
  { path: urlPath.tos, comp: Tos },
  { path: urlPath.reward, comp: Reward },
];

const Wrapper = () => {
  //useConnectWalletModal只用在域名登录中
  const [connectWalletModal, showConnectWalletModal, hideConnectWalletModal] = useConnectWalletModal();

  const [loginModalWhenAccountChanged] = useOnMyAccountChanged();
  const isLogined = useIsLogined();

  // const [loginModal, loginModalOn, loginModalOff, visible] = useLoginModal();
  const { state, action } = useGlobalStore(s => s);
  // //loginModal
  // useEffect(() => {
  //   if (state.showLoginModal && !isLogined) {
  //     loginModalOn();
  //   } else if (!state.showLoginModal) {
  //     loginModalOff();
  //   }
  // }, [isLogined, loginModalOff, loginModalOn, state.showLoginModal]);

  //connectWalletModal
  useEffect(() => {
    if (state.showConnectWalletModal) {
      showConnectWalletModal();
    } else {
      hideConnectWalletModal();
    }
  }, [hideConnectWalletModal, showConnectWalletModal, state.showConnectWalletModal]);

  return (
    <div>
      {loginModalWhenAccountChanged}
      {state.showConnectWalletModal && connectWalletModal}
      <LoginModal />
      <MessageModal />
    </div>
  );
};

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop>
          <React.Suspense fallback={<LoadingIcon location="global" />}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              {RouteMap.map(e => (
                <Route path={e.path} key={e.path} element={<e.comp />} />
              ))}
              <Route path="*" element={<Navigate to={urlPath.home} replace />} />
            </Routes>
          </React.Suspense>
        </ScrollToTop>
        <Wrapper />
      </Router>
    </>
  );
}
