import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectors as bookSelectors } from '../ducks/book';
import { selectors as bookmarkSelectors } from '../ducks/bookmark';
import { indexOfValueInArray } from '../utils/ArrayUtils';

export const mapBookmarksToBooksHOC = (WrappedComponent) => {
  class WithBookmarkedBooks extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { bookmarks, booksInfo, bookmarksAndBooks, myBooks_, myBookmarks_ } = this.props;
      console.log('myBooks_', myBooks_);
      console.log('myBookmarks_', myBookmarks_);
      const booksWithBookmark = this._setBookmarkToBooks(bookmarks, booksInfo);
      return (
        <WrappedComponent
          booksWithBookmark={ booksWithBookmark }
          { ...this.props } />
      );
    }

    _setBookmarkToBooks = (bookmarks, booksInfo) => {
      return booksInfo.map((book, index) => {
        const bookmarked = (indexOfValueInArray(bookmarks, index + 1) !== -1);
        return { ...book, bookmarked };
      });
    }
  }

  return connect(mapStateToProps, null)(WithBookmarkedBooks);
};

const mapStateToProps = state => ({
  myBooks_: bookSelectors.GetMyBooks(state),
  myBookmarks_: bookmarkSelectors.GetMyBookmarks(state)
});
