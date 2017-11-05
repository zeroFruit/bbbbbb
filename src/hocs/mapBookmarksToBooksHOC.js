import React, { Component } from 'react';
import { indexOfValueInArray } from '../utils/ArrayUtils';

export const mapBookmarksToBooksHOC = WrappedComponent => {
  return class withBookmarkedBooks extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { bookmarks, booksInfo } = this.props;
      const booksWithBookmark = this._setBookmarkToBooks(bookmarks, booksInfo);
      return (
        <WrappedComponent
          booksWithBookmark={ booksWithBookmark }
          { ...this.props } />
      );
    }

    _setBookmarkToBooks = (bookmarks, booksInfo) => {
      return booksInfo.map((_bookWithBookmark, index) => {
        _bookWithBookmark.bookmarked = indexOfValueInArray(bookmarks, index + 1) !== -1;
        return _bookWithBookmark;
      });
    }
  };
};
