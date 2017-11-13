import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithBackButton from '../../components/HeaderBarWithBackButton';
import Post from '../../components/Post';
import { fetchBookAndUserHOC } from '../../hocs/fetchBookAndUserHOC';
import { fetchTagHOC } from '../../hocs/fetchTagHOC';
import { withLoaderHOC } from '../../hocs/withLoaderHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation
} from '../../Router';
import { indexOfValueInArray } from '../../utils/ArrayUtils';
import { pickByKey } from '../../utils/ObjectUtils';

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
  selectedBookTitleTag_: string.isRequired,
  selectedBookAuthorTag_: string.isRequired
};
const defaultProps = {
  bookInfo: {},
  userInfo: {}
};

const PARAMS_KEY = ['userInfo', 'bookInfo', 'selectType', 'selectedBookTitleTag_', 'selectedBookAuthorTag_'];
const renderHeader = (params) => {
  const { userInfo, selectType } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithBackButton
        userInfo={ userInfo }
        selectType={ selectType } />
    </Header>
  );
};

class PostSelected extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  componentDidMount() {
    this._setParamsToNavigation(this.props);
  }

  render() {
    const {
      bookInfo, userInfo, selectType, id,
      selectedBookTitleTag_, selectedBookAuthorTag_
    } = this.props;
    const isMyBookmark = this._isMyBookmark(id);
    const isMyBook = this._isMyBook(id);
    return (
      <View>
        <Post
          bookInfo={ bookInfo }
          userInfo={ userInfo }
          selectType={ selectType }
          bookTitleTag={ selectedBookTitleTag_ }
          bookAuthorTag={ selectedBookAuthorTag_ }
          isMyBookmark={ isMyBookmark }
          isMyBook={ isMyBook }
          isBookmarked={ isMyBookmark } />
      </View>
    );
  }

  _setParamsToNavigation = (props) => {
    const paramsOfNav = pickByKey(props, PARAMS_KEY);
    setParamsToNavigation(props, paramsOfNav);
  }

  _isMyBookmark = (id) => {
    const { myBookmarks_ } = this.props;
    return (indexOfValueInArray(myBookmarks_, id) !== -1);
  }

  _isMyBook = (id) => {
    const { myBooks_ } = this.props;
    return (indexOfValueInArray(myBooks_, id) !== -1);
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
  fetchBookAndUserHOC,
  fetchTagHOC,
  withLoaderHOC
)(PostSelected);
