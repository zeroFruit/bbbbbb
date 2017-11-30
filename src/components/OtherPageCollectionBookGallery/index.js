import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../GalleryParentComponent';
import OtherPageCollectionBookGalleryCard from '../OtherPageCollectionBookGalleryCard';
import { fetchBooksByCollectionIdHOC } from '../../hocs/fetchBooksByCollectionIdHOC';

class OtherPageCollectionBookGallery extends GalleryParentComponent {
  render() {
    const { booksInfo } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(booksInfo) }
      </View>
    );
  }

  _getGalleryCard = (bookInfo) => {
    return (
      <OtherPageCollectionBookGalleryCard
        key={ bookInfo.id }
        bookId={ bookInfo.id }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _onClickGalleryCard = (id, user) => {
    this.props.onClickGalleryCard(id, user);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});

export default compose(fetchBooksByCollectionIdHOC)(OtherPageCollectionBookGallery);
