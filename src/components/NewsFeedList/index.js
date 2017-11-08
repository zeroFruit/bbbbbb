import React, { Component } from 'react';
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
  bookmarks: arrayOf(number).isRequired
};
const defaultProps = {};

class NewsFeedList extends Component {
  render() {
    const { booksWithBookmark } = this.props;
    return (
      <View style={ { flex: 1 } } >
        <FlatList
          data={ booksWithBookmark }
          extraData={ this.state }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem }
          onMomentumScrollEnd={ this._onMomentumScrollEnd } />
      </View>
    );
  }

  _keyExtractor = item => {
    return item.id;
  }

  _renderItem = ({ item, index }) => {
    const { bookmarked, id, user_id } = item;
    return (
      <Post
        onClickPost={ () => { this._onClickNewsfeedCard(id, user_id); } }
        bookInfo={ item }
        userInfo={ this.props.usersInfo[index] }
        selectType={ SelectType.SELECT_FROM_NEWSFEED }
        isBookmarked={ bookmarked } />
    );
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

export default compose(
  mapBookmarksToBooksHOC,
  blockOnMomentumScrollEndHOC
)(NewsFeedList);
