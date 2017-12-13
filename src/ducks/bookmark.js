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
} from './helper';

export const types = {
  // ADD_BOOKMARK_READY: 'bookmark/add_bookmark_ready',
  // ADD_BOOKMARK_REQUEST: 'bookmark/add_bookmark_request',
  // ADD_BOOKMARK_SUCCESS: 'bookmark/add_bookmark_success',
  ADD_BOOKMARK: createRequestTypes(['bookmark', 'ADD_BOOKMARK']),

  // REMOVE_BOOKMARK_READY: 'bookmark/remove_bookmark_ready',
  // REMOVE_BOOKMARK_REQUEST: 'bookmark/remove_bookmark_request',
  // REMOVE_BOOKMARK_SUCCESS: 'bookmark/remove_bookmark_success',
  REMOVE_BOOKMARK: createRequestTypes(['bookmark', 'REMOVE_BOOKMARK']),

  // FETCH_BOOKMARK_READY: 'bookmark/fetch_bookmark_ready',
  // FETCH_BOOKMARK_REQEUST: 'bookmark/fetch_bookmark_request',
  // FETCH_BOOKMARK_SUCCESS: 'bookmark/fetch_bookmark_success',
  FETCH_BOOKMARK: createRequestTypes(['bookmark', 'FETCH_BOOKMARK']),

  FETCH_BOOKMARKS_IN_COLLECTION_READY: 'bookmark/fetch_bookmarks_in_collection_ready',
  FETCH_BOOKMARKS_IN_COLLECTION_REQUEST: 'bookmark/fetch_bookmarks_in_collection_request',
  FETCH_BOOKMARKS_IN_COLLECTION_SUCCESS: 'bookmark/fetch_bookmarks_in_collection_success'
};

export const initialState = {
  myBookmarks_: createInitState('Bookmark', 'My', stateType.LIST),
  isBookmarkAdded_: createInitState('Bookmark', 'Add', stateType.NONE),
  isBookmarkRemoved_: createInitState('Bookmark', 'Remove', stateType.NONE),
  isBookmarkFetched_: createInitState('Bookmark', 'Fetch', stateType.NONE),
  isBookmarksInCollectionFetched_: false,
  myBookmarksInCollection_: {}
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
  [types.FETCH_BOOKMARKS_IN_COLLECTION_READY]: (state, action) => {
    return {
      ...state,
      isBookmarkInCollectionFetched_: false
    };
  },
  [types.FETCH_BOOKMARKS_IN_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarksInCollectionFetched_: true,
      myBookmarksInCollection_: { ...action.payload }
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
  GetIsBookmarkedFetched: state => getStateFlag(state.bookmark.isBookmarkFetched_),
  GetIsBookmarkedAdded: state => getStateFlag(state.bookmark.isBookmarkAdded_),
  GetIsBookmarkedRemoved: state => getStateFlag(state.bookmark.isBookmarkRemoved_),
  GetMyBookmarks: state => getStatePayload(state.bookmark.myBookmarks_),
  GetIsBookmarksInCollectionFetched: state => state.bookmark.isBookmarksInCollectionFetched_,
  GetBookmarksInCollection: state => state.bookmark.myBookmarksInCollection_
};
