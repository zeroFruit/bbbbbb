import logger from './LogUtils';

export const logWhenNotDefeind = name => { logger.warn(`${name} not defined`); };

export const tagTitlePropFormatter = (id, value, type) => ({ id, value, type });
export const textTitlePropFormatter = (id, value, type) => ({ id, value, type });
