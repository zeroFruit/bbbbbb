import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { SCREEN_WIDTH } from '../../config';

class NewPostSelectedCameraRoll extends PureComponent {
  render() {
    const { selectedThumbnail } = this.props;
    return (
      <View style={ styles.container }>
        {
          !selectedThumbnail ?
            <Text>
              사진을 선택해주세요.
            </Text> :
            <Image
              style={ styles.image }
              source={ { uri: selectedThumbnail.image.uri } } />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: SCREEN_WIDTH,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  }
});

export default NewPostSelectedCameraRoll;
