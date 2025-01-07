// Format number to K, M, or just return the number 
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  } else if (num >= 1) {
    return num.toFixed(2);
  } else {
    return num;
  }
};