import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { fetchBookByBookIdHOC } from '../../hocs/fetchBookByBookIdHOC';

const { string, func, number } = PropTypes;

const propTypes = {
};

const defaultProps = {
};

class BookmarkBookGalleryCard extends Component {
  render() {
    const { bookInfo } = this.props;
    const { img_src } = bookInfo;
    return (
      <TouchableHighlight style={ styles.container }>
        <Image
          style={ styles.image }
          source={ { uri: img_src } } />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

BookmarkBookGalleryCard.propTypes = propTypes;
BookmarkBookGalleryCard.defaultProps = defaultProps;

export default compose(fetchBookByBookIdHOC)(BookmarkBookGalleryCard);
