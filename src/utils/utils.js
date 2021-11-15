export function uuid() {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(
    36
  );
}

export function includes(string, array) {
  for (let i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return true;
    }
  }
  return false;
}
