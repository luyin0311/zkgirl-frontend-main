export const exceptionWarn = (location: string, ...args: any[]) => {
  console.warn('exception log:', `==[${location}]==`, ...args);
};

export const dbg = (...args: any[]) => {
  if (localStorage.getItem('debug')) {
    console.log(...args);
  }
};
