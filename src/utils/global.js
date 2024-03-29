export function createDebounce(delay = 1) {
  let timeout = null;
  return function (fnc, delayMs) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc();
    }, delayMs || delay);
  };
}
export function copyValue(copiedValue) {
  navigator.clipboard.writeText(copiedValue);
}
