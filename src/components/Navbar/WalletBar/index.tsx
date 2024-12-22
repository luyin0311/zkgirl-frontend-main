import { NAME2ID_MAP } from '@c3/chain';
import { useGlobalContext } from '@src/context/GlobalContext';
import { useIsLogined, useMyAccount } from '@src/hooks/useIsLogined';
import { useGlobalStore } from '@src/store/globalStore';
import React, { useCallback, useEffect, useState } from 'react';

import css from './index.module.less';
import NetworkBtn from './NetworkBtn';
import { NetworkStatus, networkStatusIcon, NetworkUnconnected, supportedNetworks, UnknownNetwork } from './NetworkBtn/const';
import useNetworkListModal from './NetworkBtn/NetworkListModal';
import { useGetNetwork } from './NetworkBtn/useGetNetowrkStatus';
import OpbnbBalance from './OpbnbBalance';

const WalletBar: React.FC = props => {
  const action = useGlobalStore(store => store.action);

  const isLogined = useIsLogined();
  const [netWorkText, setNextworkText] = useState(localStorage.getItem('lastNetworkName') || '');
  const [isOpBnb, setIsOpbnb] = useState(false);
  const [networkIcon, setNetworkIcon] = useState(localStorage.getItem('lastNetworkIcon') || '');
  const getNetwork = useGetNetwork();
  const [networkModal, show] = useNetworkListModal();
  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const res = await getNetwork();
        const isOpnbn = res.chainId === NAME2ID_MAP['opbnb_mainnet'];
        setIsOpbnb(isOpnbn);
      } catch (error) {
        setIsOpbnb(false);
      }
    };
    fetchNetwork();
  }, [getNetwork]);

  //@ts-ignore
  window.__getNetwork = getNetwork;

  const updateNetwork = useCallback(async () => {
    try {
      const nw = await getNetwork();
      const networkName = supportedNetworks[nw.chainId].name;
      setNextworkText(networkName);
      localStorage.setItem('lastNetworkName', networkName);

      //icon
      const networkIcon = supportedNetworks[nw.chainId].icon;
      setNetworkIcon(networkIcon);
      localStorage.setItem('lastNetworkIcon', networkIcon);
    } catch (e: any) {
      if (e === NetworkUnconnected || e === UnknownNetwork) {
        setNextworkText(e);
        setNetworkIcon(networkStatusIcon[e as NetworkStatus]);
      }
    }
  }, [getNetwork]);

  useEffect(() => {
    updateNetwork();
  }, [getNetwork, updateNetwork]);

  const { isMobile } = useGlobalContext();
  const onClickNetwork = useCallback(() => {
    if (netWorkText !== UnknownNetwork) {
      return;
    }
    //显示选择网络的弹窗
    show();
    if (isMobile) {
      // todo 因为封装的太深了，没法去触发menu开关，只能用全局state了;
      action.update({ showMenu: false });
    }
  }, [netWorkText, show, action, isMobile]);

  const user = useMyAccount();

  if (!isLogined || !user) {
    return null;
  }

  return (
    <div className={css.root}>
      {isOpBnb ? <OpbnbBalance /> : <NetworkBtn icon={networkIcon} text={netWorkText} onClick={onClickNetwork} />}
      {networkModal}
    </div>
  );
};

export default WalletBar;
