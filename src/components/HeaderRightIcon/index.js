import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

const HeaderRightIcon = ({ iconName, onClickRightIcon }) => (
  <TouchableHighlight
    style={ styles.container }
    onPress={ onClickRightIcon }>
    <View>
      <Icon
        name={ iconName }
        size={ 40 } />
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
  }
});

HeaderRightIcon.propTypes = {
  iconName: string.isRequired,
  onClickRightIcon: func.isRequired
};
HeaderRightIcon.defaultProps = {

};

export default HeaderRightIcon;
