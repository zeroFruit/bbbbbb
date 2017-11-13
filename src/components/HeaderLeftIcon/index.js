import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

const HeaderLeftIcon = ({ iconName, onClickLeftIcon }) => (
  <TouchableHighlight
    style={ styles.container }
    onPress={ onClickLeftIcon }>
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

HeaderLeftIcon.propTypes = {
  iconName: string.isRequired,
  onClickLeftIcon: func.isRequired
};
HeaderLeftIcon.defaultProps = {

};

export default HeaderLeftIcon;
