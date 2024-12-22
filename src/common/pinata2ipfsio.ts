export const convertPinta2IpfsIo = (url: string) => {
  return url.replace('https://gateway.pinata.cloud/ipfs/', 'https://ipfs.io/ipfs/');
};
