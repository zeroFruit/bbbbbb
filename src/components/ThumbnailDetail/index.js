import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { SCREEN_WIDTH } from '../../config';

class ThumbnailDetail extends PureComponent {
  render() {
    const { photo } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => this._onClickThumbnail(photo) }>
        <Image
          style={ styles.image }
          source={ { uri: photo.image.uri } } />
      </TouchableHighlight>
    );
  }

  _onClickThumbnail = (item) => {
    this.props.onClickThumbnail(item);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH / 4
  },
  image: {
    height: SCREEN_WIDTH / 4,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  }
});

export default ThumbnailDetail;
