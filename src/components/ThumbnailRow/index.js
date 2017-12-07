import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ThumbnailDetail from '../ThumbnailDetail';

class ThumbnailRow extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderItem(item) }
      </View>
    );
  }

  _renderItem = (item) => {
    return item.map(photo => (<ThumbnailDetail
      key={ photo.id }
      photo={ photo }
      onClickThumbnail={ this._onClickThumbnail } />));
  }

  _onClickThumbnail = (item) => {
    this.props.onClickThumbnail(item);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default ThumbnailRow;
