import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { types } from '../ducks';
import { selectors as userSelectors, actions as userActions } from '../ducks/user';
import { selectors as bookSelectors, actions as bookActions } from '../ducks/book';
import { selectors as pageSelectors, types as pageTypes } from '../ducks/page';

export const fetchBooksAndUsersHOC = (WrappedComponent) => {
  class WithUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      await this._requestBooksAndUsers();
    }

    render() {
      const { selectedBooks_, selectedUsers_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooks_ }
          usersInfo={ selectedUsers_ }
          requestBooksAndUsers={ this._requestBooksAndUsers }
          resetBooksAndPage={ this._resetBooksAndPage } />
      );
    }

    _requestBooksAndUsers = async () => {
      const { numOfFeedsPerLoad_, newsfeedPage_, selectedBooks_ } = this.props;
      if (selectedBooks_.length >= newsfeedPage_ * numOfFeedsPerLoad_) {
        await this.props.AsyncFetchBooksAndUsersRequestAction(numOfFeedsPerLoad_, newsfeedPage_);
      }
    }

    _resetBooksAndPage = () => {
      this.props.UnmountFetchedBooksAction();
      this.props.UnmountSelectedNewsfeedUsersAction();
      this.props.ResetNewsfeedPageAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithUsers);
};

const mapStateToProps = state => ({
  selectedBooks_: bookSelectors.GetSelectedBooks(state),
  selectedUsers_: userSelectors.GetSelectedUsers(state),
  newsfeedPage_: pageSelectors.GetNewsfeedPage(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksAndUsersRequestAction: (numOfFeeds, page) => ({
    type: types.FETCH_BOOKS_AND_USERS_REQUEST,
    payload: { numOfFeeds, page }
  }),
  ResetNewsfeedPageAction: () => ({
    type: pageTypes.RESET_NEWSFEED_PAGE
  }),
  UnmountFetchedBooksAction: bookActions.UnmountFetchedBooks,
  UnmountSelectedNewsfeedUsersAction: userActions.UnmountSelectedNewsfeedUsers
}, dispatch);
