import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Post from '../../components/Post';


import { indexOfValueInArray } from '../../utils/ArrayUtils';
import { pickByKey } from '../../utils/ObjectUtils';

class PostList extends PureComponent {
  render() {
    const extraData = this._getExtraData(this.props);
    return (
      <View style={ { flex: 1 } } >
        <FlatList
          data={ this.props.booksInfo }
          extraData={ extraData }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem }
          onMomentumScrollEnd={ this._onMomentumScrollEnd } />
      </View>
    )
  }

  _getExtraData = props => pickByKey(props, ['booksInfo']);

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
    ToastAndroid.show(`뉴스피드 카드를 눌렀습니다. book id: ${bookId}, user id: ${userId}`, ToastAndroid.SHORT);
  }

  _onClickAuthorTagOfPostTitle = (tagId) => {
    this.props.onClickAuthorTagOfPostTitle(tagId);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    this.props.onClickNicknameTextOfPostTitle(userId);
  }
}

export default PostList;
