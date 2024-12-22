const pandaIpfsPrefix = {
  metadata: [
    'ipfs://QmUQ5GFBoJi3oSwEbhfSbN3Mg7F4Lt475kMWAAKkHWuuta/', //uncommon
    'ipfs://QmbombiK8ZiCkXXg2aQTQApw87gT772EDs65WQFgnspZsu/', //rare
    'ipfs://QmZ6dgEPRWLL1ZJy1NxS41NwH1PMonNHbwniuyNEZsTTGK/', //epic
    'ipfs://QmPWqHhdZCXcxVTsqaBwnDxs3QpJh9CoQv9XmizMAfj3Ly/', //legendary
  ],
  image: [
    'ipfs://bafybeigiifemyuriq5ngr4unavhru2eoxvyz7272tsmld3qpiapc324g2e/', //uncommon
    'ipfs://bafybeiacbbn5sa2ue6gf4wpgaasfile3bjnupwymhmdjregez4ngfqqzsq/', //rare
    'ipfs://bafybeif6yrfzbfoqirqxrgufaquyzitjeywaw23uds42a6trhxrv4snt6m/', //epic
    'ipfs://bafybeicbzq6zhkntcm53lpp64tjtjvsnkc4hdisd3y5so2cg7lwxahbolm/', //legendary
  ],
};

type UrlType = 'image' | 'metadata' | 'any';
// const isPandaIpfs = (url: string, urlType: UrlType = 'any') => {
//   switch (urlType) {
//     case 'any':
//       return (
//         pandaIpfsPrefix.image.some(prefix => url.startsWith(prefix)) ||
//         pandaIpfsPrefix.metadata.some(prefix => url.startsWith(prefix))
//       );
//     case 'image':
//       return pandaIpfsPrefix.image.some(prefix => url.startsWith(prefix));
//     case 'metadata':
//       return pandaIpfsPrefix.metadata.some(prefix => url.startsWith(prefix));
//     default:
//       throw new Error('unknown urlType');
//   }
// };

export const convertIpfsUrlIfNeeded = (url: string) => {
  if (!url) {
    console.error('===> something went wrong.url is empty');
    return url;
  }
  if (url.startsWith('ipfs://')) {
    const cid = url.substring(7);
    return `https://polyhedra.myfilebase.com/ipfs/${cid}`;
  }
  return url.replace('https://gateway.pinata.cloud', 'https://polyhedra.myfilebase.com');
};
