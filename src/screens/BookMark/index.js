import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { compose } from 'recompose';
import { List } from 'immutable';
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

import BookmarkBook from '../Bookmark_Book';
import BookmarkCollection from '../Bookmark_Collection';

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

  if (isHeaderDeletingMode(params) || isHeaderDeletingBookMode(params)) {
    return HeaderOnDeletingMode(params);
  }
  return HeaderDefault(params);
};

const isHeaderOnListBookMode = params => (
  hasPath(params, 'selectType') &&
  params.selectType === selectType.SELECT_FROM_COLLECTION_CARD
);

const isHeaderDeletingMode = params => (
  hasPath(params, 'isDeletingCollectionMode') &&
  params.isDeletingCollectionMode
);

const isHeaderDeletingBookMode = params => (
  hasPath(params, 'isDeletingCollectionBookMode') &&
  params.isDeletingCollectionBookMode
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
    isDeletingCollectionBookMode: false,
    isCollectionDeleteButtonClicked: false,
    isCollectionBookDeleteButtonClicked: false,
    isCollectionBookListMode: false,
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

    if (nextProps.isCollectionBooksRemoved_ && this.state.isCollectionBookDeleteButtonClicked) {
      this._setStateCollectionBookDeleteButtonClicked(false);
    }
  }


  render() {
    const { screenType } = this.state;

    if (this.state.isCollectionDeleteButtonClicked || this.state.isCollectionBookDeleteButtonClicked) {
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
          <BookmarkBook
            SCREEN_TYPE={ screenTypes.BOOK_LIST }
            parentNavigation={ this.props.navigation } />
        );
      case screenTypes.COLLECTIONS:
        return (
          <BookmarkCollection
            SCREEN_TYPE={ screenTypes.COLLECTION_BOOK_LIST }
            parentNavigation={ this.props.navigation }
            isDeletingMode={ this.state.isDeletingCollectionMode }
            isCollectionBookListMode={ this.state.isCollectionBookListMode }
            AsyncDeleteCollectionRequestAction={ this.props.AsyncDeleteCollectionRequestAction }
            setStateCollectionDeleteButtonClicked={ this._setStateCollectionDeleteButtonClicked }
            setStateCollectionBookListMode={ this._setStateCollectionBookListMode }
            setStateScreenType={ this._setStateScreenType }
            setStateCollectionId={ this._setStateCollectionId }
            setStateDeletingMode={ this._setStateDeletingMode } />
        );
      case screenTypes.COLLECTION_BOOK_LIST:
        return (
          <BookmarkCollectionBookGallery
            isShown={ screenType === screenTypes.COLLECTION_BOOK_LIST }
            id={ this.state.collectionId }
            isDeletingMode={ this.state.isDeletingCollectionBookMode }
            onClickCollectionBookGalleryCard={ this._onClickCollectionBookGalleryCard }
            onLongClickCollectionBookCard={ this._onLongClickCollectionBookCard }
            onClickAddCollectionBookButton={ this._onClickAddCollectionBookButton }
            onClickCollectionBookDeleteButton={ this._onClickCollectionBookDeleteButton } />
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

  _setStateBookDeletingMode = (state) => {
    this.setState({ isDeletingCollectionBookMode: state });
  }

  _setStateCollectionBookListMode = (state) => {
    this.setState({ isCollectionBookListMode: state });
  }

  _setStateCollectionDeleteButtonClicked = (state) => {
    this.setState({ isCollectionDeleteButtonClicked: state });
  }

  _setStateCollectionBookDeleteButtonClicked = (state) => {
    this.setState({ isCollectionBookDeleteButtonClicked: state });
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
    BookmarkCollectionGallery
    ********************************* */


  /*
    BookmarkCollectionBookGallery
    ********************************* */

  _onClickCollectionBookGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE };
    navigateTo(this.props, key, params);
  }

  _onLongClickCollectionBookCard = async () => {
    await this._setStateBookDeletingMode(true);
    await setParamsToNavigation(this.props, {
      selectType: selectType.SELECT_FROM_COLLECTION_DELETE_BUTTON,
      isDeletingCollectionBookMode: this.state.isDeletingCollectionBookMode,
      onClickHeaderRightButton: this._onClickRemoveCompleteCollectionBookButton,
      onClickHeaderLeftButton: () => {}
    });
  }

  _onClickRemoveCompleteCollectionBookButton = async () => {
    await this._setStateBookDeletingMode(false);
    await setParamsToNavigation(this.props, {
      isDeletingCollectionBookMode: this.state.isDeletingCollectionBookMode
    });
  }

  _onClickAddCollectionBookButton = () => {
    const key = 'collectionBookSelect';
    const params = { id: this.state.collectionId, selectType: selectType.SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON };
    navigateTo(this.props, key, params);
  }

  _onClickCollectionBookDeleteButton = async (bid) => {
    this._setStateCollectionBookDeleteButtonClicked(true);
    await this.props.AsyncDeleteCollectionBookRequestAction(this.state.collectionId, List([bid]).toJS());
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
