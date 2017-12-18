import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import {
  navigateTo,
  renderHeaderWithNavigation,
  setParamsToNavigation
} from '../../Router';

import ScreenWithSearchBarHeader from '../../components/ScreenWithSearchBarHeader';
import Header from '../../components/Header';
import NewsFeedList from '../../components/NewsFeedList/container';
import HeaderBarBasic from '../../components/HeaderBarBasic';
import { fetchBooksAndUsersHOC } from '../../hocs/fetchBooksAndUsersHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import logger from '../../utils/LogUtils';
import { hasPath } from '../../utils/ObjectUtils';
import { selectType, USER_ID } from '../../config';
import ViewManager from '../../ViewManager';
import * as _t from '../../ViewManager/_title';
import * as _h from '../../ViewManager/_header';

const vm = new ViewManager(
  selectType.FETCHED_FROM_NEWSFEED,
  selectType.FETCHED_FROM_NEWSFEED,
  _h._getTextHeaderProps,
  _t._getTextTitleProps
);
const renderHeader = defaultViewWhileNoParams((params) => {
  const onClickSearchListItem = hasPath(params, 'onClickSearchListItem') ?
    params.onClickSearchListItem :
    () => {};

  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <View>
        <HeaderBarBasic
          vm={ vm }
          onClickSearchListItem={ onClickSearchListItem } />
      </View>
    </Header>
  );
});

class NewsFeed extends ScreenWithSearchBarHeader {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  };

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickSearchListItem: this._onClickSearchListItem
    });
  }

  componentWillUnmount() {
    this.props.resetBooksAndPage();
  }

  render() {
    const {
      booksInfo,
      usersInfo,
      newsfeedPage_,
      numOfFeedsPerLoad_,
      bookmarksAndBooks
    } = this.props;
    return (
      <View style={ styles.container }>
        <NewsFeedList
          vm={ vm }
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          page={ newsfeedPage_ }
          numOfFeedsPerLoad={ numOfFeedsPerLoad_ }
          bookmarks={ bookmarksAndBooks }
          onClickNewsfeedCard={ this._onClickNewsfeedCard }
          onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle }
          requestBooksAndUsers={ this._requestBooksAndUsers } />
      </View>
    );
  }

  _requestBooksAndUsers = () => {
    this.props.requestBooksAndUsers();
  }

  _onClickNewsfeedCard = (id, user) => {
    const key = 'PostList';
    const params = {
      id,
      vm: new ViewManager(
        selectType.SELECT_FROM_NEWSFEED_CLICKED_IMAGE,
        selectType.SELECT_FROM_NEWSFEED_CLICKED_IMAGE,
        _h._getTagHeaderProps,
        _t._getTextTitleProps
      ),
      selectType: selectType.SELECT_FROM_NEWSFEED_CLICKED_IMAGE
    };
    navigateTo(this.props, key, params);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    logger.log('At newsfeed, nickname clicked, userId:', userId);
  }

  // extends ScreenWithSearchBarHeader
  // _onClickSearchListItem = (bookId) => {
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 25,
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default compose(
  fetchBookmarksHOC,
  fetchBooksAndUsersHOC
)(NewsFeed);
