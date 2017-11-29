import React, { PureComponent } from 'react';
import BookmarkCollectionGallery from '../../components/BookmarkCollectionGallery';
import logger from '../../utils/LogUtils';
import { selectType } from '../../config';
import {
  navigateTo,
  setParamsToNavigation
} from '../../Router';

class BookmarkCollection extends PureComponent {
  render() {
    return (
      <BookmarkCollectionGallery
        isShown
        isDeletingMode={ this.props.isDeletingMode }
        onClickAddCollectionButton={ this._onClickAddCollectionButton }
        onClickCollectionDeleteButton={ this._onClickCollectionDeleteButton }
        onClickCollectionCard={ this._onClickCollectionCard }
        onLongClickCollectionCard={ this._onLongClickCollectionCard } />
    );
  }

  _onClickAddCollectionButton = () => {
    const key = 'collectionAdd';
    const params = { selectType: selectType.SELECT_FROM_COLLECTION_ADD_BUTTON };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }

  _onClickCollectionDeleteButton = async (id) => {
    this.props.setStateCollectionDeleteButtonClicked(true);
    await this.props.AsyncDeleteCollectionRequestAction(id);
  }

  _onClickCollectionCard = (id, label) => {
    this.props.setStateCollectionBookListMode(true);
    setParamsToNavigation({ navigation: this.props.parentNavigation }, {
      selectType: selectType.SELECT_FROM_COLLECTION_CARD,
      title: label,
      isCollectionBookListMode: this.props.isCollectionBookListMode,
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
    this.props.setStateScreenType(this.props.SCREEN_TYPE.COLLECTION_BOOK_LIST);
    this.props.setStateCollectionId(id);
  }

  _onLongClickCollectionCard = async () => {
    await this.props.setStateDeletingMode(true);
    await setParamsToNavigation({ navigation: this.props.parentNavigation }, {
      selectType: selectType.SELECT_FROM_COLLECTION_DELETE_BUTTON,
      isDeletingCollectionMode: this.props.isDeletingMode,
      onClickHeaderRightButton: this._onClickRemoveCompleteCollectionButton,
      onClickHeaderLeftButton: () => {}
    });
  }

  _onClickRemoveCompleteCollectionButton = async () => {
    await this._setStateDeletingMode(false);
    await setParamsToNavigation({ navigation: this.props.parentNavigation }, {
      isDeletingCollectionMode: this.props.isDeletingMode
    });
  }
}

export default BookmarkCollection;
