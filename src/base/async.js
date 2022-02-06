export const debounce = (func, waitFor) => {
  let timeout = 0;

  return (...args) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), waitFor);
  };
};
