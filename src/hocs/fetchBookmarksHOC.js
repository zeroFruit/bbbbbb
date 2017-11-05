import React, { PureComponent } from 'react';
import agent from '../Agent';
import { USER_ID } from '../config';

export const fetchBookmarksHOC = WrappedComponent => {
  return class WithBookmarks extends PureComponent {
    state = {
      bookmarks: []
    };

    async componentDidMount() {
      await this._fetchBookmarks(USER_ID);
    }

    async componentWillReceiveProps(nextProps) {
      if (nextProps.isBookmarkAdded_) {
        this.props.AddBookmarkSuccessAction();
        await this._fetchBookmarks(USER_ID);
      }
    }

    render() {
      return (
        <WrappedComponent
          bookmarks={ this.state.bookmarks }
          { ...this.props } />
      );
    }

    _fetchBookmarks = async userId => {
      const { book_ids } = await agent.Bookmark.fetchByUserId(userId);
      this._setStateBookmarks(book_ids);
    };

    _setStateBookmarks = bookmarks => {
      this.setState({ bookmarks });
    };
  };
};
