import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Col2ParentButtonGroups from '../Col2ParentButtonGroups';

class NewPostButtonGroups extends Col2ParentButtonGroups {
  render() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          style={ styles.buttonContainer }
          onPress={ this._onClickBooklistButton }>
          <View style={ styles.button }>
            <Text style={ styles.buttonText }>
              라이브러리
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ styles.buttonContainer }
          onPress={ this._onClickBookCollectionButton }>
          <View style={ styles.button }>
            <Text style={ styles.buttonText }>
              촬영
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  /* TODO: 메소드 이름 바꾸기 */
  _onClickBooklistButton = () => {
    this.props.setStateScreenType(this.props.SCREEN_TYPES.LIBRARY);
  }

  /* TODO: 메소드 이름 바꾸기 */
  _onClickBookCollectionButton = () => {
    this.props.setStateScreenType(this.props.SCREEN_TYPES.PICTURE);
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: .5,
    borderLeftWidth: .5,
    borderColor: 'black'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18
  }
});

export default NewPostButtonGroups;
