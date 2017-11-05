import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

const { string, func, number } = PropTypes;

const propTypes = {
  onClickGalleryCard: func.isRequired,
  imgSrc: string.isRequired,
  id: number.isRequired,
  user: number.isRequired
};

const defaultProps = {
};

class GalleryCard extends Component {
  render() {
    const { imgSrc, id, user } = this.props;
    return (
      <TouchableHighlight
        onPress={ () => this.onClickGalleryCard(id, user) }>
        <Image
          style={ styles.image }
          source={ { uri: imgSrc } } />
      </TouchableHighlight>
    );
  }

  @autobind
  onClickGalleryCard(id, user) {
    this.props.onClickGalleryCard(id, user);
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  }
});

GalleryCard.propTypes = propTypes;
GalleryCard.defaultProps = defaultProps;

export default GalleryCard;
