import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import {
  navigateTo,
  renderHeaderWithNavigation
} from '../../Router';

import Header from '../../components/Header';
import NewsFeedList from '../../components/NewsFeedList/container';
import PostAddingPanel from '../../components/PostAddingPanel';
import HeaderBarBasic from '../../components/HeaderBarBasic';
import { fetchBooksAndUsersHOC } from '../../hocs/fetchBooksAndUsersHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import logger from '../../utils/LogUtils';
import { selectType } from '../../config';

const { func } = PropTypes;

const propTypes = {
  requestBooksAndUsers: func.isRequired,
  ResetPageAction: func.isRequired
};
const defaultProps = {};

const renderHeader = defaultViewWhileNoParams((params) => {
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <View>
        <HeaderBarBasic
          selectType={ selectType.FETCHED_FROM_NEWSFEED } />
        <PostAddingPanel />
      </View>
    </Header>
  );
});

class NewsFeed extends Component {
  static navigationOptions = {
    header: ({ navigation }) => { return renderHeaderWithNavigation(navigation)(renderHeader); }
  };

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
      <View style={ styles.container }>
        <NewsFeedList
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          selectType={ selectType.FETCHED_FROM_NEWSFEED }
          page={ page }
          numOfFeedsPerLoad={ numOfFeedsPerLoad }
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
    height: 100,
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
