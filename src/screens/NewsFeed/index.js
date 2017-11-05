import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import {
  renderHeaderWithNavigation
} from '../../Router';

import Header from '../../components/Header';
import NewsFeedList from '../../components/NewsFeedList';
import { fetchBooksAndUsersHOC } from '../../hocs/fetchBooksAndUsersHOC';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';

const { func } = PropTypes;

const propTypes = {
  requestBooksAndUsers: func.isRequired,
  AddBookmarkSuccessAction: func.isRequired
};
const defaultProps = {};

const renderHeader = params => {
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

  render() {
    const {
      booksInfo,
      usersInfo,
      page,
      numOfFeedsPerLoad,
      bookmarks
    } = this.props;
    return (
      <View style={ styles.container }>
        <NewsFeedList
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          page={ page }
          numOfFeedsPerLoad={ numOfFeedsPerLoad }
          bookmarks={ bookmarks }
          requestBooksAndUsers={ this._requestBooksAndUsers } />
      </View>
    );
  }

  _requestBooksAndUsers = () => {
    this.props.requestBooksAndUsers();
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

export default fetchBookmarksHOC(fetchBooksAndUsersHOC(NewsFeed));
