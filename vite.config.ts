import { formatTime } from '@c3/utils';
import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
// import collie from '@colliejs/vite';
import autoprefixer from 'autoprefixer';
import dayjs from 'dayjs';
// import styledConfig from './collie.config';
import path from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const alias = {
  '@src': '/src',
  '@components': '/src/components',
  '@pages': '/src/pages',
  '@hooks': '/src/hooks',
  '@images': '/src/image',
  '@common': '/src/common',
  '@constants': '/src/constants',
};
export default defineConfig({
  plugins: [
    // ssl(),
    // collie({
    //   styledConfig: styledConfig,
    //   include: [/src\/pages\/Bridge\/.*\.tsx?$/, 'collie.config.ts'],
    //   exclude: [/node_modules/, /src\/pages\/Bridge\/History\/.*\.tsx?$/],
    //   alias: alias,
    //   root: process.cwd(),
    // }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/components/Icon')],
      symbolId: '[name]',
    }),
    react({
      babel: {
        plugins: ['@babel/plugin-proposal-optional-chaining'],
      },
    }),
    replace({
      preventAssignment: true,
      // __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: JSON.stringify({time: dayjs().format('YYYY-MM-DD HH:mm:ss'), dev: process.env.NODE_ENV === 'development'}),
      // __DEV__: process.env.NODE_ENV === 'development',
    }),
    // strip({ include: /src\/.*\.[mc]?[jt]sx?$/ }),
  ],
  envPrefix: ['VITE_', 'REACT_APP_'],
  define: {
    'process.env': {},
    __DEBUG__: process.env.NODE_ENV === 'development',
  },
  resolve: {
    alias: alias,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            '> 0.5%',
            'last 5 versions',
            'last 5 iOS versions',
            'last 5 Android versions',
            'last 10 Safari versions'
          ],
          grid: true
        })
      ]
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules/.test(id)) {
            return 'vendor';
          }
          if (id.includes('src/')) {
            return 'app';
          }
        },
      },
    },
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.production
          ? 'https://api.legend.game'
          : 'https://dev-api.legend.game',
        changeOrigin: true,
        bypass: (req, res) => {
          delete req.headers['origin'];
        },
      },
    },
  },
});
