import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { types } from '../ducks';
import { selectors as bookSelectors, actions as bookActions } from '../ducks/book';
import { selectors as userSelectors, actions as userActions } from '../ducks/user';
import { selectors as pageSelectors, actions as pageActions } from '../ducks/page';

export const __fetchBooksAndUsersByTagHOC = (WrappedComponent) => {
  class WithBooksAndUsersByTag extends PureComponent {
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

    /*
      TODO:
        bid만 가지고 books and users fetch하는 hoc 분리/삭제
    */
    _requestBooksAndUsers = async () => {
      const { athrid, titid, numOfFeedsPerLoad_, selectedListPage_, selectedBooksByTag_ } = this.props;
      if (selectedBooksByTag_.length >= selectedListPage_ * numOfFeedsPerLoad_) {
        await this.props.AsyncFetchBooksAndUsersByTagAction(athrid, titid, numOfFeedsPerLoad_, selectedListPage_);
      }
    }

    _resetBooksAndPage = () => {
      this.props.UnmountFetchedBooksByTagAction();
      this.props.UnmountSelectedPostListUsersAction();
      this.props.ResetSelectedListPageAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsersByTag);
};

const mapStateToProps = state => ({
  selectedBooksByTag_: bookSelectors.GetSelectedBooksByTag(state),
  selectedPostListUsers_: userSelectors.GetSelectedPostListUsers(state),
  selectedListPage_: pageSelectors.GetSelectedListPage(state),
  numOfFeedsPerLoad_: pageSelectors.GetNumOfFeedsPerLoad(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksAndUsersByTagAction: (athrid, titid, numOfFeeds, page) => ({
    type: types.FETCH_BOOKS_AND_USERS_BY_TAG.REQUEST,
    payload: { athrid, titid, numOfFeeds, page }
  }),
  UnmountFetchedBooksByTagAction: bookActions.UnmountFetchedBooksByTag,
  UnmountSelectedPostListUsersAction: userActions.UnmountSelectedPostListUsers,
  ResetSelectedListPageAction: pageActions.ResetSelectedListPage
}, dispatch);
