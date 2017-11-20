import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  ADD_BOOKMARK_READY: 'bookmark/add_bookmark_ready',
  ADD_BOOKMARK_FETCHING: 'bookmark/add_bookmark_fetching',
  ADD_BOOKMARK_REQUEST: 'bookmark/add_bookmark_request',
  ADD_BOOKMARK_SUCCESS: 'bookmark/add_bookmark_success',

  REMOVE_BOOKMARK_READY: 'bookmark/remove_bookmark_ready',
  REMOVE_BOOKMARK_FETCHING: 'bookmark/remove_bookmark_fetching',
  REMOVE_BOOKMARK_REQUEST: 'bookmark/remove_bookmark_request',
  REMOVE_BOOKMARK_SUCCESS: 'bookmark/remove_bookmark_success',

  FETCH_BOOKMARK_READY: 'bookmark/fetch_bookmark_ready',
  FETCH_BOOKMARK_REQEUST: 'bookmark/fetch_bookmark_request',
  FETCH_BOOKMARK_SUCCESS: 'bookmark/fetch_bookmark_success',

  FETCH_BOOKMARKS_IN_COLLECTION_READY: 'bookmark/fetch_bookmarks_in_collection_ready',
  FETCH_BOOKMARKS_IN_COLLECTION_REQUEST: 'bookmark/fetch_bookmarks_in_collection_request',
  FETCH_BOOKMARKS_IN_COLLECTION_SUCCESS: 'bookmark/fetch_bookmarks_in_collection_success'
};

export const initialState = {
  isBookmarkAdded_: false,
  isBookmarkRemoved_: false,
  isBookmarkFetched_: false,
  myBookmarks_: List().toJS(),
  isBookmarksInCollectionFetched_: false,
  myBookmarksInCollection_: {}
};

const add = {
  [types.ADD_BOOKMARK_READY]: (state, action) => {
    return {
      ...state,
      isBookmarkAdded_: true
    };
  },
  [types.ADD_BOOKMARK_FETCHING]: (state, action) => {
    return {
      ...state,
      myBookmarks_: List(state.myBookmarks_).push(action.payload).sort().toJS()
    };
  },
  [types.ADD_BOOKMARK_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkAdded_: false,
    };
  },
  [types.REMOVE_BOOKMARK_READY]: (state, action) => {
    return {
      ...state,
      isBookmarkRemoved_: true
    };
  },
  [types.REMOVE_BOOKMARK_FETCHING]: (state, action) => {
    const index = List(state.myBookmarks_).indexOf(action.payload);
    return {
      ...state,
      myBookmarks_: List(state.myBookmarks_).delete(index).toJS()
    };
  },
  [types.REMOVE_BOOKMARK_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookmarkRemoved_: false
    };
  },
  [types.FETCH_BOOKMARK_READY]: (state, action) => {
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
  GetIsBookmarkedFetched: state => state.bookmark.isBookmarkFetched_,
  GetIsBookmarkedAdded: state => state.bookmark.isBookmarkAdded_,
  GetIsBookmarkedRemoved: state => state.bookmark.isBookmarkRemoved_,
  GetMyBookmarks: state => state.bookmark.myBookmarks_,
  GetIsBookmarksInCollectionFetched: state => state.bookmark.isBookmarksInCollectionFetched_,
  GetBookmarksInCollection: state => state.bookmark.myBookmarksInCollection_
};
