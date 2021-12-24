export function uuid() {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(
    36
  );
}

/**
 * @description: 扩展String的includes，可以查看不止一个子字符串
 * @param {String} string
 * @param {Array} array
 * @return {Boolean}
 * @example includes('string', ['s', 't']) 返回true
 */
export function includes(string, array) {
  for (let i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return true;
    }
  }
  return false;
}
