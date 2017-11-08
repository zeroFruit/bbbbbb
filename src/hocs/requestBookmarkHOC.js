import React, { PureComponent } from 'react';
import agent from '../Agent';
import { USER_ID } from '../config';

export const requestBookmarkHOC = WrappedComponent => {
  return class WithBookmarkRequest extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;
    render() {
      return (
        <WrappedComponent
          onClickBookmarkAdd={ this._addBookmark }
          onClickBookmarkRemove={ this._removeBookmark }
          { ...this.props } />
      );
    }

    _addBookmark = async () => {
      const { bookId } = this.props;
      const bookmarks = await agent.Bookmark.addByBookId(bookId, USER_ID);
    }

    _removeBookmark = async () => {
      const { bookId } = this.props;
      const bookmarks = await agent.Bookmark.removeByBookId(bookId, USER_ID);
    }
  };
};
