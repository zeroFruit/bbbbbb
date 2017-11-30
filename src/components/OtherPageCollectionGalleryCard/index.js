import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import GalleryCardParentComponent from '../GalleryCardParentComponent';
import { SCREEN_WIDTH } from '../../config';

class OtherPageBookGalleryCard extends GalleryCardParentComponent {
  render() {
    const { label, id } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => this._onClickGalleryCard(id, label) }>
        <View style={ styles.textContainer }>
          <Text>
            { label }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onClickGalleryCard = (id, label) => {
    this.props.onClickGalleryCard(id, label);
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    borderWidth: .5,
    borderColor: 'black'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: .5,
    borderColor: 'black'
  }
});


export default OtherPageBookGalleryCard;
