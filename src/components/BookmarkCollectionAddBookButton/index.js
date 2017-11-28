import React, { PureComponent } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../config';

class BookmarkCollectionAddBookButton extends PureComponent {
  render() {
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ this._onClickAddCollectionBookButton }>
        <View style={ styles.textContainer }>
          <Text>
            add
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onClickAddCollectionBookButton = () => {
    this.props.onClickAddCollectionBookButton();
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    borderWidth: .5,
    borderColor: 'black'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: .5,
    borderColor: 'black'
  }
});

export default BookmarkCollectionAddBookButton;
