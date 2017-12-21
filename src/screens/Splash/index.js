import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { compose } from 'recompose';

import { navigateTo } from '../../Router';
import Auth from '../../Auth';

class Splash extends Component {
  state = {
    uid: ''
  };
  render() {
    const { container, btn, textInput } = styles;

    return (
      <View style={ container }>
        <TextInput
          style={ textInput }
          underlineColorAndroid="transparent"
          onChangeText={ this._onChangeText }
          value={ this.state.uid } />
        <Text
          style={ btn }
          onPress={ this._onClickLoginBtn }>
          로그인
        </Text>
      </View>
    );
  }

  _onClickLoginBtn = async () => {
    const auth = new Auth();
    const { uid } = this.state;
    if (auth.isValidUid(parseInt(uid))) {
      await this._authenticate(uid);
      const key = 'main';
      navigateTo(this.props, key);
    } else {
      Alert.alert('부적합한 uid입니다.');
    }
  }

  _onChangeText = (uid) => {
    this.setState({ uid });
  }

  _authenticate = async (uid) => {
    const auth = new Auth();
    await this.props.AsyncFetchMyInfoRequestAction(uid);
    auth.setId(uid);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: 80,
    fontSize: 15,
    textAlign: 'center',
    borderWidth: .5,
    marginBottom: 20
  },
  btn: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
});

export default Splash;
