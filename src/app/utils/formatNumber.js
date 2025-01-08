// Format number to K, M, or just return the number 
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  } else if (num >= 10) {
    return num.toFixed(3);
  } else if (num >= 1) {
    return num.toFixed(2);
  } else {
    return num;
  }
};

export const tradeFormatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }

  // 먼저 숫자를 문자열로 변환하고 소수점 자리를 포맷팅
  const formattedNum = num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 });

  // 소수점이 있는 경우에만 처리
  if (formattedNum.includes('.')) {
    // 끝의 0을 모두 제거하고, 마지막이 소수점인 경우 소수점도 제거
    return formattedNum.replace(/\.?0+$/, '');
  }

  return formattedNum;
};