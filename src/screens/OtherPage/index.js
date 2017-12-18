import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithSearchBar from '../../components/HeaderBarWithSearchBar';
import OtherPageButtonGroups from '../../components/OtherPageButtonGroups';
import OtherPageBook from '../OtherPage_Book';
import OtherPageCollection from '../OtherPage_Collection';
import OtherPageCollectionBook from '../OtherPage_CollectionBook';
import { fetchUserByIdHOC } from '../../hocs/fetchUserByIdHOC';
import {
  renderHeaderWithNavigation,
  setParamsToNavigation
} from '../../Router';
import { selectType } from '../../config';
import logger from '../../utils/LogUtils';
import { hasPath } from '../../utils/ObjectUtils';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';
import * as _t from '../../ViewManager/_title';

const renderHeader = (params) => {
  const headerTitle = hasPath(params, 'selectedUser') ? params.selectedUser.display_name : 'Loading';
  const vm = new ViewManager(
    selectType.SELECT_FROM_POSTLIST_CLICKED_NICKNAME,
    selectType.SELECT_FROM_POSTLIST_CLICKED_NICKNAME,
    _h._getTextHeaderProps,
    undefined
  );
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithSearchBar
        vm={ vm }
        headerTitle={ headerTitle } />
    </Header>
  );
};

const screenTypes = {
  BOOK_LIST: 'BOOK_LIST',
  COLLECTIONS: 'COLLECTIONS',
  COLLECTION_BOOK_LIST: 'COLLECTION_BOOK_LIST'
};

class OtherPage extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  state = {
    screenType: screenTypes.BOOK_LIST,
    selectedCollectionId: -1
  };

  componentDidMount() {
    setParamsToNavigation(this.props, {
      selectedUser: this.props.selectedUser_
    });
  }
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.top }>
          <View style={ styles.myProfileContainer }>
            <Text style={ styles.myProfileText }>
              {`
                마음에 좋은 책을 읽습니다.
                가장 최근에는
                한병철 - 에로스의 종말을
                읽었습니다.
              `}
            </Text>
          </View>
        </View>
        <View style={ styles.body }>
          <OtherPageButtonGroups
            onClickBooklistButton={ this._onClickBooklistButton }
            onClickCollectionButton={ this._onClickCollectionButton } />
          {
            this._renderOtherPageComponent(this.state.screenType)
          }
        </View>
      </View>
    );
  }

  _renderOtherPageComponent = (screenType) => {
    switch(screenType) {
      case screenTypes.BOOK_LIST:
        return (
          <OtherPageBook
            id={ this.props.userId }
            parentNavigation={ this.props.navigation } />);
      case screenTypes.COLLECTIONS:
        return (
          <OtherPageCollection
            id={ this.props.userId }
            SCREEN_TYPE={ screenTypes }
            setStateSelectedCollectionId={ this._setStateSelectedCollectionId }
            setStateScreenType={ this._setStateScreenType } />
        );
      case screenTypes.COLLECTION_BOOK_LIST:
        return (
          <OtherPageCollectionBook
            parentNavigation={ this.props.navigation }
            collectionId={ this.state.selectedCollectionId } />
        )
      default:
        logger.warn('invalid screen type');
    }
  }

  _setStateScreenType = (type) => {
    this.setState({ screenType: type });
  }

  _setStateSelectedCollectionId = (id) => {
    this.setState({ selectedCollectionId: id });
  }

  _onClickBooklistButton = () => {
    this._setStateScreenType(screenTypes.BOOK_LIST);
  }

  _onClickCollectionButton = () => {
    this._setStateScreenType(screenTypes.COLLECTIONS);
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 0,
    backgroundColor: 'white'
  },
  top: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  myProfileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  myProfileText: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  body: {
    paddingTop: 5,
    flexDirection: 'column',
    alignSelf: 'stretch'
  }
});

export default compose(fetchUserByIdHOC)(OtherPage);
