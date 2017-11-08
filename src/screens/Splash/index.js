import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import { fetchMyInfoHOC } from '../../hocs/fetchMyInfoHOC';
import { navigateTo } from '../../Router';

class Splash extends Component {
  render() {
    const { container, btn } = styles;

    return (
      <View style={ container }>
        <Text
          style={ btn }
          onPress={ this.onClickLoginBtn }>
          로그인
        </Text>
      </View>
    );
  }

  onClickLoginBtn = () => {
    const key = 'main';
    navigateTo(this.props, key);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
});

export default compose(fetchMyInfoHOC)(Splash);
