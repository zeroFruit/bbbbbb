import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as bookActions, types as bookTypes } from '../ducks/bookReducer';
import { actions as bookmarkActions, types as bookmarkTypes } from '../ducks/bookmarkReducer';
import { USER_ID } from '../config';

const { func, bool, arrayOf, number } = PropTypes;

export const fetchBookmarksHOC = (WrappedComponent) => {
  const propTypes = {
    AddBookmarkSuccessAction: func.isRequired,
    RemoveBookmarkSuccessAction: func.isRequired,
    FetchBookmarkSuccessAction: func.isRequired,
    AsyncFetchBookmarkRequestAction: func.isRequired,
    isBookmarkAdded_: bool.isRequired,
    isBookmarkRemoved_: bool.isRequired,
    isBookmarkFetched_: bool.isRequired,
    myBookmarks_: arrayOf(number).isRequired
  };
  const defaultProps = {};

  class WithBookmarks extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      bookmarks: []
    };

    async componentDidMount() {
      await this._fetchBookmarks(USER_ID);
    }

    async componentWillReceiveProps(nextProps) {
      if (nextProps.isBookmarkAdded_) {
        this.props.AddBookmarkSuccessAction();
        await this._fetchBookmarks(USER_ID);
      }

      if (nextProps.isBookmarkRemoved_) {
        this.props.RemoveBookmarkSuccessAction();
        await this._fetchBookmarks(USER_ID);
      }

      if (nextProps.isBookmarkFetched_) {
        this._setStateBookmarks(nextProps.myBookmarks_);
        this.props.FetchBookmarkSuccessAction();
      }
    }

    render() {
      return (
        <WrappedComponent
          bookmarks={ this.state.bookmarks }
          { ...this.props } />
      );
    }

    _fetchBookmarks = async (userId) => {
      await this.props.AsyncFetchBookmarkRequestAction(userId);
    };

    _setStateBookmarks = (bookmarks) => {
      this.setState({ bookmarks });
    };
  }

  WithBookmarks.propTypes = propTypes;
  WithBookmarks.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(WithBookmarks);
};

const mapStateToProps = state => ({
  ...state.book,
  ...state.bookmark
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // TODO: 나중에 api request를 action으로 이동
    UpdatePageAction: bookActions.LoadNewsfeed,
    ResetPageAction: bookActions.ResetNewsfeed,
    AddBookmarkSuccessAction: bookmarkActions.AddBookmarkSuccess,
    RemoveBookmarkSuccessAction: bookmarkActions.RemoveBookmarkSuccess,
    FetchBookmarkSuccessAction: bookmarkActions.FetchBookmarkSuccess,
    AsyncFetchBookmarkRequestAction: (userId) => {
      console.log('container', userId);
      return {
        type: bookmarkTypes.FETCH_BOOKMARK_REQEUST,
        payload: userId
      };
    }
  }, dispatch);
};
