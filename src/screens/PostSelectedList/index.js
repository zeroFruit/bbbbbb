import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithSearchBar from '../../components/HeaderBarWithSearchBar';
import PostList from '../../components/PostList/container';

import { enhance as selectFetchHOC } from '../../hocs/selectFetchHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { fetchTagHOC } from '../../hocs/fetchTagHOC';
import { mapSelectedPostFirstHOC } from '../../hocs/mapSelectedPostFirstHOC';
import { withLoaderHOC } from '../../hocs/withLoaderHOC';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation,
  navigateTo
} from '../../Router';
import { selectType, USER_ID } from '../../config';

const renderHeader = defaultViewWhileNoParams((params) => {
  const { selectType, vm } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithSearchBar
        vm={ vm }
        onClickAuthorTagOfHeader={ params.onClickAuthorTagOfHeader } />
    </Header>
  );
});

class PostSelectedList extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => {
      return renderHeaderWithNavigation(navigation)(renderHeader);
    }
  }
  componentDidMount() {
    setParamsToNavigation(this.props, {
      onClickAuthorTagOfHeader: this._onClickAuthorTagOfHeader
    });
  }
  componentWillUnmount() {
    this.props.resetBooksAndPage();
  }

  render() {
    const {
      vm,
      booksInfo,
      usersInfo,
      selectedListPage_,
      numOfFeedsPerLoad_,
      bookmarksAndBooks,
    } = this.props;
    return (
      <View style={ { flex: 1 } }>
        <PostList
          vm={ vm }
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          page={ selectedListPage_ }
          numOfFeedsPerLoad={ numOfFeedsPerLoad_ }
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
    ToastAndroid.show(`작가 태그가 클릭되었습니다. tag id: ${tagId}`, ToastAndroid.SHORT);
  }

  _onClickAuthorTagOfHeader = (tagId) => {
    const key = 'Author';
    const params = { tagId };
    navigateTo(this.props, key, params);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    const key = userId === USER_ID ? 'MyPage' : 'Other';
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
  fetchBookmarksHOC, // USER_ID
  selectFetchHOC, // bookId
  mapSelectedPostFirstHOC,
  fetchTagHOC // bookId
)(PostSelectedList);
