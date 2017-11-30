import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import GalleryCardParentComponent from '../GalleryCardParentComponent';
import { fetchBookByBookIdHOC } from '../../hocs/fetchBookByBookIdHOC';

import { SCREEN_WIDTH } from '../../config';

const { string, shape } = PropTypes;

const propTypes = {
  bookInfo: shape({
    img_src: string
  })
};

const defaultProps = {
  bookInfo: {}
};

class CollectionSelectGalleryCard extends GalleryCardParentComponent {
  state = {
    selected: false
  };

  render() {
    const { selected } = this.state;
    const { bookInfo: { img_src, id } } = this.props;

    return (
      <View
        style={ styles.container }>
        <View>
          <Image
            style={ styles.image }
            source={ { uri: img_src } } />
          <Icon
            name={ !selected ? 'check-box-outline-blank' : 'check-box' }
            size={ 25 }
            style={ styles.checkBoxContainer }
            onPress={ () => this._onClickBookSelectButton(id) } />
        </View>
      </View>
    );
  }

  _onClickBookSelectButton = async (bookId) => {
    await this.props.onClickBookSelectButton(bookId);
    await this.setState({ selected: !this.state.selected });
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
  checkBoxContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5
  }
});

CollectionSelectGalleryCard.propTypes = propTypes;
CollectionSelectGalleryCard.defaultProps = defaultProps;

export default compose(fetchBookByBookIdHOC)(CollectionSelectGalleryCard);
