import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithSearchBar from '../../components/HeaderBarWithSearchBar';
import Post from '../../components/Post';
import { fetchTagHOC } from '../../hocs/fetchTagHOC';
import { fetchBookAndUserHOC } from '../../hocs/fetchBookAndUserHOC';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  navigateTo,
  setParamsToNavigation,
  renderHeaderWithNavigation
} from '../../Router';
import { indexOfValueInArray } from '../../utils/ArrayUtils';
import { selectType } from '../../config';

const { number, func, shape, string, bool } = PropTypes;
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
  selectType: string.isRequired,
  selectedBookTitleTag: string.isRequired,
  selectedBookAuthorTag: string.isRequired
};
const defaultProps = {
  bookInfo: {},
  userInfo: {}
};

const renderHeader = defaultViewWhileNoParams((params) => {
  const { selectType } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithSearchBar
        selectType={ selectType } />
    </Header>
  );
});

class PostSelected extends Component {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  componentDidMount() {
    setParamsToNavigation(this.props, {
      selectType: this.props.selectType
    });
  }

  render() {
    const {
      bookInfo, userInfo, selectType, id,
      selectedBookTitleTag, selectedBookAuthorTag
    } = this.props;
    const isMyBookmark = this._isMyBookmark(id);
    const isMyBook = this._isMyBook(id);
    console.log('id, usr', this.props.id, this.props.user);
    return (
      <View>
        <Post
          bookInfo={ bookInfo }
          userInfo={ userInfo }
          selectType={ selectType }
          bookTitleTag={ selectedBookTitleTag }
          bookAuthorTag={ selectedBookAuthorTag }
          isMyBookmark={ isMyBookmark }
          isMyBook={ isMyBook }
          isBookmarked={ isMyBookmark }
          onClickAuthorTagOfPostTitle={ this._onClickAuthorTagOfPostTitle } />
      </View>
    );
  }

  _isMyBookmark = (id) => {
    const { myBookmarks_ } = this.props;
    return (indexOfValueInArray(myBookmarks_, id) !== -1);
  }

  _isMyBook = (id) => {
    const { myBooks_ } = this.props;
    return (indexOfValueInArray(myBooks_, id) !== -1);
  }

  _onClickAuthorTagOfPostTitle = (tagId) => {
    const { id, user } = this.props;
    const key = 'PostList';
    const params = { id, selectType: selectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG };
    navigateTo(this.props, key, params);
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

PostSelected.propTypes = propTypes;
PostSelected.defaultProps = defaultProps;

export default compose(
  fetchBookAndUserHOC, // bookId
  fetchTagHOC
)(PostSelected);
