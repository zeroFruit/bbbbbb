import React, { PureComponent } from 'react';
import BookmarkBookGallery from '../../components/BookmarkBookGallery';
import logger from '../../utils/LogUtils';
import { selectType } from '../../config';
import { navigateTo } from '../../Router';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';
import * as _t from '../../ViewManager/_title';

class BookmarkBook extends PureComponent {
  render() {
    return (
      <BookmarkBookGallery
        isShown
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _onClickGalleryCard = (id, user) => {
    const key = 'Post';
    const vm = new ViewManager(
      selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE,
      selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE,
      _h._getTagHeaderProps,
      _t._getTextTitleProps
    );
    const params = {
      vm,
      id,
      user,
      selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE
    };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }
}

export default BookmarkBook;
