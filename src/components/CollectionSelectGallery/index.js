import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../../components/GalleryParentComponent';
import CollectionSelectGalleryCard from '../../components/CollectionSelectGalleryCard';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';

class CollectionSelectGallery extends GalleryParentComponent {
  render() {
    const { bookmarks } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(bookmarks) }
      </View>
    );
  }

  _getGalleryCard = (card) => {
    return (
      <CollectionSelectGalleryCard
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: 'black'
  }
});

export default compose(fetchBookmarksHOC)(CollectionSelectGallery);
