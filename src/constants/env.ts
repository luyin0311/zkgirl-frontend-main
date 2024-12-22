export const isProd = import.meta.env.PROD;

export const domainEnv = location.host.startsWith('localhost')
  ? 'localhost'
  : location.host.startsWith('dev')
  ? 'dev'
  : location.host.startsWith('preview')
  ? 'preview'
  : 'prod';

//@ts-ignore
window.__isProd = isProd;
