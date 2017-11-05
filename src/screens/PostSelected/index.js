import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Post from '../../components/Post';
import { fetchBookAndUserHOC } from '../../hocs/fetchBookAndUserHOC';
import { loaderHOC } from '../../hocs/loaderHOC';

import agent from '../../Agent';
import {
  setParamsToNavigation,
  renderHeaderWithNavigation
} from '../../Router';
import { SEARCHBY_TAG } from '../../config';

const { number, func, shape, string } = PropTypes;
const propTypes = {
  userInfo: shape({
    id: number,
    display_name: string
  }),
  bookInfo: shape({
    id: number,
    img_src: string,
    likes: number,
    tags: string,
    content: string,
    user_id: number,
    views: number
  }),
  selectType: string.isRequired
};
const defaultProps = {
  bookInfo: {},
  userInfo: {}
};

const renderHeader = params => {
  const { bookInfo, selectType, userInfo } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <SearchBar
        bookInfo={ bookInfo }
        userInfo={ userInfo }
        selectType={ selectType } />
    </Header>
  );
};

class PostSelected extends Component {
  static navigationOptions = {
    header: ({ navigation }) => { return renderHeaderWithNavigation(navigation)(renderHeader); }
  }

  async componentDidMount() {
    const { userInfo, bookInfo, selectType } = this.props;
    setParamsToNavigation(this.props, { userInfo, bookInfo, selectType });
  }

  render() {
    const { bookInfo, userInfo, selectType } = this.props;
    return (
      <View>
        <Post
          bookInfo={ bookInfo }
          userInfo={ userInfo }
          selectType={ selectType } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20
  }
});

PostSelected.propTypes = propTypes;
PostSelected.defaultProps = defaultProps;

export default fetchBookAndUserHOC(loaderHOC(PostSelected));
