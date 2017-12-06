import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

class CameraButtonPanel extends PureComponent {
  render() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          style={ styles.button }
          onPress={ this._onPress }>
          <Text>{ ' ' }</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPress = () => {
    this.props.onPressButton();
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30
  }
});

export default CameraButtonPanel;
