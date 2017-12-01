import React, { PureComponent } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

class SearchListItem extends PureComponent {
  render() {
    const { author, bookTitle, bookIds } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => { console.log('click!'); }}>
        <Text style={ styles.text }>
          { `${author}/${bookTitle}` }
        </Text>
      </TouchableHighlight>
    );
  }

  _onClickItem = () => {
    this.props.onClickItem();
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderWidth: .5,
    paddingVertical: 10,
    paddingLeft: 10
  },
  text: {
    fontSize: 15
  }
});

export default SearchListItem;
