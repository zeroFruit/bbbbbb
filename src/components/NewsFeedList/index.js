import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Post from '../../components/Post';
import { blockOnMomentumScrollEndHOC } from '../../hocs/blockOnMomentumScrollEndHOC';
import { mapBookmarksToBooksHOC } from '../../hocs/mapBookmarksToBooksHOC';

import { selectType as SelectType } from '../../config';
import { indexOfValueInArray } from '../../utils/ArrayUtils';

const { func, arrayOf, number } = PropTypes;

const propTypes = {
  onMomentumScrollEnd: func.isRequired,
  onClickNewsfeedCard: func.isRequired,
  myBookmarksAndBooks_: arrayOf(number).isRequired,
  myBookmarks_: arrayOf(number).isRequired,
  myBooks_: arrayOf(number).isRequired
};
const defaultProps = {};

class NewsFeedList extends PureComponent {
  render() {
    const { booksInfo, myBookmarksAndBooks_ } = this.props;
    return (
      <View style={ { flex: 1 } } >
        <FlatList
          data={ booksInfo }
          extraData={ myBookmarksAndBooks_ }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem }
          onMomentumScrollEnd={ this._onMomentumScrollEnd } />
      </View>
    );
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item, index }) => {
    const { id, user_id } = item;
    const isMyBookmark = this._isMyBookmark(id);
    const isMyBook = this._isMyBook(id);
    const bookmarked = this._isMyBookOrBookmark(id);
    return (
      <Post
        onClickPost={ () => { this._onClickNewsfeedCard(id, user_id); } }
        bookInfo={ item }
        userInfo={ this.props.usersInfo[index] }
        selectType={ SelectType.SELECT_FROM_NEWSFEED }
        isMyBookmark={ isMyBookmark }
        isMyBook={ isMyBook }
        isBookmarked={ bookmarked } />
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

  _isMyBookOrBookmark = (id) => {
    const { myBookmarksAndBooks_ } = this.props;
    return (indexOfValueInArray(myBookmarksAndBooks_, id) !== -1);
  }

  _onMomentumScrollEnd = () => {
    this.props.onMomentumScrollEnd();
  }

  _onClickNewsfeedCard = (bookId, userId) => {
    this.props.onClickNewsfeedCard(bookId, userId);
  }
}

NewsFeedList.propTypes = propTypes;
NewsFeedList.defaultProps = defaultProps;

export default compose(blockOnMomentumScrollEndHOC)(NewsFeedList);
