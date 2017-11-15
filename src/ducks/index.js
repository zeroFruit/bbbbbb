import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import book, { selectors as bookSelectors } from './book';
import bookmark, { selectors as bookmarkSelectors } from './bookmark';
import user from './user';
import tag from './tag';
import collection from './collection';

export default combineReducers({
  book,
  bookmark,
  user,
  tag,
  collection
});

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
  )
};
