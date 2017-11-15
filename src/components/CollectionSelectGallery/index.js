import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../../components/GalleryParentComponent';
import CollectionSelectGalleryCard from '../../components/CollectionSelectGalleryCard';

class CollectionSelectGallery extends GalleryParentComponent {
  render() {
    const bookmark = [{ id: 1 }, { id: 2 }, { id: 3 }];
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(bookmark) }
      </View>
    );
  }

  _getGalleryCard = (card) => {
    return (
      <CollectionSelectGalleryCard
        key={ card.id } />
    );
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

export default CollectionSelectGallery;
