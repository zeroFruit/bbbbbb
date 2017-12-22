import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { requestBookmarkHOC } from '../../hocs/requestBookmarkHOC';

const { bool, func } = PropTypes;

const propTypes = {
  isBookmarked: bool,
  isMyBook: bool,
  AsyncAddBookmarkRequestAction: func.isRequired,
  AsyncRemoveBookmarkRequestAction: func.isRequired
};
const defaultProps = {
  isBookmarked: false,
  isMyBook: false
};

class PostButtonGroups extends PureComponent {
  render() {
    const { isBookmarked, isMyBook } = this.props;

    return (
      <View style={ styles.container }>
        {
          isMyBook ?
            <Icon
              name="more-horiz"
              size={ 30 }
              containerStyle={ styles.iconContainer } /> :
            null
        }
        <Icon
          name={ isBookmarked ? 'turned-in' : 'turned-in-not' }
          size={ 30 }
          containerStyle={ styles.iconContainer }
          onPress={ !isBookmarked ? this._onClickBookmarkAdd : this._onClickBookmarkRemove } />
      </View>
    );
  }

  _onClickBookmarkAdd = async () => {
    const { bookId } = this.props;
    await this.props.AsyncAddBookmarkRequestAction(bookId);
  }

  _onClickBookmarkRemove = async () => {
    const { bookId } = this.props;
    await this.props.AsyncRemoveBookmarkRequestAction(bookId);
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

export default PostButtonGroups;
