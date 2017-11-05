import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

const { string } = PropTypes;

const propTypes = {
  imgSrc: string.isRequired
};
const defaultProps = {};

class PostImage extends Component {
  render() {
    const { imgSrc } = this.props;
    return (
      <TouchableHighlight style={ styles.container }>
        <Image source={ { uri: imgSrc } } style={ styles.image } />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  image: {
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'black'
  }
});

PostImage.propTypes = propTypes;
PostImage.defaultProps = defaultProps;

export default PostImage;
