import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import BookmarkSelectGallery from '../../components/BookmarkSelectGallery';
import ProgressBar from '../../components/ProgressBar';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation,
  navigateToNested
} from '../../Router';
import { selectType } from '../../config';
import ViewManager from '../../ViewManager';

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
    if (nextProps.isBooksInCollectionAdded_ && this.state.isCompleteButtonClicked) {
      this._setStateIsCompleteButtonClicked(false);
      this._navigateToBookmarkPage();
    }
  }

  render() {
    if (this.state.isCompleteButtonClicked) {
      return <ProgressBar />;
    }

    return (
      <BookmarkSelectGallery
        onClickBookSelectButton={ this._onClickBookSelectButton } />
    );
  }

  _onClickHeaderCompleteButton = async () => {
    const { selectedBookIdList } = this.state;
    if (selectedBookIdList.length === 0) {
      return Alert.alert('책을 선택해주세요.');
    }

    await this._setStateIsCompleteButtonClicked(true);
    await this.props.AsyncAddBooksToCollectionRequestAction(
      this.props.id,
      this.state.selectedBookIdList
    );
  }

  _onClickHeaderBackButton = () => {
    // TODO:
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
      vm: new ViewManager(
        selectType.SELECT_FROM_COLLECTION_BOOK_COMPLETE_BUTTON,
        selectType.SELECT_FROM_COLLECTION_BOOK_COMPLETE_BUTTON,
        undefined,
        undefined
      ),
      selectType: selectType.SELECT_FROM_COLLECTION_BOOK_COMPLETE_BUTTON
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
