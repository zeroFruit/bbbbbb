import { List } from 'immutable';

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


/*
  init reducer state
*/
export const createInitState = (_base, _key, _stateType) => {
  const base = joinBaseName(_base);
  return {
    base,
    key: _key,
    stateType: _stateType,
    [createStateFlagName(base, _key)]: false,
    [createStatePayloadName(base, _stateType)]: createStatePayload(_stateType)
  };
};
export const stateType = {
  OBJ: 'OBJ',
  LIST: 'LIST',
  NUM: 'NUM'
};

/*
  getter / setter
*/
export const setStateFlag = (_state, value) => ({
  ..._state,
  [getStateFlagName(_state)]: value
});

export const setStatePayload = (_state, value) => ({
  ..._state,
  [getStatePayloadName(_state)]: value
});

export const concatStatePayload = (_state, value) => ({
  ..._state,
  [getStatePayloadName(_state)]: List(getStatePayload(_state)).concat(value).toJS()
});

export const getStateFlag = _state => (
  _state[getStateFlagName(_state)]
);

export const getStatePayload = _state => (
  _state[getStatePayloadName(_state)]
);

export const getStateFlagName = _state => (
  _state.stateType === stateType.LIST ?
    `is${_state.base}List${_state.key}_`:
    `is${_state.base}${_state.key}_`
);
export const getStatePayloadName = _state => (
  _state.stateType === stateType.LIST ?
    `${_state.base}List_` :
    `${_state.base}_`
);
/*
  helper
*/
const createStateFlagName = (_base, _suffix, _stateType) => (
  _stateType === stateType.LIST ?
    `is${_base}List${_suffix}_` :
    `is${_base}${_suffix}_`
);
const createStatePayloadName = (_base, _stateType) => (
  _stateType === stateType.LIST ?
    `${_base}List_` :
    `${_base}_`
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
