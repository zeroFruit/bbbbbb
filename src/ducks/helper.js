import { List } from 'immutable';
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
  const base = joinBaseName(_base);
  const res = {};

  ['REQUEST', 'READY', 'SUCCESS', 'FAILURE']
    .forEach(type => res[type] = `${base}_${type}`);
  return res;
};

export const stateType = {
  OBJ: 'OBJ',
  LIST: 'LIST',
  NUM: 'NUM'
};
export const createInitState = (_base, _key, _stateType) => {
  const base = joinBaseName(_base);
  return {
    base,
    key: _key,
    [createStateFlag(base, _key)]: false,
    [createStateName(base, _key, _stateType)]: createStatePayload(_stateType)
  };
};

const createStateFlag = (_base, _suffix) => `is${_base}${_suffix}_`;
const createStateName = (_base, _prefix, _stateType) => (
  _stateType === stateType.LIST ?
    `${_prefix}${_base}List_` :
    `${_prefix}${_base}_`
);
const createStatePayload = (_stateType) => {
  switch(_stateType) {
    case stateType.OBJ: return {};
    case stateType.LIST: return List().toJS();
    case stateType.NUM: return 0;
  }
};


export const createType = (_base) => {
  return joinBaseName(_base);
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


const joinBaseName = (_base) => {
  let base = _base;
  if (Array.isArray(base)) {
    base = base.join('/');
  }
  return base;
};
