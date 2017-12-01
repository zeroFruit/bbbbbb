import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import agent from '../Agent';

import ProgressBar from '../components/ProgressBar';

import { types, selectors } from '../ducks';
import { selectors as bookSelectors, actions as bookActions, types as bookTypes } from '../ducks/book';
import { selectors as tagSelectors, types as tagTypes } from '../ducks/tag';
import { selectors as userSelectors } from '../ducks/user';
import { selectors as pageSelectors, actions as pageActions } from '../ducks/page';

export const fetchBooksAndUsersByTagHOC = (WrappedComponent) => {
  class WithBooksAndUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      isBooksAndUsersFetching: true
    };

    async componentDidMount() {
      const { id, numOfFeedsPerLoad_, page_ } = this.props;
      await this.props.AsyncFetchBooksAndUsersByTagRequestAction(id, numOfFeedsPerLoad_, page_);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isBooksAndUsersFetchedByTag_) {
        this._setStateIsBooksAndUsersFetching(false);
      }
    }

    componentWillUnmount() {
      this.props.UnmountFetchedBooksByTagAction();
    }

    render() {
      const { selectedBooksByTag_, selectedPostListUsers_ } = this.props;

      if (this.state.isBooksAndUsersFetching) {
        return <ProgressBar />;
      }

      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooksByTag_ }
          usersInfo={ selectedPostListUsers_ }
          requestBooksAndUsers={ this._requestBooksAndUsers }
          resetPage={ this._resetPage } />
      );
    }

    _setStateIsBooksAndUsersFetching = (state) => {
      this.setState({ isBooksAndUsersFetching: state });
    }

    _requestBooksAndUsers = async () => {
      const { booksInfo } = this.state;
      const { id, numOfFeedsPerLoad_, selectedListPage_ } = this.props;
      if (booksInfo.length >= selectedListPage_ * numOfFeedsPerLoad_) {
        await this.props.AsyncFetchBooksAndUsersByTagRequestAction(id, numOfFeedsPerLoad_, selectedListPage_);
      }
    }

    _resetPage = () => {
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
