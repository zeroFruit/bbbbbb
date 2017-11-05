import { createReducer } from './helper';

export const types = {
  LOAD_NEWSFEED_REQUEST: 'BOOK/LOAD_NEWSFEED_REQUEST'
};

export const initialState = {
  page_: 0,
  numOfFeedsPerLoad_: 3
};

const page = {
  [types.LOAD_NEWSFEED_REQUEST]: (state, action) => {
    return {
      ...state,
      page_: state.page_ + 1
    };
  }
};

export default book = createReducer(initialState, {
  ...page
});

export const actions = {
  LoadNewsfeed: () => {
    return {
      type: types.LOAD_NEWSFEED_REQUEST
    };
  }
};
