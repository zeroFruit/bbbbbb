import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { takeFromArray, dropFromArray } from '../../utils/ArrayUtils';
import { NUM_OF_ROW } from '../../config';

const { width } = Dimensions.get('window');

class GalleryParentComponent extends Component {
  _renderGalleryCards = (galleryCardsProps) => {
    const arrangedCards = this._arrangeGalleryCards(galleryCardsProps);
    return this._mapArrangedGalleryCards(arrangedCards);
  }

  _arrangeGalleryCards = (galleryCardsProps) => {
    const arrangedCards = [];
    let galleryCardsLeft = galleryCardsProps;

    while (galleryCardsLeft.length > 0) {
      const galleryCardsInRow = takeFromArray(galleryCardsLeft, NUM_OF_ROW);
      arrangedCards.push(galleryCardsInRow);
      galleryCardsLeft = dropFromArray(galleryCardsLeft, NUM_OF_ROW);
    }

    return arrangedCards;
  }

  _mapArrangedGalleryCards = (arrangedCards) => {
    return arrangedCards.map((arrangedCardsInRow) => {
      const colKey = arrangedCardsInRow[0].id || 'add';
      return (
        <View style={ styles.Col } key={ colKey }>
          { this._mapCardsInRow(arrangedCardsInRow) }
        </View>
      );
    });
  }

  _mapCardsInRow = (cardsInRow) => {
    return cardsInRow.map((card) => {
      return (
        <View style={ styles.Row } key={ card.id }>
          { this._getGalleryCard(card) }
        </View>
      );
    });
  }

  _getGalleryCard = (card) => {}
}

const styles = StyleSheet.create({
  Col: {
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row'
  },
  Row: {
    borderColor: 'white',
    borderWidth: 1,
    width: width / 3
  }
});

export default GalleryParentComponent;
