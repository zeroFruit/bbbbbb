import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'immutable';
import { compose } from 'recompose';

import { fetchCollectionsHOC } from '../../hocs/fetchCollectionsHOC';
import GalleryParentComponent from '../GalleryParentComponent';
import BookmarkCollectionGalleryCard from '../BookmarkCollectionGalleryCard';
import BookmarkCollectionAddButton from '../BookmarkCollectionAddButton';

import { SCREEN_HEIGHT } from '../../config';

const { flatten } = StyleSheet;

class BookmarkCollectionGallery extends GalleryParentComponent {
  render() {
    const { isShown, collections } = this.props;
    const collectionsWithEmptyObj = List(collections).push({ id: 'add' }).toJS();
    const containerStyle = this._getContainerStyle(isShown);
    return (
      <View style={ containerStyle }>
        { this._renderGalleryCards(collectionsWithEmptyObj) }
      </View>
    );
  }

  _getGalleryCard = (collection) => {
    return (collection.id !== 'add') ?
      <BookmarkCollectionGalleryCard
        key={ collection.id }
        id={ collection.id }
        label={ collection.label }
        isDeletingMode={ this.props.isDeletingMode }
        onLongClickCollectionCard={ this._onLongClickCollectionCard }
        onClickDeleteButton={ this._onClickDeleteButton } /> :
      <BookmarkCollectionAddButton
        key="add"
        onClickAddCollectionButton={ this._onClickAddCollectionButton } />;
  }

  _getContainerStyle = (isShown) => {
    return isShown ? flatten(styles.container) : flatten(styles.hiddenContainer);
  }

  _onClickAddCollectionButton = () => {
    this.props.onClickAddCollectionButton();
  }

  _onLongClickCollectionCard = () => {
    this.props.onLongClickCollectionCard();
  }

  _onClickDeleteButton = (id) => {
    this.props.onClickCollectionDeleteButton(id);
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    zIndex: 1,
    position: 'absolute'
  },
  hiddenContainer: {
    zIndex: -1,
    position: 'absolute',
    top: 2 * SCREEN_HEIGHT
  }
});

export default compose(fetchCollectionsHOC)(BookmarkCollectionGallery);
