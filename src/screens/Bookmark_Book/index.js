import React, { PureComponent } from 'react';
import BookmarkBookGallery from '../../components/BookmarkBookGallery';
import logger from '../../utils/LogUtils';
import { selectType } from '../../config';
import { navigateTo } from '../../Router';

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
    const params = { id, user, selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }
}

export default BookmarkBook;
