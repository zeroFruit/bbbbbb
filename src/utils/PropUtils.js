import logger from './LogUtils';

export const logWhenNotDefeind = name => { logger.warn(`${name} not defined`); };
