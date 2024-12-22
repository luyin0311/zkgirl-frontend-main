import { collieConfig } from '@collie-ui/common';

const config = {
  ...collieConfig,
  breakpoints: [768],
  styledElementProp: 'cx',
  layername: 'legend-game',
  theme: {
    ...collieConfig.theme,
    colors: {
      ...collieConfig.theme.colors,
      white01: 'rgba(255,255,255,0.1)',
      white02: 'rgba(255,255,255,0.2)',
      white03: 'rgba(255,255,255,0.2)',
      white04: 'rgba(255,255,255,0.4)',
      white05: 'rgba(255,255,255,0.5)',
      white06: 'rgba(255,255,255,0.6)',
      white07: 'rgba(255,255,255,0.7)',
      white08: 'rgba(255,255,255,0.8)',
      white09: 'rgba(255,255,255,0.9)',
    },
    fonts: {
      ...collieConfig.theme.fonts,
      Poppins: 'Poppins,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif',
      Inter: 'Inter,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif',
    },
  },
} as const;
export default config;
