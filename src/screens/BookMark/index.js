import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Header from '../../components/Header';
import BookmarkButtonGroups from '../../components/BookmarkButtonGroups';
import BookmarkBookGallery from '../../components/BookmarkBookGallery';
import BookmarkCollectionGallery from '../../components/BookmarkCollectionGallery';

import {
  renderHeaderWithNavigation,
  navigateTo
} from '../../Router';
import { selectType } from '../../config';

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

  _onClickBooklistButton = () => {
    this.setState({ screenType: screenTypes.BOOK_LIST });
  }

  _onClickCollectionButton = () => {
    this.setState({ screenType: screenTypes.COLLECTIONS });
  }

  _onClickAddCollectionButton = () => {
    const key = 'collectionAdd';
    const params = { selectType: selectType.SELECT_FROM_COLLECTION_ADD_BUTTON };
    navigateTo(this.props, key, params);
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

export default BookMark;
