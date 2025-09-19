// Utility functions for formatting data

/**
 * Format an Ethereum address to show first 6 and last 4 characters
 * @param address - The full Ethereum address
 * @returns Formatted address string
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Format a number to show with commas
 * @param num - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format a percentage value
 * @param value - The percentage value (0-100)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a currency value
 * @param value - The currency value
 * @param currency - The currency symbol
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = '$'): string => {
  return `${currency}${value.toLocaleString()}`;
};

/**
 * Format a large number with K, M, B suffixes
 * @param num - The number to format
 * @returns Formatted number string with suffix
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};
