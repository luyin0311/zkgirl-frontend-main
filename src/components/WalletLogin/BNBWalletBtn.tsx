// import { bus } from '@src/common/bus';
// import { user_login_success_event } from '@src/constants/consts';
// import { bnbWalletLoginReport } from '@src/api/bnbWallet';
import { WalletName, walletName_BNBWallet } from '@c3/crypto';
import { isObject } from '@c3/utils';
import React, { useCallback, useEffect } from 'react';

import { BaseLoginButton } from './BaseLoginBtn';

export const BNBWalletBtn: React.FC = props => {
  // useBnbWalletLoginActivity();
  return <BaseLoginButton name={walletName_BNBWallet} />;
};

// //===========================================================
// // bnb 活动
// //===========================================================
// export const useBnbWalletLoginActivity = () => {
//   const report = useCallback((o: unknown) => {
//     if (
//       isObject(o) &&
//       'name' in o &&
//       'account' in o &&
//       o.name === walletName_BNBWallet
//     ) {
//       typeof o.account === 'string' && bnbWalletLoginReport(o.account);
//     }
//   }, []);
//   useEffect(() => {
//     bus.on(user_login_success_event, report);
//     return () => {
//       bus.off(user_login_success_event, report);
//     };
//   }, [report]);
// };
