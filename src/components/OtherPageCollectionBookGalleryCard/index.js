import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import GalleryCardParentComponent from '../GalleryCardParentComponent';
import { fetchBookByBookIdHOC } from '../../hocs/fetchBookByBookIdHOC';

import { SCREEN_WIDTH } from '../../config';

const { string, func, number, shape } = PropTypes;

const propTypes = {
  bookInfo: shape({
    img_src: string
  })
};

const defaultProps = {
  bookInfo: {}
};

class BookmarkCollectionBookGalleryCard extends GalleryCardParentComponent {
  render() {
    const { bookInfo: { img_src, id, user_id } } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => { this._onClickGalleryCard(id, user_id); } }>
        <View>
          <Image
            style={ styles.image }
            source={ { uri: img_src } } />
        </View>

      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    borderWidth: .5,
    borderColor: 'black'
  },
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  }
});

BookmarkCollectionBookGalleryCard.propTypes = propTypes;
BookmarkCollectionBookGalleryCard.defaultProps = defaultProps;

export default compose(fetchBookByBookIdHOC)(BookmarkCollectionBookGalleryCard);
