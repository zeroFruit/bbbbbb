import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import CollectionSelectGallery from '../../components/CollectionSelectGallery';
import ProgressBar from '../../components/ProgressBar';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation,
  navigateTo,
  navigateToNested
} from '../../Router';
import { selectType } from '../../config';

const renderHeader = defaultViewWhileNoParams((params) => {
  const {
    selectType,
    vm,
    onClickHeaderRightButton,
    onClickHeaderLeftButton
  } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithTexts
        vm={ vm }
        title="추가"
        leftLabel="뒤로"
        rightLabel="완료"
        onClickHeaderRightButton={ onClickHeaderRightButton }
        onClickHeaderLeftButton={ onClickHeaderLeftButton } />
    </Header>
  );
});

class CollectionSelectPage extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  state = {
    selectedBookIdList: [],
    isCompleteButtonClicked: false
  };

  componentWillMount() {
    setParamsToNavigation(
      this.props,
      {
        onClickHeaderRightButton: this._onClickHeaderCompleteButton,
        onClickHeaderLeftButton: this._onClickHeaderBackButton
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCollectionAdded_ && this.state.isCompleteButtonClicked) {
      this._setStateIsCompleteButtonClicked(false);
      this._navigateToBookmarkPage();
    }
  }

  render() {
    if (this.state.isCompleteButtonClicked) {
      return <ProgressBar />;
    }

    return (
      <CollectionSelectGallery
        onClickBookSelectButton={ this._onClickBookSelectButton } />
    );
  }

  _onClickHeaderCompleteButton = async () => {
    const { selectedBookIdList } = this.state;
    if (selectedBookIdList.length === 0) {
      return Alert.alert('책을 선택해주세요.');
    }

    await this.props.AsyncAddCollectionRequestAction(
      this.props.collectionLabel,
      this.state.selectedBookIdList
    );

    this._setStateIsCompleteButtonClicked(true);
  }

  _onClickHeaderBackButton = () => {

  }

  _onClickBookSelectButton = (bookId) => {
    const { selectedBookIdList } = this.state;
    const index = selectedBookIdList.indexOf(bookId);
    if (index === -1) {
      selectedBookIdList.push(bookId);
    } else {
      selectedBookIdList.splice(index, 1);
    }
    this.setState({ selectedBookIdList });
  }

  _setStateIsCompleteButtonClicked = (value) => {
    this.setState({ isCompleteButtonClicked: value });
  }

  _navigateToBookmarkPage = () => {
    const params = {
      selectType: selectType.SELECT_FROM_COLLECTION_COMPLETE_BUTTON
    };
    navigateToNested(this.props, 'tabs', params, 'BookMark', params);
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

export default CollectionSelectPage;
