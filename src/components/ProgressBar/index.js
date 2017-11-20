import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const ProgressBar = props => (
  <View style={ styles.container }>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ProgressBar;
