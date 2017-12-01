import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

class PostAddingPanel extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={ this._onClickAddPost }>
        <View style={ styles.container }>
          <Icon
            name="photo-camera"
            size={ 30 }
            containerStyle={ styles.iconContainer } />
          <Text style={ styles.text }>
            당신의 마음에 머문 페이지는 무엇인가요?
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onClickAddPost = () => {
    this.props.onClickAddPost();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    flex: 1
  },
  text: {
    flex: 4,
    fontSize: 15
  }
});

export default PostAddingPanel;
