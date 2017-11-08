import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  LOAD_NEWSFEED_REQUEST: 'book/load_newsfeed_request',
  RESET_NEWSFFED_STATE: 'book/reset_newsfeed_state',
  FETCH_MY_BOOKS_REQUEST: 'book/fetch_my_books_request',
  FETCH_MY_BOOKS_SUCCESS: 'book/fetch_my_books_success'
};

export const initialState = {
  page_: 0,
  numOfFeedsPerLoad_: 3,
  myBooks_: List().toJS()
};

const page = {
  [types.LOAD_NEWSFEED_REQUEST]: (state, action) => ({
    ...state,
    page_: state.page_ + 1
  }),
  [types.RESET_NEWSFFED_STATE]: (state, action) => ({
    ...state,
    page_: 0
  }),
  [types.FETCH_MY_BOOKS_REQUEST]: (state, action) => ({
    ...state,
  }),
  [types.FETCH_MY_BOOKS_SUCCESS]: (state, action) => ({
    ...state,
    myBooks_: List(action.payload).toJS()
  })
};

export default book = createReducer(initialState, {
  ...page
});

export const actions = {
  LoadNewsfeed: () => {
    return {
      type: types.LOAD_NEWSFEED_REQUEST
    };
  },
  ResetNewsfeed: () => {
    return {
      type: types.RESET_NEWSFFED_STATE
    };
  }
};

export const selectors = {
  GetMyBooks: state => state.book.myBooks_
};
