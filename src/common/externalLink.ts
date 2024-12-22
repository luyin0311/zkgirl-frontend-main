export const isExternalLink = (url: string) => {
  return url.startsWith('https://') || url.startsWith('http://');
};
