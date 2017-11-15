import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { SCREEN_WIDTH } from '../../config';

const { string } = PropTypes;

const propTypes = {
};

const defaultProps = {
};

class CollectionSelectGalleryCard extends PureComponent {
  render() {
    return (
      <TouchableHighlight style={ styles.container }>
        <View style={ styles.textContainer }>
          <Text>
            Bookmarked
          </Text>
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
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: .5,
    borderColor: 'black'
  }
});

CollectionSelectGalleryCard.propTypes = propTypes;
CollectionSelectGalleryCard.defaultProps = defaultProps;

export default CollectionSelectGalleryCard;
