import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { flatten } = StyleSheet;
const { height } = Dimensions.get('window');

class BookmarkCollectionGallery extends PureComponent {
  render() {
    const { isShown } = this.props;
    const containerStyle = this._getContainerStyle(isShown);

    return (
      <View style={ containerStyle }>
        <Text>
          collection gallery
        </Text>
      </View>
    );
  }

  _getContainerStyle = isShown => {
    return isShown ? flatten(styles.container) : flatten(styles.hiddenContainer);
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    zIndex: 1,
    position: 'absolute'
  },
  hiddenContainer: {
    zIndex: -1,
    position: 'absolute',
    top: 2 * height
  }
});

export default BookmarkCollectionGallery;
