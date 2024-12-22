import zkBridge from '@src/image/zk-bridge.svg';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';

export const ZkBridgeTokenLogo: React.FC<CSSProps> = props => {
  return <Image src={zkBridge} {...props} />;
};
