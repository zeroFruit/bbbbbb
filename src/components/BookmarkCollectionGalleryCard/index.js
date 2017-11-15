import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

const { width } = Dimensions.get('window');

const { string } = PropTypes;

const propTypes = {
  label: string.isRequired
};

const defaultProps = {
};

class BookmarkCollectionGalleryCard extends PureComponent {
  render() {
    const { label } = this.props;
    return (
      <TouchableHighlight style={ styles.container }>
        <View style={ styles.textContainer }>
          <Text>
            { label }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 3,
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

BookmarkCollectionGalleryCard.propTypes = propTypes;
BookmarkCollectionGalleryCard.defaultProps = defaultProps;

export default BookmarkCollectionGalleryCard;
