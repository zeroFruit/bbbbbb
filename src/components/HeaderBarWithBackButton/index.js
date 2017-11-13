import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import SearchBar from '../SearchBar';
import HeaderTitleBar from '../HeaderTitleBar';
import HeaderLeftIcon from '../HeaderLeftIcon';
import HeaderRightIcon from '../HeaderRightIcon';
import { fetchHeaderTitlePropsHOC } from '../../hocs/fetchHeaderTitlePropsHOC';

const propTypes = {};
const defaultProps = {};

class HeaderBarWithBackButton extends PureComponent {
  state = {
    isFocus: false,
    searchText: ''
  };

  render() {
    const { searchText } = this.state;
    const { headerTitleProps } = this.props;

    return (
      <View style={ styles.container }>
        <HeaderLeftIcon
          iconName="arrow-back"
          onClickLeftIcon={ this._onClickLeftIcon } />
        {
          !this.state.isFocus ?
            <HeaderTitleBar
              type={ headerTitleProps.type }
              text={ headerTitleProps.text } /> :
            <SearchBar
              searchText={ searchText }
              onChangeSearchText={ this._onChangeSearchText }
              onBlurSearchbar={ this._onBlurSearchbar } />
        }
        <HeaderRightIcon
          iconName="search"
          onClickRightIcon={ this._onClickRightIcon } />
      </View>
    );
  }

  _onClickLeftIcon = () => {
  }

  _onClickRightIcon = () => {
    this.setState({ isFocus: !this.state.isFocus });
  }

  _onChangeSearchText = (searchText) => {
    this.setState({ searchText });
  }

  _onBlurSearchbar = () => {
    this.setState({ isFocus: false });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

HeaderBarWithBackButton.propTypes = propTypes;
HeaderBarWithBackButton.defaultProps = defaultProps;

export default compose(fetchHeaderTitlePropsHOC)(HeaderBarWithBackButton);
