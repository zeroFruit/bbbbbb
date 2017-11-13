import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as tagSelectors, types as tagTypes } from '../ducks/tag';
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

  class WithTag extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentWillReceiveProps(nextProps) {
      const { bookInfo, isSelectedBookTagFetched_ } = nextProps;

      if (this._shouldRequestTagAction(bookInfo, isSelectedBookTagFetched_)) {
        const { author_tag_id, title_tag_id } = bookInfo;
        await this.props.AsyncFetchTagRequestAction(author_tag_id, title_tag_id);
      }
    }

    render() {
      const {
        selectedBookTitleTag_,
        selectedBookAuthorTag_
      } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          selectedBookTitleTag_={ selectedBookTitleTag_ }
          selectedBookAuthorTag_={ selectedBookAuthorTag_ } />
      );
    }
    _shouldRequestTagAction = (bookInfo, isSelectedBookTagFetched_) => (
      this._isObjectHasTagIds(bookInfo) && !isSelectedBookTagFetched_
    );


    _isObjectHasTagIds = bookInfo => (
      isObjectHasProperty(bookInfo, 'author_tag_id') &&
      isObjectHasProperty(bookInfo, 'title_tag_id')
    )
  }

  WithTag.propTypes = propTypes;
  WithTag.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(WithTag);
};

const mapStateToProps = state => ({
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state),
  isSelectedBookTagFetched_: tagSelectors.GetIsSelectedBookTagFetched(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchTagRequestAction: (authorTagId, bookTagId) => ({
    type: tagTypes.FETCH_BOOK_TAG_REQUEST,
    payload: { authorTagId, bookTagId }
  })
}, dispatch);
