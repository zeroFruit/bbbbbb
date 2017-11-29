import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { fetchBookByBookIdHOC } from '../../hocs/fetchBookByBookIdHOC';

import { SCREEN_WIDTH } from '../../config';

const { string, func, number, shape } = PropTypes;

const propTypes = {
  bookInfo: shape({
    img_src: string
  })
};

const defaultProps = {
  bookInfo: {}
};

class BookmarkCollectionBookGalleryCard extends Component {
  render() {
    const { bookInfo: { img_src, id, user_id }, isDeletingMode } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => { this._onClickGalleryCard(id, user_id); } }
        onLongPress={ this._onLongPressCard }>
        <View>
          <Image
            style={ styles.image }
            source={ { uri: img_src } } />
          {
            this._renderDeleteButton(isDeletingMode)
          }
        </View>

      </TouchableHighlight>
    );
  }

  _onClickGalleryCard = (id, user) => {
    this.props.onClickGalleryCard(id, user);
  }

  _onLongPressCard = () => {
    this.props.onLongClickCollectionBookCard();
  }

  _renderDeleteButton = (isDeletingMode) => {
    const { bookInfo: { id } } = this.props;
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
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  },
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5
  }
});

BookmarkCollectionBookGalleryCard.propTypes = propTypes;
BookmarkCollectionBookGalleryCard.defaultProps = defaultProps;

export default compose(fetchBookByBookIdHOC)(BookmarkCollectionBookGalleryCard);
