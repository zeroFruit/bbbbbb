import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import Header from '../../components/Header';
import BookmarkButtonGroups from '../../components/BookmarkButtonGroups';
import BookmarkBookGallery from '../../components/BookmarkBookGallery';
import BookmarkCollectionGallery from '../../components/BookmarkCollectionGallery';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';
import { mapNavigateParamsToProps } from '../../hocs/mapNavigateParamsToProps';

import {
  renderHeaderWithNavigation,
  navigateTo
} from '../../Router';
import { selectType } from '../../config';
import { hasPath } from '../../utils/ObjectUtils';

const renderHeader = (params) => {
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <Text style={ styles.headerText }>
        담아 둔 글
      </Text>
    </Header>
  );
};

const screenTypes = {
  BOOK_LIST: 'BOOK_LIST',
  COLLECTIONS: 'COLLECTIONS'
};

class BookMark extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => { return renderHeaderWithNavigation(navigation)(renderHeader); }
  }

  state = {
    screenType: screenTypes.BOOK_LIST
  };

  componentDidMount() {
    if (this._isNavigationParamHasSelectType(this.props)) {
      this._setStateScreenType(screenTypes.COLLECTIONS);
    }
  }

  render() {
    const { screenType } = this.state;

    return (
      <View style={ styles.container }>
        <BookmarkButtonGroups
          onClickBooklistButton={ this._onClickBooklistButton }
          onClickCollectionButton={ this._onClickCollectionButton } />
        <BookmarkBookGallery isShown={ screenType === screenTypes.BOOK_LIST } />
        <BookmarkCollectionGallery
          isShown={ screenType === screenTypes.COLLECTIONS }
          onClickAddCollectionButton={ this._onClickAddCollectionButton } />
      </View>
    );
  }

  _setStateScreenType = (screenType) => {
    this.setState({ screenType });
  }

  _onClickBooklistButton = () => {
    this._setStateScreenType(screenTypes.BOOK_LIST);
  }

  _onClickCollectionButton = () => {
    this._setStateScreenType(screenTypes.COLLECTIONS);
  }

  _onClickAddCollectionButton = () => {
    const key = 'collectionAdd';
    const params = { selectType: selectType.SELECT_FROM_COLLECTION_ADD_BUTTON };
    navigateTo(this.props, key, params);
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
  header: {
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
  }
});

export default compose(mapNavigateParamsToProps)(BookMark);
