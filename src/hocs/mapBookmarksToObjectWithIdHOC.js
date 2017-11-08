import React, { PureComponent } from 'react';

export const mapBookmarksToObjectWithIdHOC = WrappedComponent => {
  return class WithMappedBookmarks extends PureComponent {
    render() {
      const bookmarks = this._mapBookmarksToObjectWithId(this.props.bookmarks);
      return (
        <WrappedComponent { ...this.props } bookmarks={ bookmarks } />
      );
    }

    _mapBookmarksToObjectWithId = bookmarksArray => {
      return bookmarksArray.map(bookmark => {
        return {
          id: bookmark,
          bookId: bookmark
        };
      });
    }
  };
};
