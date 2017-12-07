import { List } from 'immutable';
import React, { PureComponent } from 'react';
import { View, Text, FlatList, CameraRoll, StyleSheet } from 'react-native';

import ThumbnailRow from '../ThumbnailRow';

import logger from '../../utils/LogUtils';
import { takeFromArray, dropFromArray } from '../../utils/ArrayUtils';
import { mockPhotos } from '../../../json/photos';

class NewPostCameraRollThumbnail extends PureComponent {
  state = {
    photos: []
  }

  async componentDidMount() {
    try {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: 20
      });
    } catch (e) {
      logger.log(e, 'CameraRoll getPhotos failed');
      this._setStatePhotos(mockPhotos);
    }
  }

  render() {
    const arrangedItems = this._renderRow(this.state.photos, 4);
    return (
      <View style={ styles.container }>
        <FlatList
          data={ arrangedItems }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderListItem } />
      </View>

    );
  }

  _renderRow = (items, numOfCol) => {
    const arrangedItems = [];
    let itemsLeft = items;

    while (itemsLeft.length > 0) {
      const itemsWithId = this._mapItemsWithId(takeFromArray(itemsLeft, numOfCol));
      arrangedItems.push(itemsWithId);
      itemsLeft = dropFromArray(itemsLeft, numOfCol);
    }

    return arrangedItems;
  }

  _renderListItem = ({ item }) => {
    return (
      <ThumbnailRow
        onClickThumbnail={ this._onClickThumbnail }
        key={ this._keyExtractor(item) }
        item={ item } />
    );
  }

  _keyExtractor = (item, index) => index

  _mapItemsWithId = items => items.map(item => ({ ...item, id: `${item.type}__${item.group_name}__${item.timestamp}` }))

  _setStatePhotos = (photos) => {
    this.setState({ photos });
  }

  _onClickThumbnail = (item) => {
    this.props.onClickThumbnail(item);
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90
  }
});

export default NewPostCameraRollThumbnail;
