import { createReducer } from './helper';

export const types = {
  ADD_BOOKMARK_REQUEST: 'BOOKMARK/ADD_BOOKMARK_REQUEST',
  ADD_BOOKMARK_SUCCESS: 'BOOKMARK/ADD_BOOKMARK_SUCCESS'
};

export const initialState = {
  isBookmarkAdded_: false
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
  }
}
