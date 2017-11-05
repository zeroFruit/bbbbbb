import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { takeFromArray, dropFromArray } from '../../utils/ArrayUtils';
import { logWhenNotDefeind } from '../../utils/PropUtils';

import GalleryCard from '../GalleryCard';

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

const NUM_OF_ROW = 3;

class Gallery extends Component {
  render() {
    const { galleryCardsProps } = this.props;
    return (
      <View style={ styles.container }>
        { this.renderGalleryCards(galleryCardsProps) }
      </View>
    );
  }

  @autobind
  renderGalleryCards(galleryCardsProps) {
    const arrangedCards = this.arrangeGalleryCards(galleryCardsProps);
    return this.mapArrangedGalleryCards(arrangedCards);
  }

  arrangeGalleryCards(galleryCardsProps) {
    const arrangedCards = [];
    let galleryCardsLeft = galleryCardsProps;

    while (galleryCardsLeft.length > 0) {
      const galleryCardsInRow = takeFromArray(galleryCardsLeft, NUM_OF_ROW);
      arrangedCards.push(galleryCardsInRow);
      galleryCardsLeft = dropFromArray(galleryCardsLeft, NUM_OF_ROW);
    }

    return arrangedCards;
  }

  mapArrangedGalleryCards(arrangedCards) {
    return arrangedCards.map(arrangedCardsInRow => {
      const colKey = arrangedCardsInRow[0].id;
      return (
        <View style={ styles.Col } key={ colKey }>
          { this.mapCardsInRow(arrangedCardsInRow) }
        </View>
      );
    });
  }

  mapCardsInRow(cardsInRow) {
    return cardsInRow.map(card => {
      return (
        <View style={ styles.Row } key={ card.id }>
          { this.getGalleryCard(card) }
        </View>
      );
    });
  }

  @autobind
  getGalleryCard(card) {
    const { onClickGalleryCard } = this.props;
    const { id, user, imgSrc } = card;
    return (
      <GalleryCard
        key={ id }
        onClickGalleryCard={ onClickGalleryCard }
        user={ user }
        id={ id }
        imgSrc={ imgSrc } />
    );
  }
}

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  Col: {
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row'
  },
  Row: {
    borderColor: 'white',
    borderWidth: 1,
    flex: 1
  }
});

export default Gallery;
