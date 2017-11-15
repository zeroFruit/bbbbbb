import React, { PureComponent } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../config';

class BookmarkCollectionAddButton extends PureComponent {
  render() {
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ this._onClickAddCollectionButton }>
        <View style={ styles.textContainer }>
          <Text>
            add
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onClickAddCollectionButton = () => {
    this.props.onClickAddCollectionButton();
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

export default BookmarkCollectionAddButton;
