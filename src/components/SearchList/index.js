import React, { PureComponent } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import SearchListItem from '../SearchListItem';

class SearchList extends PureComponent {
  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          data={ this.props.searchResults }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem } />
      </View>
    );
  }

  _keyExtractor = item => item.title.id;

  _renderItem = ({ item }) => {
    const { author, title } = item;
    return (
      <SearchListItem
        athrid={ author.id }
        author={ author.book_author }
        titid={ title.id }
        bookTitle={ title.book_title }
        bookIds={ title.book_ids }
        onClickItem={ this._onClickItem } />
    );
  }

  _onClickItem = (athrid, titid) => {
    this.props.onClickSearchListItem(athrid, titid);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3'
  }
});

export default SearchList;
