import { useWallet } from '@c3/crypto';
import { handleProvider } from '@src/common/provider';
import { ERC1155_ABI } from '@src/components/ERC1155/abi';
import Icon from '@src/components/Icon';
import { Address, ticket, ticketImg } from '@src/config';
import { urlPath } from '@src/constants/urlPath';
import { useGlobalContext } from '@src/context/GlobalContext';
import { useIsLogined } from '@src/hooks/useIsLogined';
import { useOnUserSwitch } from '@src/hooks/useOnUserSwitch';
import { Link } from '@unstyled-ui/atomic';
import BigNumber from 'bignumber.js';
import classnames from 'classnames';
import { ethers } from 'ethers';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { createMulticallContract } from '../api/createContract';
import { expchainContract } from '../api/expchainContract';
import { useBalanceStore } from '../store/store';
import css from './balanceBox.module.less';

export type IProps = {
  className?: string;
};

const erc1155Iface = new ethers.utils.Interface(ERC1155_ABI);
// const erc721Iface = new ethers.utils.Interface(erc721ABI);

const Comp: React.FC<IProps> = props => {
  const { action, state } = useBalanceStore(s => s);
  const nav = useNavigate();
  const isLogined = useIsLogined();
  const wallet = useWallet();

  const fetchMultiBalance = useCallback(async () => {
    const { account, provider } = wallet;
    if (!account || !provider) return;
    const PartnerTicketFactoryContract = (
      await expchainContract(provider, Address[state.network].Address)
    )[1];
    console.log('Contract', PartnerTicketFactoryContract);   
    const freeDraws  = await PartnerTicketFactoryContract.freeDraws(account);
    console.log('freeDraws', freeDraws);
    // const walletChainId = await wallet.getChainId();
    // const _opBNBProvider = await handleProvider(walletChainId, 'opbnb_mainnet', provider);
    // if (_opBNBProvider) {
    //   const opBNBContract = await createMulticallContract(_opBNBProvider, '0x657Afed1243ef03c77532b13f44463350613Fe46');
    //   const opBNBRes = await opBNBContract[0].multicall(
    //     Object.values(ticket.opbnb_mainnet)
    //       .filter(item => item.address && item.name === 'PartnerTicket')
    //       .map(item => ({
    //         target:
    //           Address.opbnb_mainnet.PartnerTicketRealTimeFactoryAddress === item.address ? Address.opbnb_mainnet.PartnerTicketAddress : item.address,
    //         callData: erc1155Iface.encodeFunctionData('balanceOf', [account, item.tokenId]),
    //       }))
    //   );
    //   const opBNBBalance = opBNBRes.map((item: string, index: number) => [Object.keys(ticket.opbnb_mainnet)[index], new BigNumber(item).toNumber()]);
    //   action.update({
    //     opbnb_mainnet: Object.fromEntries(opBNBBalance),
    //     refresh: false,
    //   });
    // }
  }, [wallet, action]);

  useOnUserSwitch(() => {
    action.update({
      opbnb_mainnet: {
        ...state.opbnb_mainnet,
      },
      refresh: true,
    });
  });

  useEffect(() => {
    if (state.refresh) {
      fetchMultiBalance();
    }
  }, [fetchMultiBalance, state]);

  const OpBNBBalance = state['opbnb_mainnet'];
  console.log(OpBNBBalance);
  const { isMobile } = useGlobalContext();
  return isLogined ? (
    <div
      className={classnames(css.root, props.className, {
        mobile: isMobile,
      })}
    >
      <Link className={css.item} onClick={() => nav(urlPath.ticket)}>
        <img src={ticketImg[state.network].PartnerTicket} alt="" />
        <span className={css.txt}>
          10
          <Icon name="Minus_M" />
        </span>
      </Link>
    </div>
  ) : null;
};

export default Comp;
