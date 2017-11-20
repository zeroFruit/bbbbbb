import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import agent from '../Agent';

import ProgressBar from '../components/ProgressBar';

import { types, selectors } from '../ducks';
import { selectors as userSelectors } from '../ducks/user';
import { selectors as bookSelectors, actions as bookActions, types as bookTypes } from '../ducks/book';
import { selectors as pageSelectors, actions as pageActions, types as pageTypes } from '../ducks/page';

export const fetchBooksAndUsersHOC = (WrappedComponent) => {
  class WithUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      booksInfo: [],
      usersInfo: [],
      isBooksAndUsersFetching: true
    };

    async componentDidMount() {
      // const { numOfFeedsPerLoad_, newsfeedPage_ } = this.props;
      await this._requestBooksAndUsers();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isBooksAndUsersFetched_) {
        const { selectedBooks_, selectedUsers_ } = nextProps;
        this._setStateBooksInfo(selectedBooks_);
        this._setStateUsersInfo(selectedUsers_);
        this._setStateIsBooksAndUsersFetching(false);
      }
    }

    render() {
      if (this.state.isBooksAndUsersFetching) {
        return <ProgressBar />;
      }
      const { booksInfo, usersInfo } = this.state;
      // console.log('1', booksInfo.map(b => b.id));
      // console.log('2', usersInfo.map(u => u.id));
      // console.log('===================================\n');
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
      const { numOfFeedsPerLoad_, newsfeedPage_ } = this.props;
      if (booksInfo.length >= newsfeedPage_ * numOfFeedsPerLoad_) {
        await this.props.AsyncFetchBooksAndUsersRequestAction(numOfFeedsPerLoad_, newsfeedPage_);
      }
    }

    _resetPage = () => {
      this.props.ResetNewsfeedPageAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithUsers);
};

const mapStateToProps = state => ({
  isBooksAndUsersFetched_: selectors.GetIsBooksAndUsersFetched(state),
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
  })
}, dispatch);
