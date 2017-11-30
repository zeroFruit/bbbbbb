import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithSearchBar from '../../components/HeaderBarWithSearchBar';
import OtherPageButtonGroups from '../../components/OtherPageButtonGroups';
import OtherPageBook from '../OtherPage_Book';
import OtherPageCollection from '../OtherPage_Collection';
import { fetchUserByIdHOC } from '../../hocs/fetchUserByIdHOC';
import {
  renderHeaderWithNavigation,
  setParamsToNavigation
} from '../../Router';
import { selectType } from '../../config';
import logger from '../../utils/LogUtils';
import { hasPath } from '../../utils/ObjectUtils';


const renderHeader = (params) => {
  const headerTitle = hasPath(params, 'selectedUser') ? params.selectedUser.display_name : 'Loading';
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithSearchBar
        headerTitle={ headerTitle }
        selectType={ selectType.SELECT_FROM_POSTLIST_CLICKED_NICKNAME } />
    </Header>
  );
};

const screenTypes = {
  BOOK_LIST: 'BOOK_LIST',
  COLLECTIONS: 'COLLECTIONS'
};

class OtherPage extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  state = {
    screenType: screenTypes.BOOK_LIST
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
        return <OtherPageCollection />;
      default:
        logger.warn('invalid screen type');
    }
  }

  _setStateScreenType = (type) => {
    this.setState({ screenType: type });
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
