import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import logger from '../../utils/LogUtils';
import { headerType } from '../../config';

class HeaderTitleBar extends PureComponent {
  render() {
    return this._renderTitle();
  }

  _renderTitle = () => {
    const { type, text } = this.props;
    switch(type) {
      case headerType.TAG:
        return (
          <View style={ styles.tagsContainer }>
            { this._renderTagButtons(text) }
          </View>
        );
      case headerType.TEXT:
        return (
          <View style={ styles.textContainer }>
            <Text style={ styles.title }>
              { this._renderText(text) }
            </Text>
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
      console.log('Nickname clicked', textId);
    }
  }

  _renderTagButtons = (text) => {
    return text.map(tag => (
      <Button
        key={ tag.value }
        title={ `${tag.value}` }
        backgroundColor="#d3d3d3"
        borderRadius={ 5 }
        color="black"
        buttonStyle={ styles.tagButton }
        onPress={ () => this._onClickTagButton(tag.id, tag.type) } />
    ));
  }

  _onClickTagButton = (tagId, tagType) => {
    if (this._isAuthorTag(tagType)) {
      this.props.onClickAuthorTagOfHeader(tagId);
    }
  }

  _isAuthorTag = tagType => (tagType === 'author')
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 40,
    right: 0,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
  tagButton: {
    marginRight: 0
  }
});

export default HeaderTitleBar;
