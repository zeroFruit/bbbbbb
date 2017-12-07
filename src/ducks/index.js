import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import { createReducer } from './helper';
import book, { selectors as bookSelectors } from './book';
import bookmark, { selectors as bookmarkSelectors } from './bookmark';
import user from './user';
import tag from './tag';
import collection from './collection';
import page from './page';
import search from './search';

export const selectors = {
  BookAndBookmarkSelector: createSelector(
    bookSelectors.GetMyBooks,
    bookmarkSelectors.GetMyBookmarks,
    (book, bookmark) => {
      return List(book).concat(bookmark).sort().toJS();
    }
  ),
  BookmarksWithIdProp: createSelector(
    bookmarkSelectors.GetMyBookmarks,
    bookmarks => bookmarks.map(bookmark => ({
      id: bookmark,
      bookId: bookmark
    }))
  ),
  GetIsBooksAndUsersFetched: state => state.index.isBooksAndUsersFetched_,
  GetIsBooksAndUsersFetchedByTag: state => state.index.isBooksAndUsersFetchedByTag_,
};

export const types = {
  FETCH_BOOKS_AND_USERS_REQUEST: 'index/fetch_books_and_users_request',
  FETCH_BOOKS_AND_USERS_READY: 'index/fetch_books_and_users_ready',
  FETCH_BOOKS_AND_USERS_SUCCESS: 'index/fetch_books_and_users_success',

  FETCH_BOOKS_AND_USERS_BY_TAG_REQUEST: 'index/fetch_books_and_users_by_tag_request',
  FETCH_BOOKS_AND_USERS_BY_TAG_READY: 'index/fetch_books_and_users_by_tag_ready',
  FETCH_BOOKS_AND_USERS_BY_TAG_SUCCESS: 'index/fetch_books_and_users_by_tag_success',

  FETCH_BOOKS_BY_COLLECTION_REQUEST: 'index/fetch_books_by_collection_request',
  FETCH_BOOKS_BY_COLLECTION_READY: 'index/fetch_books_by_collection_ready',
  FETCH_BOOKS_BY_COLLECTION_SUCCESS: 'index/fetch_books_by_collection_success',

  FETCH_BOOKS_BY_USER_REQUEST: 'index/fetch_books_by_user_request',
  FETCH_BOOKS_BY_USER_READY: 'index/fetch_books_by_user_ready',
  FETCH_BOOKS_BY_USER_SUCCESS: 'index/fetch_books_by_user_success'
};

export const initialState = {
  isBooksAndUsersFetched_: false,
  isBooksAndUsersFetchedByTag_: false,
  isBooksFetchedByCollection_: false,
  isBooksFetchedByUser_: false
};

export const fetchBooksAndUsers = {
  [types.FETCH_BOOKS_AND_USERS_READY]: (state, action) => ({
    ...state,
    isBooksAndUsersFetched_: false
  }),
  [types.FETCH_BOOKS_AND_USERS_SUCCESS]: (state, action) => ({
    ...state,
    isBooksAndUsersFetched_: true
  })
};

export const fetchBooksAndUsersByTag = {
  [types.FETCH_BOOKS_AND_USERS_BY_TAG_READY]: (state, action) => ({
    ...state,
    isBooksAndUsersFetchedByTag_: false
  }),
  [types.FETCH_BOOKS_AND_USERS_BY_TAG_SUCCESS]: (state, action) => ({
    ...state,
    isBooksAndUsersFetchedByTag_: true
  })
};

export const fetchBooksByCollection = {
  [types.FETCH_BOOKS_BY_COLLECTION_READY]: (state, action) => ({
    ...state,
    isBooksFetchedByCollection_: false
  }),
  [types.FETCH_BOOKS_BY_COLLECTION_SUCCESS]: (state, action) => ({
    ...state,
    isBooksFetchedByCollection_: true
  })
};

export const fetchBooksByUser = {
  [types.FETCH_BOOKS_BY_USER_READY]: (state, action) => ({
    ...state,
    isBooksFetchedByUser_: false
  }),
  [types.FETCH_BOOKS_BY_USER_SUCCESS]: (state, action) => ({
    ...state,
    isBooksFetchedByUser_: true
  })
};

const reducer = createReducer(initialState, {
  ...fetchBooksAndUsers,
  ...fetchBooksAndUsersByTag,
  ...fetchBooksByCollection,
  ...fetchBooksByUser
});

export default combineReducers({
  index: reducer,
  book,
  bookmark,
  user,
  tag,
  collection,
  page,
  search
});
