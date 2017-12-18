import React, { PureComponent } from 'react';
import { List } from 'immutable';
import BookmarkCollectionBookGallery from '../../components/BookmarkCollectionBookGallery';
import logger from '../../utils/LogUtils';
import { selectType } from '../../config';
import { navigateTo, setParamsToNavigation } from '../../Router';
import ViewManager from '../../ViewManager';
import * as _t from '../../ViewManager/_title';
import * as _h from '../../ViewManager/_header';

class BookmarkCollectionBook extends PureComponent {
  render() {
    return (
      <BookmarkCollectionBookGallery
        isShown
        id={ this.props.collectionId }
        isDeletingMode={ this.props.isDeletingMode }
        onClickCollectionBookGalleryCard={ this._onClickCollectionBookGalleryCard }
        onLongClickCollectionBookCard={ this._onLongClickCollectionBookCard }
        onClickAddCollectionBookButton={ this._onClickAddCollectionBookButton }
        onClickCollectionBookDeleteButton={ this._onClickCollectionBookDeleteButton } />
    );
  }

  _onClickCollectionBookGalleryCard = (id, user) => {
    const key = 'Post';
    const params = {
      id,
      user,
      vm: new ViewManager(
        selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE,
        selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE,
        _h._getTagHeaderProps,
        _t._getTextTitleProps
      ),
      selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE
    };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }

  _onLongClickCollectionBookCard = async () => {
    await this.props.setStateBookDeletingMode(true);
    await setParamsToNavigation({ navigation: this.props.parentNavigation }, {
      vm: new ViewManager(
        selectType.SELECT_FROM_COLLECTION_DELETE_BUTTON,
        selectType.SELECT_FROM_COLLECTION_DELETE_BUTTON,
        _h._getHeaderWithLabelsProps,
        undefined
      ),
      selectType: selectType.SELECT_FROM_COLLECTION_DELETE_BUTTON,
      isDeletingCollectionBookMode: this.props.isDeletingMode,
      onClickHeaderRightButton: this._onClickRemoveCompleteCollectionBookButton,
      onClickHeaderLeftButton: () => {}
    });
  }

  _onClickRemoveCompleteCollectionBookButton = async () => {
    await this.props.setStateBookDeletingMode(false);
    await setParamsToNavigation({ navigation: this.props.parentNavigation }, {
      isDeletingCollectionBookMode: this.props.isDeletingMode
    });
  }

  _onClickAddCollectionBookButton = () => {
    const key = 'collectionBookSelect';
    const params = {
      vm: new ViewManager(
        selectType.SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON,
        selectType.SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON,
        _h._getHeaderWithLabelsProps,
        undefined
      ),
      id: this.props.collectionId,
      selectType: selectType.SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON
    };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }

  _onClickCollectionBookDeleteButton = async (bid) => {
    this.props.setStateCollectionBookDeleteButtonClicked(true);
    await this.props.AsyncDeleteCollectionBookRequestAction(this.props.collectionId, List([bid]).toJS());
  }
}

export default BookmarkCollectionBook;
