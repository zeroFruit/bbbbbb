import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../GalleryParentComponent';
import BookmarkCollectionBookGalleryCard from '../BookmarkCollectionBookGalleryCard';
import { fetchBooksByCollectionIdHOC } from '../../hocs/fetchBooksByCollectionIdHOC';

const { flatten } = StyleSheet;
const { height } = Dimensions.get('window');

class BookmarkCollectionBookGallery extends GalleryParentComponent {
  render() {
    const { booksInfo, isShown } = this.props;
    const containerStyle = this._getContainerStyle(isShown);
    return (
      <View style={ containerStyle }>
        { this._renderGalleryCards(booksInfo) }
      </View>
    );
  }

  _getGalleryCard = (bookInfo) => {
    return (
      <BookmarkCollectionBookGalleryCard
        key={ bookInfo.id }
        bookId={ bookInfo.id }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _getContainerStyle = (isShown) => {
    return isShown ? flatten(styles.container) : flatten(styles.hiddenContainer);
  }

  _onClickGalleryCard = (id, user) => {
    this.props.onClickCollectionBookGalleryCard(id, user);
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 1,
    position: 'absolute'
  },
  hiddenContainer: {
    zIndex: -1,
    position: 'absolute',
    top: 2 * height
  }
});

export default compose(fetchBooksByCollectionIdHOC)(BookmarkCollectionBookGallery);
