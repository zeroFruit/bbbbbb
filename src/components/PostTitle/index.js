import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import logger from '../../utils/LogUtils';
import { postTitleType } from '../../config';

const { string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  type: string.isRequired
};
const defaultProps = {
};

class PostTitle extends Component {
  render() {
    const { type, text } = this.props;
    return this._renderTitle(type, text);
  }

  _renderTitle = (type, text) => {
    switch(type) {
      case postTitleType.TEXT:
        return (
          <View style={ styles.textTypeContainer }>
            { this._renderText(text) }
          </View>
        );
      case postTitleType.TAG:
        return (
          <View style={ styles.tagTypeContainer }>
            { this._renderTagButtons(text) }
          </View>
        );
      default:
        return logger.warn('types are not defined');
    }
  }

  _renderText = (text) => {
    return (
      <Text
        style={ styles.title }
        onPress={ () => this._onClickText(text.id, text.type) }>
        { text.value }
      </Text>
    );
  }

  _onClickText = (textId, textType) => {
    if (textType === 'nickname') {
      this.props.onClickNicknameTextOfPostTitle(textId);
    }
  }

  _renderTagButtons = (text) => {
    return text.map(tag => (
      <Button
        key={ `${tag.type}${tag.id}` }
        title={ `${tag.value}` }
        backgroundColor="#d3d3d3"
        borderRadius={ 5 }
        color="black"
        onPress={ () => this._onClickTagButton(tag.id, tag.type) } />
    ));
  }

  _onClickTagButton = (tagId, tagType) => {
    if (this._isAuthorTag(tagType)) {
      console.log('author tag clicked');
    }
  }

  _isAuthorTag = tagType => (tagType === 'author')
}

const styles = StyleSheet.create({
  tagTypeContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  textTypeContainer: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  title: {
    fontSize: 20,
    marginLeft: 10
  }
});

PostTitle.propTypes = propTypes;
PostTitle.defaultProps = defaultProps;

export default PostTitle;
