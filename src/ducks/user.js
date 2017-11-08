import { createReducer } from './helper';

export const types = {
  FETCH_ME_READY: 'user/fetch_me_ready',
  FETCH_ME_REQUEST: 'user/fetch_me_request',
  FETCH_ME_SUCCESS: 'user/fetch_me_success'
};

export const initialState = {
  isMyInfoFetched_: false
};

const me = {
  [types.FETCH_ME_READY]: (state, action) => ({
    isMyInfoFetched_: true
  }),
  [types.FETCH_ME_SUCCESS]: (state, action) => ({
    isMyInfoFetched_: false
  })
};

export default user = createReducer(initialState, {
  ...me
});

export const actions = {

};
