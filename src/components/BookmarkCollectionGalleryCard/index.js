import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import GalleryCardParentComponent from '../GalleryCardParentComponent';
import { SCREEN_WIDTH } from '../../config';

const { string } = PropTypes;

const propTypes = {
  label: string.isRequired
};

const defaultProps = {
};

class BookmarkCollectionGalleryCard extends GalleryCardParentComponent {
  render() {
    const { label, isDeletingMode, id } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => this._onClickGalleryCard(id, label) }
        onLongPress={ this._onLongPressCard }>
        <View style={ styles.textContainer }>
          <Text>
            { label }
          </Text>
          {
            this._renderDeleteButton(isDeletingMode)
          }
        </View>
      </TouchableHighlight>
    );
  }

  _onClickGalleryCard = (id, label) => {
    this.props.onClickCollectionCard(id, label);
  }

  _onLongPressCard = () => {
    this.props.onLongClickCollectionCard();
  }

  _renderDeleteButton = (isDeletingMode) => {
    const { id } = this.props;
    return isDeletingMode ?
      <Icon
        name="remove-circle-outline"
        size={ 25 }
        style={ styles.deleteButtonContainer }
        onPress={ () => this._onClickDeleteButton(id) } /> :
      null;
  }

  _onClickDeleteButton = (id) => {
    this.props.onClickDeleteButton(id);
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
  },
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5
  }
});

BookmarkCollectionGalleryCard.propTypes = propTypes;
BookmarkCollectionGalleryCard.defaultProps = defaultProps;

export default BookmarkCollectionGalleryCard;
