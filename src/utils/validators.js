export const validateAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateMnemonic = (mnemonic) => {
  const words = mnemonic.trim().split(/\s+/);
  return words.length === 12 || words.length === 24;
};

export const formatAddress = (address, chars = 4) => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(-chars)}`;
};

export const formatBalance = (balance, decimals = 2) => {
  const num = parseFloat(balance);
  if (isNaN(num)) return '0';
  return num.toFixed(decimals);
};

export const truncateString = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};
