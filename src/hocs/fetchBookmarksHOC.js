import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../ducks';
import { selectors as bookSelectors, actions as bookActions, types as bookTypes } from '../ducks/book';
import { selectors as bookmarkSelectors, actions as bookmarkActions, types as bookmarkTypes } from '../ducks/bookmark';
import { USER_ID } from '../config';

const { func, bool, arrayOf, number } = PropTypes;

export const fetchBookmarksHOC = (WrappedComponent) => {
  const propTypes = {};
  const defaultProps = {};

  class WithBookmarks extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

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
    }

    render() {
      const { myBookmarks_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          bookmarks={ myBookmarks_ } />

      );
    }

    _fetchBookmarks = async (userId) => {
      await this.props.AsyncFetchBookmarkRequestAction(userId);
    };
  }

  WithBookmarks.propTypes = propTypes;
  WithBookmarks.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(WithBookmarks);
};


const mapStateToProps = state => ({
  isBookmarkAdded_: bookmarkSelectors.GetIsBookmarkedAdded(state),
  isBookmarkRemoved_: bookmarkSelectors.GetIsBookmarkedRemoved(state),
  myBookmarks_: selectors.BookmarksWithIdProp(state)
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    AddBookmarkSuccessAction: () => ({
      type: bookmarkTypes.ADD_BOOKMARK.SUCCESS
    }),
    RemoveBookmarkSuccessAction: () => ({
      type: bookmarkTypes.REMOVE_BOOKMARK.SUCCESS
    }),
    AsyncFetchBookmarkRequestAction: (userId) => {
      return {
        type: bookmarkTypes.FETCH_BOOKMARK.REQUEST,
        payload: userId
      };
    }
  }, dispatch);
};
