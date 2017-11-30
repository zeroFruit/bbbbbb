import React, { PureComponent } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../config';

class SearchList extends PureComponent {
  render() {
    const testItems = [{
      id: 1,
      text: 'test-1'
    }, {
      id: 2,
      text: 'test-2'
    }, {
      id: 3,
      text: 'test-3'
    }];
    return (
      <View style={ styles.container }>
        <FlatList
          data={ testItems }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem } />
      </View>
    );
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => {
    return (
      <View>
        <Text>{ item.text }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3'
  }
});

export default SearchList;
