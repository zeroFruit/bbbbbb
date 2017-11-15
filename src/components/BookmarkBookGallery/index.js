import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../GalleryParentComponent';
import BookmarkBookGalleryCard from '../BookmarkBookGalleryCard';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { mapBookmarksToObjectWithIdHOC } from '../../hocs/mapBookmarksToObjectWithIdHOC';

const { flatten } = StyleSheet;
const { height } = Dimensions.get('window');

class BookmarkBookGallery extends GalleryParentComponent {
  render() {
    const { bookmarks, isShown } = this.props;
    const containerStyle = this._getContainerStyle(isShown);
    return (
      <View style={ containerStyle }>
        { this._renderGalleryCards(bookmarks) }
      </View>
    );
  }

  _getGalleryCard = (bookmarks) => {
    return (
      <BookmarkBookGalleryCard key={ bookmarks.id } bookId={ bookmarks.bookId } />
    );
  }

  _getContainerStyle = (isShown) => {
    return isShown ? flatten(styles.container) : flatten(styles.hiddenContainer);
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

export default compose(
  fetchBookmarksHOC,
  mapBookmarksToObjectWithIdHOC
)(BookmarkBookGallery);
