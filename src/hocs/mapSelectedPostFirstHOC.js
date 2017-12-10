import React, { PureComponent } from 'react';
import { List } from 'immutable';

import { findIndex } from '../utils/ArrayUtils';

export const mapSelectedPostFirstHOC = (WrappedComponent) => {
  return class WithSelectedPostFirst extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const index = this._findIndexOfSelectedBook();
      if (index === -1) return <WrappedComponent { ...this.props } />;

      const newBookList = this._getSelectedBookFirst(index);
      const newUserList = this._getSelectedUserFirst(index);
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ newBookList }
          usersInfo={ newUserList } />
      );
    }
    _findIndexOfSelectedBook = () => {
      const { id, booksInfo } = this.props;
      return findIndex(booksInfo, b => b.id === id);
    }

    _getSelectedBookFirst = (index) => {
      const { booksInfo } = this.props;
      const selectedBook = booksInfo[index];
      return List(booksInfo).splice(index, 1).unshift(selectedBook).toJS();
    }

    _getSelectedUserFirst = (index) => {
      const { usersInfo } = this.props;
      const selectedUser = usersInfo[index];
      return List(usersInfo).splice(index, 1).unshift(selectedUser).toJS();
    }
  };
};
