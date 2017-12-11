import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tagTitlePropFormatter, textTitlePropFormatter } from '../utils/PropUtils';
import logger from '../utils/LogUtils';
import { selectors as userSelectors } from '../ducks/user';
import { selectors as tagSelectors } from '../ducks/tag';
import { selectors as bookSelectors } from '../ducks/book';
import { selectType as SelectType, headerType, headerTextType as HeaderTextType } from '../config';

export const fetchHeaderTitlePropsHOC = (WrappedComponent) => {
  class WithHeaderTitle extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { selectType } = this.props;
      const headerTitleProps = this._getHeaderTitleProps(selectType);
      return (
        <WrappedComponent
          { ...this.props }
          headerTitleProps={ headerTitleProps } />
      );
    }

    _getHeaderTitleProps = (selectType) => {
      switch(selectType) {
        case SelectType.FETCHED_FROM_NEWSFEED:
          return this._getPropsWhenFetchedFromNewsfeed();

        case SelectType.SELECT_FROM_NEWSFEED_CLICKED_IMAGE:
        case SelectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG:
        case SelectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE:
        case SelectType.SELECT_FROM_SEARCH_LIST:
          return this._getTagsWhenClickedImage();

        case SelectType.SELECT_FROM_MYPAGE_CLICKED_IMAGE:
        case SelectType.SELECT_FROM_OTHERPAGE_CLICKED_IMAGE:
        case SelectType.SELECT_FROM_OTHERPAGE_CLICKED_COLLECTION_BOOK:
          return this._getPropsWhenClickedImage();

        case SelectType.SELECT_FROM_POSTLIST_CLICKED_NICKNAME:
          return this._getPropsWhenSelectFromPostListClickedNickname();

        case SelectType.SELECT_FROM_COLLECTION_ADD_BUTTON:
        case SelectType.SELECT_FROM_COLLECTION_NEXT_BUTTON:
        case SelectType.SELECT_FROM_COLLECTION_DELETE_BUTTON:
        case SelectType.SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON:
          return this._getPropsWhenSelectFromCollectionButton();

        case SelectType.SELECT_FROM_COLLECTION_LIST_BUTTON:
        case SelectType.SELECT_FROM_COLLECTION_CARD:
          return this._getPropsForHeaderWithIcons();
        default:
          return this._getPropsDefault(selectType)
      }
    }

    _getPropsWhenFetchedFromNewsfeed = () => {
      return {
        type: headerType.TEXT,
        text: textTitlePropFormatter(-1, '북북북', HeaderTextType.NONE)
      };
    }

    _getTagsWhenClickedImage = () => {
      const {
        selectedBookTitleTag_,
        selectedBookAuthorTag_,
        selectedBook_
      } = this.props;
      if (selectedBookTitleTag_ && selectedBookAuthorTag_) {
        return {
          type: headerType.TAG,
          text: [
            tagTitlePropFormatter(selectedBook_.title_tag_id, selectedBookTitleTag_, HeaderTextType.TITLE),
            tagTitlePropFormatter(selectedBook_.author_tag_id, selectedBookAuthorTag_, HeaderTextType.AUTHOR)
          ]
        };
      }
      return { type: headerType.TAG, text: [] };
    }

    _getPropsWhenSelectFromPostListClickedNickname = () => {
      return {
        type: headerType.TEXT,
        text: textTitlePropFormatter(-1, this.props.headerTitle, HeaderTextType.NONE)
      };
    }

    _getPropsWhenClickedImage = () => {
      const { selectedUserDisplayName_, selectedBook_: { user_id } } = this.props;
      return {
        type: headerType.TEXT,
        text: textTitlePropFormatter(user_id, selectedUserDisplayName_, HeaderTextType.NICKNAME)
      };
    }

    _getTagsWhenSelectFromBookmarkClickedImage = () => {

    }

    _getPropsWhenSelectFromCollectionButton = () => {
      const { leftLabel, rightLabel, title } = this.props;
      return {
        type: headerType.TEXT,
        text: textTitlePropFormatter('id', title, HeaderTextType.NONE),
        header: {
          leftLabel,
          rightLabel
        }
      };
    }

    _getPropsForHeaderWithIcons = () => {
      const { leftIconName, rightIconName, title } = this.props;
      return {
        type: headerType.TEXT,
        text: textTitlePropFormatter('id', title, HeaderTextType.NONE),
        header: {
          leftIconName,
          rightIconName
        }
      };
    }
    _getPropsDefault = (selectType) => {
      logger.warn('fetchHeaderTitlePropsHOC, invalid select type:', selectType);
    }
  }

  return connect(mapStateToProps, null)(WithHeaderTitle);
};

const mapStateToProps = state => ({
  isSelectedBookTagFetched_: tagSelectors.GetIsSelectedBookTagFetched(state),
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state),
  selectedUserDisplayName_: userSelectors.GetSelectedUserDisplayName(state),
  selectedBook_: bookSelectors.GetSelectedBook(state)
});
