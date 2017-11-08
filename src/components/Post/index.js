import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import _ from 'lodash';

import { withLoaderHOC as WithLoader } from '../../hocs/withLoaderHOC';
import { withDefaultOnClickPostHandlerHOC } from '../../hocs/withDefaultOnClickPostHandlerHOC';

import PostTitle from '../PostTitle';
import PostImage from '../PostImage';
import PostButtonGroups from '../PostButtonGroups/container';
import PostContent from '../PostContent';

import logger from '../../utils/LogUtils';
import { selectType as SelectType } from '../../config';

const { string, shape, number, bool, func } = PropTypes;

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
  isBookmarked: bool,
  onClickPost: func.isRequired
};

const defaultProps = {
  userInfo: {},
  bookInfo: {},
  isBookmarked: false
};

class Post extends PureComponent {
  render() {
    const { bookInfo, selectType, isBookmarked } = this.props;
    const title = this._fetchPostTitle(selectType);

    return (
      <View>
        <PostTitle
          title={ title } />
        <PostImage
          imgSrc={ bookInfo.img_src }
          onClickImage={ this._onClickImage } />
        <PostButtonGroups
          bookId={ bookInfo.id }
          likes={ bookInfo.likes }
          views={ bookInfo.views }
          isBookmarked={ isBookmarked } />
        <PostContent
          content={ bookInfo.content } />
      </View>
    );
  }

  _fetchPostTitle(selectType) {
    if (selectType === SelectType.SELECT_FROM_MYPAGE) {
      return this.props.userInfo.display_name;
    } else if (selectType === SelectType.SELECT_FROM_NEWSFEED) {
      return this.props.bookInfo.tags;
    } else {
      logger.error('Invalid select type');
    }
  }

  _onClickImage = () => {
    this.props.onClickPost();
  }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default compose(
  withDefaultOnClickPostHandlerHOC,
  WithLoader
)(Post);
