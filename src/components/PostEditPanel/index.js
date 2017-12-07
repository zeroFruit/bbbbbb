import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class PostEditPanel extends PureComponent {
  render() {
    const { label, placeholder, textValue } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.labelContainer }>
          <Text style={ styles.labelText }>{ label }</Text>
        </View>
        <View style={ styles.textInputContainer }>
          <TextInput
            underlineColorAndroid="transparent"
            value={ textValue }
            onChangeText={ this.props.onChangeText }
            placeholder={ placeholder || '' }
            style={ styles.textInputText } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    borderTopWidth: .5,
    borderBottomWidth: .5,
    backgroundColor: 'white'
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 12
  },
  textInputContainer: {
    flex: 4,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20
  },
  textInputText: {
    fontSize: 12,
    textAlign: 'left'
  }
});

export default PostEditPanel;
