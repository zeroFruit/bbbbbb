import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
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
  GetIsBooksAndUsersFetched: state => getStateFlag(state.index.isBooksAndUsersFetched_),
  GetIsBooksAndUsersFetchedByTag: state => getStateFlag(state.index.isBooksAndUsersFetchedByTag_),
  GetIsBooksAndUsersFetchedByAuthorTag: state => getStateFlag(state.index.isBooksAndUsersFetchedByAuthorTag_)
};

export const types = {
  FETCH_BOOK_AND_USER: createRequestTypes(['book', 'FETCH_BOOK_AND_USER']),
  FETCH_BOOKS_AND_USERS: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS']),
  FETCH_BOOKS_AND_USERS_BY_TAG: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS_BY_TAG']),
  FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG']),
  FETCH_BOOKS_BY_COLLECTION: createRequestTypes(['book', 'FETCH_BOOKS_BY_COLLECTION']),
  FETCH_BOOKS_BY_USER: createRequestTypes(['book', 'FETCH_BOOKS_BY_USER'])
};

export const initialState = {
  isBookAndUserFetched_: createInitState('BookAndUser', 'Fetch', stateType.NONE),
  isBooksAndUsersFetched_: createInitState('BooksAndUsers', 'Fetch', stateType.NONE),
  isBooksAndUsersFetchedByTag_: createInitState('BooksAndUsers', 'FetchByTag', stateType.NONE),
  isBooksAndUsersFetchedByAuthorTag_: createInitState('BooksAndUsers', 'FetchByAuthorTag', stateType.NONE),
  isBooksFetchedByCollection_: createInitState('Books', 'FetchByCollection', stateType.NONE),
  isBooksFetchedByUser_: createInitState('Books', 'FetchByUser', stateType.NONE)
};

export const fetchBookAndUser = {
  [types.FETCH_BOOK_AND_USER.READY]: (state, action) => ({
    ...state,
    isBookAndUserFetched_: setStateFlag(state.isBookAndUserFetched_, false)
  }),
  [types.FETCH_BOOK_AND_USER.SUCCESS]: (state, action) => ({
    ...state,
    isBookAndUserFetched_: setStateFlag(state.isBookAndUserFetched_, true)
  })
};

export const fetchBooksAndUsers = {
  [types.FETCH_BOOKS_AND_USERS.READY]: (state, action) => ({
    ...state,
    isBooksAndUsersFetched_: setStateFlag(state.isBooksAndUsersFetched_, false)
  }),
  [types.FETCH_BOOKS_AND_USERS.SUCCESS]: (state, action) => ({
    ...state,
    isBooksAndUsersFetched_: setStateFlag(state.isBooksAndUsersFetched_, true)
  })
};

export const fetchBooksAndUsersByTag = {
  [types.FETCH_BOOKS_AND_USERS_BY_TAG.READY]: (state, action) => ({
    ...state,
    isBooksAndUsersFetchedByTag_: setStateFlag(state.isBooksAndUsersFetchedByTag_, false)
  }),
  [types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS]: (state, action) => ({
    ...state,
    isBooksAndUsersFetchedByTag_: setStateFlag(state.isBooksAndUsersFetchedByTag_, true)
  })
};

export const fetchBooksAndUsersByAuthorTag = {
  [types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY]: (state, action) => ({
    ...state,
    isBooksAndUsersFetchedByAuthorTag_: setStateFlag(state.isBooksAndUsersFetchedByAuthorTag_, false)
  }),
  [types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS]: (state, action) => ({
    ...state,
    isBooksAndUsersFetchedByAuthorTag_: setStateFlag(state.isBooksAndUsersFetchedByAuthorTag_, true)
  })
};

export const fetchBooksByCollection = {
  [types.FETCH_BOOKS_BY_COLLECTION.READY]: (state, action) => ({
    ...state,
    isBooksFetchedByCollection_: setStateFlag(state.isBooksFetchedByCollection_, false)
  }),
  [types.FETCH_BOOKS_BY_COLLECTION.SUCCESS]: (state, action) => ({
    ...state,
    isBooksFetchedByCollection_: setStateFlag(state.isBooksFetchedByCollection_, true)
  })
};

export const fetchBooksByUser = {
  [types.FETCH_BOOKS_BY_USER.READY]: (state, action) => ({
    ...state,
    isBooksFetchedByUser_: setStateFlag(state.isBooksFetchedByUser_, false)
  }),
  [types.FETCH_BOOKS_BY_USER.SUCCESS]: (state, action) => ({
    ...state,
    isBooksFetchedByUser_: setStateFlag(state.isBooksFetchedByUser_, true)
  })
};

export const reducer = createReducer(initialState, {
  ...fetchBookAndUser,
  ...fetchBooksAndUsers,
  ...fetchBooksAndUsersByTag,
  ...fetchBooksAndUsersByAuthorTag,
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
