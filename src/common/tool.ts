export function getShortenAddress(address: string, first = 6, last = 4): string {
  if (!address) {
    return '-';
  }
  if (address.length < 10) {
    return address;
  }
  const firstCharacters = address.substring(0, first);
  const lastCharacters = address.substring(address.length - last, address.length);
  return `${firstCharacters}...${lastCharacters}`;
}
