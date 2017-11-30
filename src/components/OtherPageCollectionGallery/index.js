import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../GalleryParentComponent';
import OtherPageCollectionGalleryCard from '../OtherPageCollectionGalleryCard';
import { fetchCollectionsForOtherUserHOC } from '../../hocs/fetchCollectionsForOtherUserHOC';

const { flatten } = StyleSheet;
const { height } = Dimensions.get('window');

class OtherPageCollectionGallery extends GalleryParentComponent {
  render() {
    const { collections } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(collections) }
      </View>
    );
  }

  _getGalleryCard = (collection) => {
    return (
      <OtherPageCollectionGalleryCard
        key={ collection.id }
        id={ collection.id }
        label={ collection.label }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _onClickGalleryCard = (id, label) => {
    this.props.onClickGalleryCard(id, label);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});

export default compose(fetchCollectionsForOtherUserHOC)(OtherPageCollectionGallery);
