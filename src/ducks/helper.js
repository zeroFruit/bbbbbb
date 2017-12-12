import { hasPath } from '../utils/ObjectUtils';

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const createRequestTypes = (_base) => {
  let base = _base;
  if (Array.isArray(base)) {
    base = base.join('/');
  }
  const res = {};

  ['REQUEST', 'READY', 'SUCCESS', 'FAILURE']
    .forEach(type => res[type] = `${base}_${type}`);
  return res;
};

export const createType = (_base) => {
  let base = _base;
  if (Array.isArray(base)) {
    base = base.join('/');
  }
  return base;
};

export const patch = (type, _payload = {}, mergeKeys) => {
  const rt = { type, payload: _payload };
  if (mergeKeys) {
    rt.mergeKeys = Array.isArray(mergeKeys) ? mergeKeys : [mergeKeys];
  }
  return rt;
};

export const action = (type, payload = {}) =>
  ({ type, payload: { ...payload } });
