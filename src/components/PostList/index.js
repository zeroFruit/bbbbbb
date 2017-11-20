import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Post from '../../components/Post';
import { blockOnMomentumScrollEndHOC } from '../../hocs/blockOnMomentumScrollEndHOC';

import { indexOfValueInArray } from '../../utils/ArrayUtils';

class PostList extends PureComponent {
  render() {
    const { booksInfo, myBookmarksAndBooks_ } = this.props;
    // console.log('PostList', booksInfo);
    // console.log('==============================');
    return (
      <View style={ { flex: 1 } } >
        <FlatList
          data={ booksInfo }
          extraData={ myBookmarksAndBooks_ }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem }
          onMomentumScrollEnd={ this._onMomentumScrollEnd } />
      </View>
    )
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item, index }) => {
    const { id, user_id } = item;
    const isMyBookmark = this._isMyBookmark(id);
    const isMyBook = this._isMyBook(id);
    return (
      <Post
        onClickPost={ () => { this._onClickNewsfeedCard(id, user_id); } }
        onClickAuthorTagOfPostTitle={ this._onClickAuthorTagOfPostTitle }
        onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle }
        bookInfo={ item }
        userInfo={ this.props.usersInfo[index] }
        selectType={ this.props.selectType }
        isMyBookmark={ isMyBookmark }
        isMyBook={ isMyBook }
        isBookmarked={ isMyBookmark } />
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

  _onMomentumScrollEnd = () => {
    this.props.requestBooksAndUsers();
  }

  _onClickNewsfeedCard = (bookId, userId) => {
    // this.props.onClickNewsfeedCard(bookId, userId);
    console.log('clicked!!');
  }

  _onClickAuthorTagOfPostTitle = (tagId) => {
    this.props.onClickAuthorTagOfPostTitle(tagId);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    this.props.onClickNicknameTextOfPostTitle(userId);
  }
}

export default PostList;
