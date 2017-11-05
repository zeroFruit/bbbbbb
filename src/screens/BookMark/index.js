import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class BookMark extends Component {
  static navigationOptions = {
    tabBarLabel: 'b'
  };

  render() {
    const { container, btn } = styles;

    return (
      <View style={ container }>
        <Text style={ btn }>
          Book mark component
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
});

export default BookMark;
