import { ID2CHAIN_MAP, RawChainType } from '@c3/chain';
import { JsonRpcProvider } from '@ethersproject/providers';
import { getValidRpc } from '@src/common/getValidRpc';
import { ethers } from 'ethers';

export const getL0ScanExplorer = async (chainId: RawChainType['chainId'], hash: string) => {
  // const rpc = getValidRpc(ID2CHAIN_MAP[chainId]);
  // const provider = new JsonRpcProvider(rpc);
  // const receipt = await provider.getTransactionReceipt(hash);
  // if (receipt) {
  //   const iface = new ethers.utils.Interface([
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: false,
  //           internalType: 'bytes',
  //           name: 'payload',
  //           type: 'bytes',
  //         },
  //       ],
  //       name: 'Packet',
  //       type: 'event',
  //     },
  //   ]);
  //   // console.log('====>receipt.logs', receipt.logs);
  //   const res = receipt.logs
  //     .map((log: any) => {
  //       try {
  //         const parsedLog = iface.parseLog(log);
  //         // console.log('====>parsedLog', parsedLog);

  //         if (parsedLog.name === 'Packet') {
  //           const payload = parsedLog.args.payload;
  //           const nonce = +ethers.utils.hexDataSlice(payload, 0, 8);
  //           const srcChainId = +ethers.utils.hexDataSlice(payload, 8, 10);
  //           const srcAddress = ethers.utils.hexDataSlice(payload, 10, 30);
  //           const dstChainId = +ethers.utils.hexDataSlice(payload, 30, 32);
  //           const dstAddress = ethers.utils.hexDataSlice(payload, 32, 52);
  //           return `https://layerzeroscan.com/${srcChainId}/address/${srcAddress}/message/${dstChainId}/address/${dstAddress}/nonce/${nonce}`;
  //         }
  //       } catch (error) {
  //         // console.log(error);
  //         return '';
  //       }
  //     })
  //     .filter(Boolean);
  //   //老代码逻辑是这样的
  //   return res[res.length - 1] || '';
  // }
  // return '';
  return `https://layerzeroscan.com/tx/${hash}`;
};

//@ts-ignore
window.__getL0ScanExplorer = getL0ScanExplorer;
