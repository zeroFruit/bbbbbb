import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import autobind from 'autobind-decorator';

import { requestBookmarkHOC } from '../../hocs/requestBookmarkHOC';

const { bool, func } = PropTypes;

const propTypes = {
  isBookmarked: bool.isRequired,
  onClickbookmark: func.isRequired,
  AddBookmarkRequestAction: func.isRequired
};
const defaultProps = {};

class PostButtonGroups extends Component {
  render() {
    const { isBookmarked } = this.props;

    return (
      <View style={ styles.container }>
        <Icon
          name="more-horiz"
          size={ 30 }
          containerStyle={ styles.iconContainer } />
        <Icon
          name={ isBookmarked ? 'turned-in' : 'turned-in-not' }
          size={ 30 }
          containerStyle={ styles.iconContainer }
          onPress={ this.onClickBookmarkButton } />
      </View>
    );
  }

  @autobind
  onClickBookmarkButton() {
    this.props.onClickbookmark();
    this.props.AddBookmarkRequestAction();
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  iconContainer: {
    marginLeft: 5
  }
});

PostButtonGroups.propTypes = propTypes;
PostButtonGroups.defaultProps = defaultProps;

export default requestBookmarkHOC(PostButtonGroups);
