import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types } from '../ducks';
import {
  selectors as bookSelectors,
} from '../ducks/book';
import {
  selectors as userSelectors,
  types as userTypes
} from '../ducks/user';

export const fetchBookAndUserHOC = (WrappedComponent) => {
  class WithBookAndUser extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      const { id } = this.props;
      await this.props.AsyncFetchBookAndUserRequestAction(id);
    }

    render() {
      const { selectedUser_, selectedBook_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          userInfo={ selectedUser_ }
          bookInfo={ selectedBook_ } />
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBookAndUser);
};

const mapStateToProps = state => ({
  selectedBook_: bookSelectors.GetSelectedBook(state),
  isBookFetched_: bookSelectors.GetIsBookFetched(state),
  selectedUser_: userSelectors.GetSelectedUser(state),
  isSelectedUserInfoFetched_: userSelectors.GetIsSelectedUserInfoFetched(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBookAndUserRequestAction: bookId => ({
    type: types.FETCH_BOOK_AND_USER.REQUEST,
    payload: { bookId }
  }),
  UnmountSelectedUserAction: () => ({
    type: userTypes.FETCH_SELECTED_USER_UNMOUNT
  })
}, dispatch);
