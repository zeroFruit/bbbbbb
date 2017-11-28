import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../../components/GalleryParentComponent';
import BookmarkSelectGalleryCard from '../../components/BookmarkSelectGalleryCard';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { filterMyBookmarksFromCollectionBooksHOC } from '../../hocs/filterMyBookmarksFromCollectionBooksHOC';

class BookmarkSelectGallery extends GalleryParentComponent {
  render() {
    const { filteredBookmarks } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(filteredBookmarks) }
      </View>
    );
  }

  _getGalleryCard = (card) => {
    return (
      <BookmarkSelectGalleryCard
        key={ card.id }
        bookId={ card.bookId }
        onClickBookSelectButton={ this._onClickBookSelectButton } />
    );
  }

  _onClickBookSelectButton = (bookId) => {
    this.props.onClickBookSelectButton(bookId);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: 'black'
  }
});

export default compose(
  fetchBookmarksHOC,
  filterMyBookmarksFromCollectionBooksHOC
)(BookmarkSelectGallery);
