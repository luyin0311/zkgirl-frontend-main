import { env } from '@c3/utils';
import { CSSProps, styled } from '@unstyled-ui/core';
import React from 'react';

//@ts-ignore
window.___env = env;
const __Video = styled('video', {
  controls: 'none',
});

export type VideoProps = CSSProps & JSX.IntrinsicElements['video'];
const Video: React.FC<VideoProps> = props => {
  // const attr = env.mobile ? { controls: true } : { controls: false };
  return <__Video autoPlay loop muted playsInline controls={false} {...props}></__Video>;
};

export default Video;
