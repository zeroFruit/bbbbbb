import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import CollectionSelectGallery from '../../components/CollectionSelectGallery';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation,
  navigateTo
} from '../../Router';

const renderHeader = (params) => {
  const { selectType, onClickHeaderRightButton, onClickHeaderLeftButton } = params;
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithTexts
        title="추가"
        leftLabel="뒤로"
        rightLabel="완료"
        onClickHeaderRightButton={ onClickHeaderRightButton }
        onClickHeaderLeftButton={ onClickHeaderLeftButton }
        selectType={ selectType } />
    </Header>
  );
};

class CollectionSelectPage extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  componentWillMount() {
    setParamsToNavigation(
      this.props,
      {
        onClickHeaderRightButton: this._onClickHeaderCompleteButton,
        onClickHeaderLeftButton: this._onClickHeaderBackButton
      }
    );
  }

  render() {
    return <CollectionSelectGallery />;
  }

  _onClickHeaderCompleteButton = () => {

  }

  _onClickHeaderBackButton = () => {

  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

export default CollectionSelectPage;
