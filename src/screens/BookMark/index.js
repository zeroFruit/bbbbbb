import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { compose } from 'recompose';
import logger from '../../utils/LogUtils';

import ProgressBar from '../../components/ProgressBar';
import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import HeaderBarWithIcons from '../../components/HeaderBarWithIcons';
import BookmarkButtonGroups from '../../components/BookmarkButtonGroups';
import BookmarkBookGallery from '../../components/BookmarkBookGallery';
import BookmarkCollectionGallery from '../../components/BookmarkCollectionGallery';
import BookmarkCollectionBookGallery from '../../components/BookmarkCollectionBookGallery';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';
import { mapNavigateParamsToProps } from '../../hocs/mapNavigateParamsToProps';

import {
  renderHeaderWithNavigation,
  setParamsToNavigation,
  navigateTo
} from '../../Router';
import { selectType } from '../../config';
import { hasPath, isEmpty, omit } from '../../utils/ObjectUtils';

const renderHeader = (params) => {
  if (isHeaderOnListBookMode(params)) {
    return HeaderOnListMode(params);
  }

  if (isHeaderDeletingMode(params)) {
    return HeaderOnDeletingMode(params);
  }
  return HeaderDefault(params);
};

isHeaderOnListBookMode = params => (
  hasPath(params, 'selectType') &&
  params.selectType === selectType.SELECT_FROM_COLLECTION_CARD
);

const isHeaderDeletingMode = params => (
  hasPath(params, 'isDeletingCollectionMode') &&
  params.isDeletingCollectionMode
);

const HeaderDefault = params => (
  <Header headerStyle={ StyleSheet.flatten(styles.defaultHeaderContainer) }>
    <Text style={ styles.headerText }>
      담아 둔 글
    </Text>
  </Header>
);

const HeaderOnDeletingMode = params => (
  <Header headerStyle={ StyleSheet.flatten(styles.deletingModeHeaderContainer) }>
    <HeaderBarWithTexts
      title="삭제"
      leftLabel="뒤로"
      rightLabel="완료"
      onClickHeaderRightButton={ params.onClickHeaderRightButton }
      onClickHeaderLeftButton={ params.onClickHeaderLeftButton }
      selectType={ params.selectType } />
  </Header>
);

const HeaderOnListMode = params => (
  <Header headerStyle={ StyleSheet.flatten(styles.listModeHeaderContainer) }>
    <HeaderBarWithIcons
      title={ params.title }
      leftIconName="arrow-back"
      rightIconName="more-horiz"
      onClickHeaderRightButton={ params.onClickHeaderRightButton }
      onClickHeaderLeftButton={ params.onClickHeaderLeftButton }
      selectType={ params.selectType } />
  </Header>
);

const screenTypes = {
  BOOK_LIST: 'BOOK_LIST',
  COLLECTIONS: 'COLLECTIONS',
  COLLECTION_BOOK_LIST: 'COLLECTION_BOOK_LIST'
};

