import { List } from 'immutable';
import { createReducer } from './helper';
import agent from '../Agent';

export const types = {
  ADD_BOOKMARK_REQUEST: 'bookmark/add_bookmark_request',
  ADD_BOOKMARK_SUCCESS: 'bookmark/add_bookmark_success',
  REMOVE_BOOKMARK_REQUEST: 'bookmark/remove_bookmark_request',
  REMOVE_BOOKMARK_SUCCESS: 'bookmark/remove_bookmark_success',
  FETCH_BOOKMARK_REQEUST: 'bookmark/fetch_bookmark_request',
  FETCH_BOOKMARK_SUCCESS: 'bookmark/fetch_bookmark_success'
};

export const initialState = {
  isBookmarkAdded_: false,
  isBookmarkRemoved_: false,
  isBookmarkFetched_: false,
  myBookmarks_: List().toJS()
};

const add = {
  [types.ADD_BOOKMARK_REQUEST]: (state, action) => {
    return {
      ...state,
      isBookmarkAdded_: true
    }
  },
  [types.ADD_BOOKMARK_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkAdded_: false
    };
  },
  [types.REMOVE_BOOKMARK_REQUEST]: (state, action) => {
    return {
      ...state,
      isBookmarkRemoved_: true
    };
  },
  [types.REMOVE_BOOKMARK_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkRemoved_: false
    };
  },
  [types.FETCH_BOOKMARK_REQEUST]: (state, action) => {
    return {
      ...state,
      isBookmarkFetched_: true
    };
  },
  [types.FETCH_BOOKMARK_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkFetched_: false,
      myBookmarks_: List(action.payload).toJS()
    };
  }
};

export default bookmark = createReducer(initialState, {
  ...add
});

export const actions = {
  AddBookmarkRequest: () => {
    return { type: types.ADD_BOOKMARK_REQUEST };
  },
  AddBookmarkSuccess: () => {
    return { type: types.ADD_BOOKMARK_SUCCESS };
  },
  RemoveBookmarkRequest: () => {
    return { type: types.REMOVE_BOOKMARK_REQUEST };
  },
  RemoveBookmarkSuccess: () => {
    return { type: types.REMOVE_BOOKMARK_SUCCESS };
  },
  FetchBookmarkSuccess: () => {
    return { type: types.FETCH_BOOKMARK_SUCCESS };
  }
};

export const selectors = {
  GetMyBookmarks: state => state.bookmark.myBookmarks_
};
