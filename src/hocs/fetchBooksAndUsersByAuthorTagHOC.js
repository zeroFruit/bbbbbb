import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { types } from '../ducks';
import { selectors as bookSelectors, actions as bookActions } from '../ducks/book';
import { selectors as userSelectors, actions as userActions } from '../ducks/user';
import { selectors as pageSelectors, actions as pageActions } from '../ducks/page';

export const fetchBooksAndUsersByAuthorTagHOC = (WrappedComponent) => {
  class WithBooksAndUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      await this._requestBooksAndUsers();
    }

    render() {
      console.log('By Author Tag');
      const { selectedBooksByTag_, selectedPostListUsers_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooksByTag_ }
          usersInfo={ selectedPostListUsers_ }
          requestBooksAndUsers={ this._requestBooksAndUsers }
          resetBooksAndPage={ this._resetBooksAndPage } />
      );
    }

    _requestBooksAndUsers = async () => {
      const { id, numOfFeedsPerLoad_, selectedListPage_, selectedBooksByTag_ } = this.props;
      if (selectedBooksByTag_.length >= selectedListPage_ * numOfFeedsPerLoad_) {
        await this.props.AsyncFetchBooksAndUsersByAuthorTagRequestAction(id, numOfFeedsPerLoad_, selectedListPage_);
      }
    }

    _resetBooksAndPage = () => {
      this.props.UnmountFetchedBooksByAuthorTagAction();
      this.props.UnmountSelectedPostListUsersAction();
      this.props.ResetSelectedListPageAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsers);
};

const mapStateToProps = state => ({
  selectedBooksByAuthorTag_: bookSelectors.GetSelectedBooksByAuthorTag(state),
  selectedPostListUsers_: userSelectors.GetSelectedPostListUsers(state),
  selectedListPage_: pageSelectors.GetSelectedListPage(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksAndUsersByAuthorTagRequestAction: (id, numOfFeeds, page) => ({
    type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG_REQUEST,
    payload: { id, numOfFeeds, page }
  }),
  UnmountFetchedBooksByAuthorTagAction: bookActions.UnmountFetchedBooksByAuthorTag,
  UnmountSelectedPostListUsersAction: userActions.UnmountSelectedPostListUsers,
  ResetSelectedListPageAction: pageActions.ResetSelectedListPage
}, dispatch);
