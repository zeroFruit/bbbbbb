import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectType as SelectType, headerType } from '../config';
import logger from '../utils/LogUtils';
import { selectors as tagSelectors } from '../ducks/tag';

export const fetchHeaderTitlePropsHOC = (WrappedComponent) => {
  class WithHeaderTitle extends PureComponent {
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
        case SelectType.SELECT_FROM_NEWSFEED_CLICKED_IMAGE:
          return this._getTagsWhenSelectFromNewsfeedClickedImage();
        default:
          logger.error('fetchHeaderTitleHOC, invalid select type');
      }
    }

    _getTagsWhenSelectFromNewsfeedClickedImage = () => {
      const { selectedBookTitleTag_, selectedBookAuthorTag_ } = this.props;
      if (selectedBookTitleTag_ && selectedBookAuthorTag_) {
        return { type: headerType.TAG, text: [selectedBookTitleTag_, selectedBookAuthorTag_] };
      }
      return { type: headerType.TAG, text: [] };
    }
  }

  return connect(mapStateToProps, null)(WithHeaderTitle);
};

const mapStateToProps = state => ({
  isSelectedBookTagFetched_: tagSelectors.GetIsSelectedBookTagFetched(state),
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state)
});
