import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import logger from '../../utils/LogUtils';
import { postTitleType } from '../../config';

const { string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  text: oneOfType([string, arrayOf(string)]).isRequired,
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
            <Text style={ styles.title }>{ this.props.text }</Text>
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

  _renderTagButtons = (text) => {
    return text.map(tag => (
      <Button
        key={ tag }
        title={ `${tag}` }
        backgroundColor="#d3d3d3"
        borderRadius={ 5 }
        color="black" />
    ));
  }
}

const styles = StyleSheet.create({
  textTypeContainer: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  tagTypeContainer: {
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
