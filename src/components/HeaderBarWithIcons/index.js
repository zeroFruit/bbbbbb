import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import SearchBar from '../SearchBar';
import HeaderTitleBar from '../HeaderTitleBar';
import HeaderLeftIcon from '../HeaderLeftIcon';
import HeaderRightIcon from '../HeaderRightIcon';
import { fetchHeaderTitlePropsHOC } from '../../hocs/fetchHeaderTitlePropsHOC';
import { withDefaultHeaderHOC } from '../../hocs/withDefaultHeaderHOC';

const propTypes = {};
const defaultProps = {};

class HeaderBarWithIcons extends PureComponent {
  render() {
    const {
      headerTitleProps: {
        type, text,
        header: {
          leftIconName,
          rightIconName
        }
      }
    } = this.props;
    return (
      <View style={ styles.container }>
        <HeaderLeftIcon
          iconName={ leftIconName }
          onClickLeftIcon={ this._onClickLeftIcon } />
        <HeaderTitleBar
          type={ type }
          text={ text }
          onClickAuthorTagOfHeader={ () => {} } />
        <HeaderRightIcon
          iconName={ rightIconName }
          onClickRightIcon={ this._onClickRightIcon } />
      </View>
    );
  }

  _onClickLeftIcon = () => {
    this.props.onClickHeaderLeftButton();
  }

  _onClickRightIcon = () => {
    this.props.onClickHeaderRightButton();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

HeaderBarWithIcons.propTypes = propTypes;
HeaderBarWithIcons.defaultProps = defaultProps;

export default compose(
  fetchHeaderTitlePropsHOC,
  withDefaultHeaderHOC
)(HeaderBarWithIcons);
