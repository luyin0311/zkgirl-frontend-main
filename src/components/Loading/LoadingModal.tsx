import { modalCss } from '@src/constants/style';
import useWindowSize from '@src/hooks/useWindowSize';
import Loading from '@src/image/loading.gif';
import { Space, Text } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import { bgImg, fixedXYCenter } from '@unstyled-ui/css';
import { useModal } from '@unstyled-ui/ct-modal';
import { Box, Col, Fixed } from '@unstyled-ui/layout';

import Media from '../Media';
import modalBgImg from './modal-bg.png';
import VideoSrcGif from './star.gif';

export type LoadingModalProps = {
  title: string;
  description: string;
  loadingImgSrc?: string;
  css?: CSSProps['css'];
  extra?: React.ReactNode;
};

export const useLoadingModal = (props: LoadingModalProps) => {
  const { isMobile } = useWindowSize();
  const [modal, on, off, visible] = useModal({
    css: {
      ...modalCss,
      'u-modal': { overflow: 'visible' },
      ...(props.css || {}),
    },
    body: (
      <Col
        // className="TabModal"
        css={{
          fx: 'center',
          w: isMobile ? 347 : 470,
          ...bgImg(modalBgImg),
          backgroundSize: '100% 100%',
          // h: vw(291, 270),
        }}
      >
        <Space size={64} />
        {/* <Image src={props.loadingImgSrc || Loading} css={{ w: vw(54, 54) }} /> */}
        <Box src={props.loadingImgSrc || Loading} css={{ w: 54, aspectRatio: 1 }} />
        <Space size={24} />
        <Text
          css={{
            typo: {
              fontSize: 28,
              fontWeight: 600,
              fontFamily: 'Poppins',
              lineHeight: 1,
            },
            color: 'white',
          }}
        >
          {props.title}
        </Text>
        <Space size={24} />
        <Text
          className="desc"
          css={{
            w: isMobile ? 320 : 'auto',
            textAlign: 'center',
            typo: {
              fontSize: 16,
              fontWeight: 300,
              // fontFamily: 'Poppins',
              lineHeight: 1,
            },
            color: '$white06',
          }}
        >
          {props.description}
        </Text>
        <Space size={64} />
        {props.extra}
        <Box
          className="fake-mask"
          css={{
            position: 'fixed',
            w: '100vw',
            h: '100vh',
          }}
        ></Box>
      </Col>
    ),
  });

  return [
    <>
      {modal}
      {visible ? (
        <Fixed
          css={{
            ...fixedXYCenter(),
            mixBlendMode: 'lighten',
            zIndex: 100000,
            // transimtion: 'all 1s',
            visibility: 'auto',
          }}
        >
          <Media
            type={'image'}
            src={VideoSrcGif}
            css={{
              transform: 'translateY(-30%)',
              width: 500,
              maxWidth: 'unset',
            }}
          />
        </Fixed>
      ) : null}
      {/* <Fixed
            css={{
              ...fixedXYCenter(),
              mixBlendMode: 'lighten',
              zIndex: 100000,
              // transimtion: 'all 1s',
              visibility: 'auto',
            }}
          >
            <Media  src={VideoSrc} css={{ transform: 'translateY(-30%)' }} />
          </Fixed> */}
    </>,
    () => {
      on();
    },
    () => {
      off();
    },
    visible,
  ] as const;
};