class BookMark extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  state = {
    screenType: screenTypes.BOOK_LIST,
    isDeletingCollectionMode: false,
    isCollectionBookListMode: false,
    isCollectionDeleteButtonClicked: false,
    isCollectionLoading: false,
    collectionId: -1
  };
  componentWillMount() {
    this._initNavProps();
  }
  componentDidMount() {
    // if (this._isNavigationParamHasCollectionCompleteSelectType(this.props)) {
    //   console.log('1');
    //   this._setStateScreenType(screenTypes.COLLECTIONS);
    // }
    //
    // if (this._isNavigationParamHasAddingBookCompleteSelectType(this.props)) {
    //   console.log('2');
    //   this._setStateScreenType(screenTypes.COLLECTION_BOOK_LIST);
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isCollectionRemoved_ && this.state.isCollectionDeleteButtonClicked) {
      this._setStateCollectionDeleteButtonClicked(false);
    }
  }


  render() {
    const { screenType } = this.state;

    if (this.state.isCollectionDeleteButtonClicked) {
      return <ProgressBar />;
    }

    return (
      <TouchableWithoutFeedback
        style={ styles.container }
        onPress={ () => {} }>
        <View style={ { flex: 1, backgroundColor: 'white' } }>
          <BookmarkButtonGroups
            onClickBooklistButton={ this._onClickBooklistButton }
            onClickCollectionButton={ this._onClickCollectionButton } />
          { this._renderBookmarkComponent(screenType) }
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /*
    Bookmark
    ********************************* */
  _initNavProps = () => {
    this.props.navigation.state.params = undefined;
    this.props = omit(this.props, ['onClickHeaderLeftButton', 'onClickHeaderRightButton', 'title']);
  }

  _isNavigationParamHasCollectionCompleteSelectType = (props) => {
    return hasPath(props, 'selectType') &&
      props.selectType === selectType.SELECT_FROM_COLLECTION_COMPLETE_BUTTON;
  }

  _isNavigationParamHasAddingBookCompleteSelectType = (props) => {
    return hasPath(props, 'selectType') &&
      props.selectType === selectType.SELECT_FROM_COLLECTION_BOOK_COMPLETE_BUTTON;
  }

  _renderBookmarkComponent = (screenType) => {
    switch(screenType) {
      case screenTypes.BOOK_LIST:
        return (
          <BookmarkBookGallery
            isShown={ screenType === screenTypes.BOOK_LIST }
            onClickGalleryCard={ this._onClickGalleryCard } />
        );
      case screenTypes.COLLECTIONS:
        return (
          <BookmarkCollectionGallery
            isShown={ screenType === screenTypes.COLLECTIONS }
            isDeletingMode={ this.state.isDeletingCollectionMode }
            onClickAddCollectionButton={ this._onClickAddCollectionButton }
            onClickCollectionDeleteButton={ this._onClickCollectionDeleteButton }
            onClickCollectionCard={ this._onClickCollectionCard }
            onLongClickCollectionCard={ this._onLongClickCollectionCard } />
        );
      case screenTypes.COLLECTION_BOOK_LIST:
        return (
          <BookmarkCollectionBookGallery
            isShown={ screenType === screenTypes.COLLECTION_BOOK_LIST }
            id={ this.state.collectionId }
            onClickCollectionBookGalleryCard={ this._onClickCollectionBookGalleryCard }
            onClickAddCollectionBookButton={ this._onClickAddCollectionBookButton } />
        );
      default:
        logger.log('invalid selectType');
        return null;
    }
  }

  _setStateScreenType = (screenType) => {
    this.setState({ screenType });
  }

  _setStateDeletingMode = (state) => {
    this.setState({ isDeletingCollectionMode: state });
  }

  _setStateCollectionBookListMode = (state) => {
    this.setState({ isCollectionBookListMode: state });
  }

  _setStateCollectionDeleteButtonClicked = (state) => {
    this.setState({ isCollectionDeleteButtonClicked: state });
  }

  _setStateCollectionId = (state) => {
    this.setState({ collectionId: state });
  }


  /*
    BookmarkButtonGroups
    ********************************* */

  _onClickBooklistButton = () => {
    this._setStateScreenType(screenTypes.BOOK_LIST);
  }

  _onClickCollectionButton = () => {
    this._setStateScreenType(screenTypes.COLLECTIONS);
  }

  /*
    BookmarkBookGallery
    ********************************* */

  _onClickGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE };
    navigateTo(this.props, key, params);
  }

  /*
    BookmarkCollectionGallery
    ********************************* */

  _onClickAddCollectionButton = () => {
    const key = 'collectionAdd';
    const params = { selectType: selectType.SELECT_FROM_COLLECTION_ADD_BUTTON };
    navigateTo(this.props, key, params);
  }

  _onClickCollectionDeleteButton = async (id) => {
    this._setStateCollectionDeleteButtonClicked(true);
    await this.props.AsyncDeleteCollectionRequestAction(id);
  }

  _onClickCollectionCard = (id, label) => {
    this._setStateCollectionBookListMode(true);
    this.props.navigation.setParams({
      selectType: selectType.SELECT_FROM_COLLECTION_CARD,
      title: label,
      isCollectionBookListMode: true,
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
    this._setStateScreenType(screenTypes.COLLECTION_BOOK_LIST);
    this._setStateCollectionId(id);
  }

  _onLongClickCollectionCard = async () => {
    await this._setStateDeletingMode(true);
    await setParamsToNavigation(this.props, {
      selectType: selectType.SELECT_FROM_COLLECTION_DELETE_BUTTON,
      isDeletingCollectionMode: this.state.isDeletingCollectionMode,
      onClickHeaderRightButton: this._onClickRemoveCompleteCollectionButton,
      onClickHeaderLeftButton: () => {}
    });
  }

  _onClickRemoveCompleteCollectionButton = async () => {
    await this._setStateDeletingMode(false);
    await setParamsToNavigation(this.props, {
      isDeletingCollectionMode: this.state.isDeletingCollectionMode
    });
  }

  /*
    BookmarkCollectionBookGallery
    ********************************* */

  _onClickCollectionBookGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE };
    navigateTo(this.props, key, params);
  }

  _onClickAddCollectionBookButton = () => {
    const key = 'collectionBookSelect';
    const params = { id: this.state.collectionId, selectType: selectType.SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON };
    navigateTo(this.props, key, params);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  defaultHeaderContainer: {
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  headerText: {
    fontSize: 20
  },
  deletingModeHeaderContainer: {
    marginTop: 25,
    backgroundColor: 'white'
  },
  listModeHeaderContainer: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

export default compose(mapNavigateParamsToProps)(BookMark);
