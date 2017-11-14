import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithBackButton from '../../components/HeaderBarWithBackButton';
import PostList from '../../components/PostList/container';

import { fetchBooksAndUsersByTagHOC } from '../../hocs/fetchBooksAndUsersByTagHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { fetchTagHOC } from '../../hocs/fetchTagHOC';
import { withLoaderHOC } from '../../hocs/withLoaderHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation
} from '../../Router';
import { indexOfValueInArray } from '../../utils/ArrayUtils';
import { pickByKey } from '../../utils/ObjectUtils';
import { selectType } from '../../config';

const PARAMS_KEY = ['userInfo', 'bookInfo', 'selectType'];

const renderHeader = (params) => {
  const { selectType } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithBackButton
        selectType={ selectType } />
    </Header>
  );
};

class PostSelectedList extends Component {
  static navigationOptions = {
    header: ({ navigation }) => {
      return renderHeaderWithNavigation(navigation)(renderHeader);
    }
  }

  componentWillUnmount() {
    this.props.ResetPageAction();
  }

  render() {
    const {
      booksInfo,
      usersInfo,
      page,
      numOfFeedsPerLoad,
      bookmarksAndBooks
    } = this.props;

    return (
      <View style={ { flex: 1 } }>
        <PostList
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          selectType={ selectType.FETCHED_FROM_NEWSFEED }
          page={ page }
          numOfFeedsPerLoad={ numOfFeedsPerLoad }
          bookmarks={ bookmarksAndBooks }
          onClickNewsfeedCard={ this._onClickNewsfeedCard }
          requestBooksAndUsers={ this._requestBooksAndUsers } />
      </View>
    );
  }

  _requestBooksAndUsers = () => {
    this.props.requestBooksAndUsers();
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

export default compose(
  fetchBookmarksHOC,
  fetchBooksAndUsersByTagHOC,
  fetchTagHOC,
  withLoaderHOC
)(PostSelectedList);
