let enabled = true;

export function setLoggingEnabled(value) {
  enabled = Boolean(value);
}

function log(method, ...args) {
  if (!enabled) return;
  // eslint-disable-next-line no-console
  console[method](...args);
}

export const logger = {
  info: (...args) => log("info", ...args),
  warn: (...args) => log("warn", ...args),
  error: (...args) => log("error", ...args),
  debug: (...args) => log("debug", ...args)
};


