import React, { PureComponent } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import HeaderTitleBar from '../HeaderTitleBar';
import HeaderLeftIcon from '../HeaderLeftIcon';
import HeaderRightIcon from '../HeaderRightIcon';
import { fetchHeaderTitlePropsHOC } from '../../hocs/fetchHeaderTitlePropsHOC';
import { withDefaultHeaderHOC } from '../../hocs/withDefaultHeaderHOC';
import { requestSearchTextHOC } from '../../hocs/requestSearchTextHOC';

const propTypes = {};
const defaultProps = {};

class HeaderBarWithSearchBar extends PureComponent {
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
          <HeaderLeftIcon
            iconName="arrow-back"
            onClickLeftIcon={ this._onClickLeftIcon } />
          {
            !this.state.isFocus ?
              <HeaderTitleBar
                type={ headerTitleProps.type }
                text={ headerTitleProps.text }
                onClickAuthorTagOfHeader={ this._onClickAuthorTagOfHeader } /> :
              <SearchBar
                searchText={ searchText }
                onChangeSearchText={ this._onChangeSearchText }
                onBlurSearchbar={ this._onBlurSearchbar } />
          }
          <HeaderRightIcon
            iconName={ !this.state.isFocus ? 'search' : 'close' }
            onClickRightIcon={ this._onClickRightIcon } />
          {
            (this.state.isFocus && !this.props.isSearching_) ?
              <SearchList
                searchResults={ this.props.searchResults_ }
                onClickSearchListItem={ this._onClickSearchListItem } /> : null
          }
        </View>
      </View>
    );
  }

  _onClickLeftIcon = () => {
    ToastAndroid.show('뒤로가기', ToastAndroid.SHORT);
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

  _onClickAuthorTagOfHeader = (tagId) => {
    this.props.onClickAuthorTagOfHeader(tagId);
  }

  _onClickSearchListItem = (bookId) => {
    ToastAndroid.show(`검색결과를 클릭하셨습니다. ${bookId}`, ToastAndroid.SHORT);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

HeaderBarWithSearchBar.propTypes = propTypes;
HeaderBarWithSearchBar.defaultProps = defaultProps;

export default compose(
  fetchHeaderTitlePropsHOC,
  withDefaultHeaderHOC,
  requestSearchTextHOC
)(HeaderBarWithSearchBar);
