import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withLoaderHOC as WithLoader } from '../../hocs/withLoaderHOC';
import { selectType } from '../../config';
import logger from '../../utils/LogUtils';

const { shape, string } = PropTypes;

const propTypes = {
  selectType: string
};
const defaultProps = {
  selectType: ''
};

class SearchBar extends PureComponent {
  componentWillMount() {
    this._initSearchText();
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          underlineColorAndroid="transparent"
          style={ styles.searchbarText }
          onChangeText={ this._onChangeText }
          onBlur={ this._onBlur }
          value={ this.props.searchText } />
      </View>
    );
  }

  _initSearchText = () => {
    this.props.onChangeSearchText('');
  }

  _onChangeText = (text) => {
    this.props.onChangeSearchText(text);
  }

  _onBlur = () => {
    this.props.onBlurSearchbar();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 50
  },
  searchbarText: {
    fontSize: 20,
    textAlign: 'left'
  }
});

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
