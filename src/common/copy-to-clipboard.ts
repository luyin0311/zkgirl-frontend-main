import { message } from 'antd';
import copy from 'copy-to-clipboard';

export const copyToClipBoard = (code: string) => {
  copy(code);
  message.destroy();
  message.success('Copied');
};
