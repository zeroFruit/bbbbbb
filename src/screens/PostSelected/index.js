import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithSearchBar from '../../components/HeaderBarWithSearchBar';
import Post from '../../components/Post';

import { enhance as selectTagFetchHOC } from '../../hocs/selectTagFetchHOC';
import { fetchTagByBidHOC } from '../../hocs/fetchTagByBidHOC';
import { fetchBookAndUserHOC } from '../../hocs/fetchBookAndUserHOC';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  navigateTo,
  setParamsToNavigation,
  renderHeaderWithNavigation
} from '../../Router';
import { indexOfValueInArray } from '../../utils/ArrayUtils';
import { selectType } from '../../config';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';
import * as _t from '../../ViewManager/_title';

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
  const { selectType, vm } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithSearchBar
        vm={ vm } />
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
      selectedBookTitleTag, selectedBookAuthorTag, vm
    } = this.props;
    const isMyBookmark = this._isMyBookmark(id);
    const isMyBook = this._isMyBook(id);
    return (
      <View>
        <Post
          vm={ vm }
          bookInfo={ bookInfo }
          userInfo={ userInfo }
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
    const params = {
      id,
      vm: new ViewManager(
        selectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG,
        selectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG,
        _h._getTagHeaderProps,
        _t._getTextTitleProps
      ),
      selectType: selectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG
    };
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
  selectTagFetchHOC // bid or athrid && titid
)(PostSelected);
