import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import HeaderTitleBar from '../HeaderTitleBar';
import HeaderRightIcon from '../HeaderRightIcon';
import { fetchHeaderTitlePropsHOC } from '../../hocs/fetchHeaderTitlePropsHOC';
import { withDefaultHeaderHOC } from '../../hocs/withDefaultHeaderHOC';
import { requestSearchTextHOC } from '../../hocs/requestSearchTextHOC';

import { headerType } from '../../config';

const propTypes = {};
const defaultProps = {};


/*
  TODO: 여기다가 Header 타이틀 랜더하는 함수만들기
*/

class HeaderBarBasic extends PureComponent {
  state = {
    isFocus: false,
    searchText: ''
  };

  render() {
    const { searchText } = this.state;
    const { headerTitleProps } = this.props;

    return (
      <View style={ styles.container }>
        <View style={ styles.searchContainer }>
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
        {
          (this.state.isFocus && !this.props.isSearching_) ?
            <SearchList /> : null
        }

      </View>
    );
  }

  _onClickRightIcon = () => {
    this.setState({ isFocus: !this.state.isFocus });
  }

  _onChangeSearchText = (searchText) => {
    this.setState({ searchText });
    this.props.requestSearch(searchText);
  }

  _onBlurSearchbar = () => {
    this.setState({ isFocus: false });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

HeaderBarBasic.propTypes = propTypes;
HeaderBarBasic.defaultProps = defaultProps;

export default compose(
  fetchHeaderTitlePropsHOC,
  withDefaultHeaderHOC,
  requestSearchTextHOC
)(HeaderBarBasic);
