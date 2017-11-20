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
import { concatArrays } from '../utils/ArrayUtils';

export const fetchBooksAndUsersByTagHOC = (WrappedComponent) => {
  class WithBooksAndUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      booksInfo: [],
      usersInfo: [],
      isBooksAndUsersFetching: true
    };

    async componentDidMount() {
      const { id, numOfFeedsPerLoad_, page_ } = this.props;
      await this.props.AsyncFetchBooksAndUsersByTagRequestAction(id, numOfFeedsPerLoad_, page_);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isBooksAndUsersFetchedByTag_) {
        const { selectedBooksByTag_, selectedPostListUsers_ } = nextProps;
        this._setStateBooksInfo(selectedBooksByTag_);
        this._setStateUsersInfo(selectedPostListUsers_);
        this._setStateIsBooksAndUsersFetching(false);
      }
    }

    render() {
      if (this.state.isBooksAndUsersFetching) {
        return <ProgressBar />;
      }

      const { booksInfo, usersInfo } = this.state;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          requestBooksAndUsers={ this._requestBooksAndUsers }
          resetPage={ this._resetPage } />
      );
    }

    _setStateIsBooksAndUsersFetching = (state) => {
      this.setState({ isBooksAndUsersFetching: state });
    }

    _setStateBooksInfo = (state) => {
      this.setState({ booksInfo: state });
    }

    _setStateUsersInfo = (state) => {
      this.setState({ usersInfo: state });
    }

    /*
      TODO: 현재 blockOnMomentumScrollEndHOC에서 사용되고 있다. 컴포넌트 안으로 옮기기 */
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
  ResetSelectedListPageAction: pageActions.ResetSelectedListPage
}, dispatch);
