import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../GalleryParentComponent';
import OtherPageBookGalleryCard from '../OtherPageBookGalleryCard';
import { fetchBooksByUserIdHOC } from '../../hocs/fetchBooksByUserIdHOC';

const { flatten } = StyleSheet;
const { height } = Dimensions.get('window');

class OtherPageBookGallery extends GalleryParentComponent {
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
      <OtherPageBookGalleryCard
        key={ bookInfo.id }
        bookInfo={ bookInfo }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _getContainerStyle = (isShown) => {
    return isShown ? flatten(styles.container) : flatten(styles.hiddenContainer);
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

export default compose(fetchBooksByUserIdHOC)(OtherPageBookGallery);
