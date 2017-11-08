import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

const propTypes = {
  imgSrc: string.isRequired,
  onClickImage: func.isRequired
};
const defaultProps = {};

class PostImage extends Component {
  render() {
    const { imgSrc } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ this._onClickImage }>
        <Image source={ { uri: imgSrc } } style={ styles.image } />
      </TouchableHighlight>
    );
  }

  _onClickImage = () => {
    this.props.onClickImage();
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
