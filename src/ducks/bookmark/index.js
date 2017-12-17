import { List } from 'immutable';
import {
  action,
  stateType,
  createType,
  createReducer,
  createRequestTypes,
  createInitState,
  setStateFlag,
  setStatePayload,
  concatStatePayload,
  getStateFlag,
  getStatePayload
} from '../helper';

export const types = {
  ADD_BOOKMARK: createRequestTypes(['bookmark', 'ADD_BOOKMARK']),
  REMOVE_BOOKMARK: createRequestTypes(['bookmark', 'REMOVE_BOOKMARK']),
  FETCH_BOOKMARK: createRequestTypes(['bookmark', 'FETCH_BOOKMARK']),
  FETCH_BOOKMARKS_IN_COLLECTION: createRequestTypes(['bookmark', 'FETCH_BOOKMARKS_IN_COLLECTION'])
};

export const initialState = {
  myBookmarks_: createInitState('Bookmark', 'My', stateType.LIST),
  isBookmarkAdded_: createInitState('Bookmark', 'Add', stateType.NONE),
  isBookmarkRemoved_: createInitState('Bookmark', 'Remove', stateType.NONE),
  isBookmarkFetched_: createInitState('Bookmark', 'Fetch', stateType.NONE),
  myBookmarksInCollection: createInitState('BookmarksInCollection', 'Fetch', stateType.OBJ)
};

const add = {
  [types.ADD_BOOKMARK.READY]: (state, action) => {
    return {
      ...state,
      isBookmarkAdded_: setStateFlag(state.isBookmarkAdded_, true)
    };
  },
  [types.ADD_BOOKMARK.SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkAdded_: setStateFlag(state.isBookmarkAdded_, false),
      myBookmarks_: concatStatePayload(state.myBookmarks_, action.payload)
    };
  }
};

const remove = {
  [types.REMOVE_BOOKMARK.READY]: (state, action) => {
    return {
      ...state,
      isBookmarkRemoved_: setStateFlag(state.isBookmarkRemoved_, true)
    };
  },
  [types.REMOVE_BOOKMARK.SUCCESS]: (state, action) => {
    const myBookmarksList = getStatePayload(state.myBookmarks_);
    const index = List(myBookmarksList).indexOf(action.payload);
    const _payload = List(myBookmarksList).delete(index).toJS();
    return {
      ...state,
      isBookmarkRemoved_: setStateFlag(state.isBookmarkRemoved_, false),
      myBookmarks_: setStatePayload(state.myBookmarks_, _payload)
    };
  }
};

const fetch = {
  [types.FETCH_BOOKMARK.READY]: (state, action) => {
    return {
      ...state,
      isBookmarkFetched_: setStateFlag(state.isBookmarkFetched_, true)
    };
  },
  [types.FETCH_BOOKMARK.SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkFetched_: setStateFlag(state.isBookmarkFetched_, false),
      myBookmarks_: setStatePayload(state.myBookmarks_, action.payload)
    };
  }
};

const fetchInCollection = {
  [types.FETCH_BOOKMARKS_IN_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      myBookmarksInCollection_: setStateFlag(state.myBookmarksInCollection_, false)
    };
  },
  [types.FETCH_BOOKMARKS_IN_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      myBookmarksInCollection_: setStatePayload(
        setStateFlag(state.myBookmarksInCollection_, false),
        action.payload
      )
    };
  }
};

export default bookmark = createReducer(initialState, {
  ...add,
  ...remove,
  ...fetch,
  ...fetchInCollection
});

export const actions = {

};

export const selectors = {
  GetMyBookmarks:                     state => getStatePayload(state.bookmark.myBookmarks_),
  GetBookmarksInCollection:           state => getStatePayload(state.bookmark.myBookmarksInCollection_),

  GetIsBookmarkedFetched:             state => getStateFlag(state.bookmark.isBookmarkFetched_),
  GetIsBookmarkedAdded:               state => getStateFlag(state.bookmark.isBookmarkAdded_),
  GetIsBookmarkedRemoved:             state => getStateFlag(state.bookmark.isBookmarkRemoved_),
  GetIsBookmarksInCollectionFetched:  state => getStateFlag(state.bookmark.myBookmarksInCollection_)
};
