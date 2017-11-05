const logger = {
  log: message => { console.log(message); },
  warn: message => { console.warn(message); },
  error: err => { console.error(err); }
};

export default logger;
