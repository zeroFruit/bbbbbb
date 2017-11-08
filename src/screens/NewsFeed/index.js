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
import { fetchBooksAndUsersHOC } from '../../hocs/fetchBooksAndUsersHOC';
import { selectBookmarksAndBooksHOC } from '../../hocs/selectBookmarksAndBooksHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';

import { selectType, USER_ID } from '../../config';

const { func } = PropTypes;

const propTypes = {
  requestBooksAndUsers: func.isRequired,
  ResetPageAction: func.isRequired
};
const defaultProps = {};

const renderHeader = (params) => {
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <Text style={ styles.headerText }>
        뉴스피드
      </Text>
    </Header>
  );
};

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

  _onClickNewsfeedCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_NEWSFEED };
    navigateTo(this.props, key, params);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  headerText: {
    fontSize: 20
  }
});

NewsFeed.propTypes = propTypes;
NewsFeed.defaultProps = defaultProps;

export default compose(
  fetchBookmarksHOC,
  fetchBooksAndUsersHOC
)(NewsFeed);
