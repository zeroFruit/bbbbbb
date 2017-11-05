import React, { PureComponent } from 'react';
import agent from '../Agent';
import { USER_ID } from '../config';

export const requestBookmarkHOC = WrappedComponent => {
  return class WithBookmarkRequest extends PureComponent {
    render() {
      return (
        <WrappedComponent
          onClickbookmark={ this._bookmark }
          { ...this.props } />
      );
    }

    _bookmark = async() => {
      const { bookId } = this.props;
      const bookmark = await agent.Bookmark.addByBookId(bookId, USER_ID);
    }
  };
};
