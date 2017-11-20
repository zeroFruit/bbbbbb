import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { logWhenNotDefeind } from '../../utils/PropUtils';

import GalleryParentComponent from '../GalleryParentComponent';
import MyPageBookGalleryCard from '../MyPageBookGalleryCard';

const { arrayOf, shape, string, func, number } = PropTypes;

const propTypes = {
  onClickGalleryCard: func,
  galleryCardsProps: arrayOf(shape({
    imgSrc: string,
    user: number,
    tags: string,
    views: number
  })).isRequired
};
const defaultProps = {
  onClickGalleryCard: () => { logWhenNotDefeind('onClickGalleryCard'); }
};

class MyPageBookGallery extends GalleryParentComponent {
  render() {
    const { galleryCardsProps } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(galleryCardsProps) }
      </View>
    );
  }

  _getGalleryCard = (card) => {
    const { id, user, imgSrc } = card;
    return (
      <MyPageBookGalleryCard
        key={ id }
        onClickGalleryCard={ this._onClickGalleryCard }
        user={ user }
        id={ id }
        imgSrc={ imgSrc } />
    );
  }

  _onClickGalleryCard = (id, user) => {
    this.props.onClickGalleryCard(id, user);
  }
}

MyPageBookGallery.propTypes = propTypes;
MyPageBookGallery.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});

export default MyPageBookGallery;
