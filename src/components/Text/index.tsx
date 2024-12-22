import { vw } from '@src/common/rw';
import { linearGradientText, Text } from '@unstyled-ui/atomic';
import { styled } from '@unstyled-ui/core';

export const FText = styled(Text, {
  variants: {
    typo: {
      t_12_400_1: {
        fontSize: vw(12),
        fontWeight: 400,
        lineHeight: 1,
      },
      t_16_500_1: {
        fontSize: vw(16),
        fontWeight: 500,
        lineHeight: 1,
      },
      t_16_600_1: {
        fontSize: vw(16),
        fontWeight: 600,
        lineHeight: 1,
      },

      t_14_400_1: {
        fontSize: vw(14),
        fontWeight: 400,
        lineHeight: 1,
      },
      t_32_500_1: {
        fontSize: vw(32),
        fontWeight: 500,
        lineHeight: 1,
      },
    },
    color: {
      //@ts-ignore
      hl: {
        ...linearGradientText('linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)'),
      },
    },
    type: {
      text: {
        typo: {
          fontSize: vw(14),
          fontWeight: 400,
          lineHeight: 1,
        },
      },

      subTitle: {
        color: '$white08',
        opacity: 0.6,
        typo: {
          fontSize: vw(14),
          fontWeight: 400,
          lineHeight: 1,
        },
      },
      subTitle16: {
        color: '$white08',
        opacity: 0.6,
        typo: {
          fontSize: vw(14),
          fontWeight: 400,
          lineHeight: 1,
        },
      },
      placeholder: {
        color: '$white03',
        typo: {
          fontSize: vw(16),
          fontWeight: 400,
          lineHeight: 1,
        },
      },
    },
  },
});
