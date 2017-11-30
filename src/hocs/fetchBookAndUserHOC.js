import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from '../utils/ObjectUtils';
import {
  selectors as bookSelectors,
  types as bookTypes,
  actions as bookActions
} from '../ducks/book';
import {
  selectors as userSelectors,
  types as userTypes
} from '../ducks/user';

const { func } = PropTypes;

export const fetchBookAndUserHOC = (WrappedComponent) => {
  const propTypes = {
    AsyncFetchBookRequestAction: func.isRequired,
    AsyncFetchUserRequestAction: func.isRequired
  };
  const defaultProps = {};

  class WithBookAndUser extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      const { id, user } = this.props;
      await this.props.AsyncFetchBookRequestAction(id);
      await this.props.AsyncFetchUserRequestAction(user);
    }

    render() {
      const { selectedUserDisplayName_, selectedBook_ } = this.props;
      if (this._isLoading(selectedUserDisplayName_, selectedBook_)) {
        return (
          <View>
            <Text>
              Loading...
            </Text>
          </View>
        );
      }
      return (
        <WrappedComponent
          { ...this.props }
          userInfo={ { display_name: selectedUserDisplayName_ } }
          bookInfo={ selectedBook_ } />
      );
    }

    // TODO: HOC로 분리
    _isLoading = (displayName, book) => (
      displayName === undefined ||
      isEmpty(book)
    )
  }
  WithBookAndUser.propTypes = propTypes;
  WithBookAndUser.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(WithBookAndUser);
};

const mapStateToProps = state => ({
  selectedBook_: bookSelectors.GetSelectedBook(state),
  isBookFetched_: bookSelectors.GetIsBookFetched(state),
  selectedUserDisplayName_: userSelectors.GetSelectedUserDisplayName(state),
  isSelectedUserInfoFetched_: userSelectors.GetIsSelectedUserInfoFetched(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBookRequestAction: (bookId) => {
    return ({
      type: bookTypes.FETCH_BOOK_REQUEST,
      payload: bookId
    });
  },
  AsyncFetchUserRequestAction: (userId) => {
    return ({
      type: userTypes.FETCH_SELECTED_USER_REQUEST,
      payload: userId
    });
  },
  UnmountSelectedUserAction: () => ({
    type: userTypes.FETCH_SELECTED_USER_UNMOUNT
  })
}, dispatch);
