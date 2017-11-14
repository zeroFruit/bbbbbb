import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as tagSelectors, types as tagTypes } from '../ducks/tag';
import { selectors as bookSelectors } from '../ducks/book';
import { selectors as userSelectors } from '../ducks/user';
import { isEmpty, isObjectHasProperty } from '../utils/ObjectUtils';

const { bool, shape, func, number, string } = PropTypes;

export const fetchTagHOC = (WrappedComponent) => {
  const propTypes = {
    AsyncFetchTagRequestAction: func.isRequired,
    isBookFetched_: bool.isRequired,
    bookInfo: shape({
      author_tag_id: number,
      title_tag_id: number
    }).isRequired,
    selectedBookTitleTag_: string.isRequired,
    selectedBookAuthorTag_: string.isRequired,
    isSelectedBookTagFetched_: bool.isRequired
  };
  const defaultProps = {

  };

  class WithTag extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      await this._fetchTags(this.props);
    }

    render() {
      const {
        selectedBookTitleTag_,
        selectedBookAuthorTag_,
        selectedUserDisplayName_,
        isSelectedBookTagFetched_,
        selectedBook_
      } = this.props;

      return (
        <WrappedComponent
          { ...this.props }
          selectedBookTitleTag={ selectedBookTitleTag_ }
          selectedBookAuthorTag={ selectedBookAuthorTag_ }
          isSelectedBookTagFetched={ isSelectedBookTagFetched_ }
          bookInfo={ selectedBook_ }
          userInfo={ { display_name: selectedUserDisplayName_ } } />
      );
    }

    _fetchTags = async (props) => {
      const { isSelectedBookTagFetched_, id, user } = props;

      if (!isSelectedBookTagFetched_) {
        await this.props.AsyncFetchTagRequestAction(user, id);
      }
    }
  }

  WithTag.propTypes = propTypes;
  WithTag.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(WithTag);
};

const mapStateToProps = state => ({
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state),
  isSelectedBookTagFetched_: tagSelectors.GetIsSelectedBookTagFetched(state),
  selectedBook_: bookSelectors.GetSelectedBook(state),
  selectedUserDisplayName_: userSelectors.GetSelectedUserDisplayName(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchTagRequestAction: (user, id) => ({
    type: tagTypes.FETCH_BOOK_TAG_REQUEST,
    payload: { user, id }
  })
}, dispatch);
