import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import autobind from 'autobind-decorator';

import { requestBookmarkHOC } from '../../hocs/requestBookmarkHOC';

const { bool, func } = PropTypes;

const propTypes = {
  isBookmarked: bool,
  onClickBookmarkAdd: func.isRequired,
  onClickBookmarkRemove: func.isRequired,
  AddBookmarkRequestAction: func.isRequired,
  RemoveBookmarkRequestAction: func.isRequired
};
const defaultProps = {
  isBookmarked: false
};

class PostButtonGroups extends PureComponent {
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
          onPress={ !isBookmarked ? this._onClickBookmarkAdd : this._onClickBookmarkRemove } />
      </View>
    );
  }

  _onClickBookmarkAdd = async () => {
    await this.props.onClickBookmarkAdd();
    await this.props.AddBookmarkRequestAction();
  }

  _onClickBookmarkRemove = async () => {
    await this.props.onClickBookmarkRemove();
    await this.props.RemoveBookmarkRequestAction();
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

export default compose(
  requestBookmarkHOC
)(PostButtonGroups);
