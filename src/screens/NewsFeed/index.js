import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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

import logger from '../../utils/LogUtils';
import { hasPath } from '../../utils/ObjectUtils';
import { selectType, USER_ID } from '../../config';

const { func } = PropTypes;

const propTypes = {
};
const defaultProps = {};

const renderHeader = (params) => {
  const onClickSearchListItem = hasPath(params, 'onClickSearchListItem') ?
    params.onClickSearchListItem :
    () => {};

  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <View>
        <HeaderBarBasic
          selectType={ selectType.FETCHED_FROM_NEWSFEED }
          onClickSearchListItem={ onClickSearchListItem } />
      </View>
    </Header>
  );
};

class NewsFeed extends ScreenWithSearchBarHeader {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  };

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
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          selectType={ selectType.FETCHED_FROM_NEWSFEED }
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
    const params = { id, user, selectType: selectType.SELECT_FROM_NEWSFEED_CLICKED_IMAGE };
    navigateTo(this.props, key, params);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    logger.log('At newsfeed, nickname clicked, userId:', userId);
  }
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

NewsFeed.propTypes = propTypes;
NewsFeed.defaultProps = defaultProps;

export default compose(
  fetchBookmarksHOC,
  fetchBooksAndUsersHOC
)(NewsFeed);
