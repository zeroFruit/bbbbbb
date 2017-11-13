import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withLoaderHOC as WithLoader } from '../../hocs/withLoaderHOC';
import { selectType } from '../../config';
import logger from '../../utils/LogUtils';

const { shape, string } = PropTypes;

const propTypes = {
  bookInfo: shape({
    tags: string
  }),
  userInfo: shape({
    display_name: string
  }),
  selectType: string
};
const defaultProps = {
  bookInfo: {
    tags: ''
  },
  userInfo: {
    display_name: ''
  },
  selectType: ''
};

class SearchBar extends PureComponent {
  state = {
    searchText: '',
    isTextInit: false
  };

  componentWillReceiveProps() {
    if (this.shouldInitSearchText()) {
      this.fetchInitSearchText();
    }
  }

  render() {
    const { searchText } = this.state;
    const { bookInfo: { tags }, headerFlex } = this.props;
    return (
      <View style={ styles.container }>
        <TextInput
          style={ styles.searchbarText }
          onChangeText={ this._onChangeText }
          onBlur={ this._onBlur }
          value={ this.props.searchText } />
      </View>
    );
  }

  _onChangeText = (text) => {
    this.props.onChangeSearchText(text);
  }

  _onBlur = () => {
    this.props.onBlurSearchbar();
  }

  shouldInitSearchText = () => {
    const { searchText, isTextInit } = this.state;
    const { bookInfo, userInfo } = this.props;
    return (
      searchText === '' &&
      !isTextInit &&
      bookInfo.tags !== '' &&
      userInfo.display_name !== ''
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  searchbarText: {
    fontSize: 20,
    textAlign: 'left'
  }
});

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
