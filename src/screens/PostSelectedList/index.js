import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithBackButton from '../../components/HeaderBarWithBackButton';
import PostList from '../../components/PostList/container';

import { fetchBooksAndUsersByTagHOC } from '../../hocs/fetchBooksAndUsersByTagHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { fetchTagHOC } from '../../hocs/fetchTagHOC';
import { withLoaderHOC } from '../../hocs/withLoaderHOC';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation,
  navigateTo
} from '../../Router';
import { selectType } from '../../config';

const renderHeader = defaultViewWhileNoParams((params) => {
  const { selectType } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithBackButton
        selectType={ selectType }
        onClickAuthorTagOfHeader={ params.onClickAuthorTagOfHeader } />
    </Header>
  );
});

class PostSelectedList extends Component {
  static navigationOptions = {
    header: ({ navigation }) => {
      return renderHeaderWithNavigation(navigation)(renderHeader);
    }
  }
  componentWillMount() {
    setParamsToNavigation(
      this.props,
      { onClickAuthorTagOfHeader: this._onClickAuthorTagOfHeader }
    );
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
          onClickAuthorTagOfPostTitle={ this._onClickAuthorTagOfPostTitle }
          onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle }
          requestBooksAndUsers={ this._requestBooksAndUsers } />
      </View>
    );
  }

  _requestBooksAndUsers = () => {
    this.props.requestBooksAndUsers();
  }

  _onClickAuthorTagOfPostTitle = (tagId) => {
    console.log('PostSelectedList', tagId);
  }

  _onClickAuthorTagOfHeader = (tagId) => {
    const key = 'Author';
    const params = { tagId };
    navigateTo(this.props, key, params);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    console.log('PostSelectedList', userId);
    const key = 'Other';
    const params = { userId };
    navigateTo(this.props, key, params);
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
