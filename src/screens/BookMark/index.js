import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { compose } from 'recompose';

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
import { hasPath, isEmpty } from '../../utils/ObjectUtils';

const renderHeader = (params) => {
  if (isHeaderDeletingMode(params)) {
    return HeaderOnDeletingMode(params);
  }

  if (isHeaderCollectionBookListMode(params)) {
    return HeaderOnCollectionBookListMode(params);
  }

  return HeaderDefault(params);
};

const isHeaderDeletingMode = params => (
  hasPath(params, 'isDeletingCollectionMode') &&
  params.isDeletingCollectionMode
);

const isHeaderCollectionBookListMode = params => (
  hasPath(params, 'isCollectionBookListMode') &&
  params.isCollectionBookListMode
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

const HeaderOnCollectionBookListMode = params => (
  <Header headerStyle={ StyleSheet.flatten(styles.collectionListModeHeaderContainer) }>
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
    collectionId: -1
  };

  componentDidMount() {
    if (this._isNavigationParamHasSelectType(this.props)) {
      this._setStateScreenType(screenTypes.COLLECTIONS);
    }
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
          <BookmarkBookGallery
            isShown={ screenType === screenTypes.BOOK_LIST }
            onClickGalleryCard={ this._onClickGalleryCard } />
          <BookmarkCollectionGallery
            isShown={ screenType === screenTypes.COLLECTIONS }
            isDeletingMode={ this.state.isDeletingCollectionMode }
            onClickAddCollectionButton={ this._onClickAddCollectionButton }
            onClickCollectionDeleteButton={ this._onClickCollectionDeleteButton }
            onClickCollectionCard={ this._onClickCollectionCard }
            onLongClickCollectionCard={ this._onLongClickCollectionCard } />
          <BookmarkCollectionBookGallery
            isShown={ screenType === screenTypes.COLLECTION_BOOK_LIST }
            id={ this.state.collectionId }
            onClickGalleryCard={ this._onClickGalleryCard } />
        </View>
      </TouchableWithoutFeedback>
    );
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

  // _onClickScreen = () => {
  //   const { screenType, isDeletingCollectionMode } = this.state;
  //   if (screenType === screenTypes.COLLECTIONS && isDeletingCollectionMode) {
  //     console.log('screen clicked');
  //   }
  // }

  _onClickBooklistButton = () => {
    this._setStateScreenType(screenTypes.BOOK_LIST);
  }

  _onClickCollectionButton = () => {
    this._setStateScreenType(screenTypes.COLLECTIONS);
  }

  _onClickGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_BOOKMARK_CLICKED_IMAGE };
    navigateTo(this.props, key, params);
  }

  _onClickAddCollectionButton = () => {
    const key = 'collectionAdd';
    const params = { selectType: selectType.SELECT_FROM_COLLECTION_ADD_BUTTON };
    navigateTo(this.props, key, params);
  }

  _onClickCollectionDeleteButton = async (id) => {
    this._setStateCollectionDeleteButtonClicked(true);
    await this.props.AsyncDeleteCollectionRequestAction(id);
  }

  _onClickRemoveCompleteCollectionButton = async () => {
    await this._setStateDeletingMode(false);
    await setParamsToNavigation(this.props, {
      isDeletingCollectionMode: this.state.isDeletingCollectionMode
    });
  }

  _onClickCollectionCard = async (id, label) => {
    await this._setStateCollectionBookListMode(true);
    await setParamsToNavigation(this.props, {
      selectType: selectType.SELECT_FROM_COLLECTION_CARD,
      title: label,
      isCollectionBookListMode: this.state.isCollectionBookListMode,
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
    await this._setStateCollectionId(id);
    await this._setStateScreenType(screenTypes.COLLECTION_BOOK_LIST);
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

  _onClickGalleryCard = (id, user) => {
    console.log('id', id, 'user', user);
  }

  _isNavigationParamHasSelectType = (props) => {
    const { state } = props.navigation;
    return hasPath(state, 'params') && hasPath(state, 'params.selectType');
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
  collectionListModeHeaderContainer: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

export default compose(mapNavigateParamsToProps)(BookMark);
