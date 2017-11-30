import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import GalleryCardParentComponent from '../GalleryCardParentComponent';

const { string, func, number } = PropTypes;

const propTypes = {
  onClickGalleryCard: func.isRequired,
  imgSrc: string.isRequired,
  id: number.isRequired,
  user: number.isRequired
};

const defaultProps = {
};

class MyPageBookGalleryCard extends GalleryCardParentComponent {
  render() {
    const { imgSrc, id, user } = this.props;
    return (
      <TouchableHighlight
        onPress={ () => { this._onClickGalleryCard(id, user); } }>
        <Image
          style={ styles.image }
          source={ { uri: imgSrc } } />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: 'black'
  }
});

MyPageBookGalleryCard.propTypes = propTypes;
MyPageBookGalleryCard.defaultProps = defaultProps;

export default MyPageBookGalleryCard;
