import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { SearchBar as SearchBarElement } from 'react-native-elements';
import _ from 'lodash';

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

class SearchBar extends Component {
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
    const { bookInfo: { tags } } = this.props;

    return (
      <SearchBarElement
        containerStyle={ styles.container }
        inputStyle={ styles.input }
        icon={ {
          color: '#86939e',
          name: 'search',
          style: styles.icon
        } }
        placeholder="Type Here..."
        lightTheme
        value={ searchText } />
    );
  }

  onChangeText = text => {

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

  fetchInitSearchText = () => {
    if (selectType.SELECT_FROM_MYPAGE === this.props.selectType) {
      this.setState({ searchText: this.props.bookInfo.tags, isTextInit: true });
    } else if (selectType.SELECT_FROM_NEWSFEED === this.props.selectType) {
      this.setState({ searchText: this.props.userInfo.display_name, isTextInit: true });
    } else {
      logger.error('Invalid select type');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10
  }
});

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default compose(WithLoader)(SearchBar);
