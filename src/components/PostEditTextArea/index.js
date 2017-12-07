import React, { PureComponent } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';

class PostEditTextArea extends PureComponent {
  render() {
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.labelContainer }>
          <Text style={ styles.labelText }>
            어떤 생각이 이 페이지에 머물렀나요?
          </Text>
        </View>
        <View style={ styles.textAreaContainer }>
          <TextInput
            underlineColorAndroid="transparent"
            value={ this.props.textValue }
            onChangeText={ this.props.onChangeText }
            style={ styles.textAreaText }
            multiline />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 5,
    borderTopWidth: .5,
    borderBottomWidth: .5,
    alignSelf: 'stretch',
    backgroundColor: 'white'
  },
  labelContainer: {
    justifyContent: 'center',
    paddingLeft: 20
  },
  labelText: {
    fontSize: 12,
    textAlign: 'left'
  },
  textAreaContainer: {
    paddingTop: 5,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  textAreaText: {
    fontSize: 12
  }
});

export default PostEditTextArea;
