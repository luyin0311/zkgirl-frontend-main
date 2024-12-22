import { useApi } from '@c3/api';
import { convertIpfsUrlIfNeeded } from '@src/common/convertIpfsUrlIfNeeded';
import { Image } from '@unstyled-ui/atomic';
import { CSSProps } from '@unstyled-ui/core';
import React, { useCallback } from 'react';

import Video from '../Video';
import { getFileTypeApi } from './api';

export type MediaFormatImg = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp';
export type MediaFormatVideo = 'webm' | 'mp4';
export type MediaType = MediaFormatImg | MediaFormatVideo;
export type MediaFile = `${string}.${MediaType}`;

export type MediaCategory = 'video' | 'image' | 'unknown';

const isImage = (file: string) => /\.(png|jpg|jpeg|gif)$/.test(file);
const isVideo = (file: string) => /\.(webm|mp4)$/.test(file);

export const useGetMediaTypeBySrc = () => {
  const [, getFileType] = useApi(getFileTypeApi);
  return useCallback(
    async (file: string) => {
      if (isImage(file)) {
        return 'image';
      }
      if (isVideo(file)) {
        return 'video';
      }
      if (file && file.startsWith('http')) {
        try {
          const res = await fetch(file, { method: 'HEAD' });
          const contentType = res.headers.get('Content-Type') || '';
          if (contentType.startsWith('image')) {
            return 'image';
          }
          if (contentType.startsWith('video')) {
            return 'video';
          }
          return 'unknown';
        } catch (e) {
          try {
            const res = await getFileType({
              id: btoa(file),
            });
            return res.data || 'unknown';
          } catch (e) {
            return 'unknown';
          }
        }
      }
      return 'unknown';
    },
    [getFileType]
  );
};

type MediaProps = {
  src: string;
  type?: MediaCategory;
} & CSSProps;

export const exceptionUrlMap = {} as const;

const Media: React.FC<MediaProps> = props => {
  const { src: _src, type, ...restProps } = props;
  const getMediaType = useGetMediaTypeBySrc();
  //@ts-ignore
  const src = _src in exceptionUrlMap ? exceptionUrlMap[_src] : _src;

  const url = convertIpfsUrlIfNeeded(src);

  const [mediaType, setMediaType] = React.useState<'image' | 'video' | 'unknown'>('unknown');
  React.useEffect(() => {
    if (type) {
      setMediaType(type);
      return;
    }
    getMediaType(src).then(setMediaType);
  }, [getMediaType, src, type]);

  switch (mediaType) {
    case 'video':
      return <Video src={url} {...restProps} />;
    default:
      return <Image src={url} {...restProps} />;
  }
};

export default Media;
