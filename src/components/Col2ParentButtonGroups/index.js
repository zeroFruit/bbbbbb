import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const { func } = PropTypes;

const propTypes = {
  onClickBooklistButton: func.isRequired,
  onClickCollectionButton: func.isRequired
};

const defaultProps = {};

class Col2ParentButtonGroups extends PureComponent {
  render() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          style={ styles.buttonContainer }
          onPress={ this._onClickBooklistButton }>
          <View>
            <Icon
              name="apps"
              size={ 30 } />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ styles.buttonContainer }
          onPress={ this._onClickBookCollectionButton }>
          <View>
            <Icon
              name="collections"
              size={ 30 } />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  /* TODO: 메소드 이름 일반화 하기 */
  _onClickBooklistButton = () => {
    this.props.onClickBooklistButton();
  }

  /* TODO: 메소드 이름 일반화 하기 */
  _onClickBookCollectionButton = () => {
    this.props.onClickCollectionButton();
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: .5,
    borderLeftWidth: .5,
    borderColor: 'black'
  }
});

Col2ParentButtonGroups.propTypes = propTypes;
Col2ParentButtonGroups.defaultProps = defaultProps;

export default Col2ParentButtonGroups;
