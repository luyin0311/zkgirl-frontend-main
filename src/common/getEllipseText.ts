export const getEllipseText = (tokenAddress = '', startSize = 6, endSize = 3) => {
  if (tokenAddress.length < startSize + endSize) {
    return tokenAddress;
  }
  return tokenAddress.slice(0, startSize) + '...' + tokenAddress.slice(-endSize);
};
