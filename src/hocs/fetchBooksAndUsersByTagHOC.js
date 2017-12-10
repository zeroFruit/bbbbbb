import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProgressBar from '../components/ProgressBar';

import { types, selectors } from '../ducks';
import { selectors as bookSelectors, actions as bookActions, types as bookTypes } from '../ducks/book';
import { selectors as tagSelectors, types as tagTypes } from '../ducks/tag';
import { selectors as userSelectors } from '../ducks/user';
import { selectors as pageSelectors, actions as pageActions } from '../ducks/page';

export const fetchBooksAndUsersByTagHOC = (WrappedComponent) => {
  class WithBooksAndUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      await this._requestBooksAndUsers();
    }

    render() {
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
        await this.props.AsyncFetchBooksAndUsersByTagRequestAction(id, numOfFeedsPerLoad_, selectedListPage_);
      }
    }

    _resetBooksAndPage = () => {
      this.props.UnmountFetchedBooksByTagAction();
      this.props.ResetSelectedListPageAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsers);
};

const mapStateToProps = state => ({
  isBooksAndUsersFetchedByTag_: selectors.GetIsBooksAndUsersFetchedByTag(state),
  selectedBooksByTag_: bookSelectors.GetSelectedBooksByTag(state),
  selectedPostListUsers_: userSelectors.GetSelectedPostListUsers(state),
  selectedListPage_: pageSelectors.GetSelectedListPage(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksAndUsersByTagRequestAction: (id, numOfFeeds, page) => ({
    type: types.FETCH_BOOKS_AND_USERS_BY_TAG_REQUEST,
    payload: { id, numOfFeeds, page }
  }),
  UnmountFetchedBooksByTagAction: bookActions.UnmountFetchedBooksByTag,
  ResetSelectedListPageAction: pageActions.ResetSelectedListPage
}, dispatch);
