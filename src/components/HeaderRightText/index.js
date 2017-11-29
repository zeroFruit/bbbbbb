import React from 'react';
import { TouchableHighlight, View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

const HeaderRightText = ({ iconName, onClickRightText, label }) => (
  <TouchableHighlight
    style={ styles.container }
    onPress={ onClickRightText }>
    <View>
      <Text style={ styles.labelText }>
        { label }
      </Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'black',
  },
  labelText: {
    fontSize: 15
  }
});

HeaderRightText.propTypes = {
  onClickRightText: func.isRequired
};
HeaderRightText.defaultProps = {

};

export default HeaderRightText;
