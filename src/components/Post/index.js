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
import { tagTitlePropFormatter, textTitlePropFormatter } from '../../utils/PropUtils';
import { selectType as SelectType, postTitleType } from '../../config';

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
  isMyBook: bool,
  isMyBookmark: bool,
  isBookmarked: bool,
  onClickPost: func.isRequired
};

const defaultProps = {
  userInfo: {},
  bookInfo: {},
  isMyBook: false,
  isMyBookmark: false,
  isBookmarked: false
};

class Post extends React.Component {
  render() {
    const { bookInfo, isBookmarked, isMyBook, vm } = this.props;
    const titleProps = this._fetchPostTitle(vm);
    return (
      <View>
        <PostTitle
          type={ titleProps.type }
          text={ titleProps.text }
          onClickAuthorTagOfPostTitle={ this._onClickAuthorTagOfPostTitle }
          onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle } />
        <PostImage
          imgSrc={ bookInfo.img_src }
          onClickImage={ this._onClickImage } />
        <PostButtonGroups
          bookId={ bookInfo.id }
          likes={ bookInfo.likes }
          views={ bookInfo.views }
          isMyBook={ isMyBook }
          isBookmarked={ isBookmarked } />
        <PostContent
          content={ bookInfo.content } />
      </View>
    );
  }

  _fetchPostTitle(vm) {
    return vm.getTitleProps(this.props);
  }

  _onClickImage = () => {
    this.props.onClickPost();
  }

  _onClickAuthorTagOfPostTitle = (tagId) => {
    this.props.onClickAuthorTagOfPostTitle(tagId);
  }

  _onClickNicknameTextOfPostTitle = (userId) => {
    this.props.onClickNicknameTextOfPostTitle(userId);
  }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default compose(
  withDefaultOnClickPostHandlerHOC
)(Post);
