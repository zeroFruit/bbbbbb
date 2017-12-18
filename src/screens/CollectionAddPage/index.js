import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

import {
  setParamsToNavigation,
  renderHeaderWithNavigation,
  navigateTo
} from '../../Router';
import { selectType } from '../../config';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';

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
        title="새 컬렉션"
        leftLabel="취소"
        rightLabel="다음"
        onClickHeaderRightButton={ onClickHeaderRightButton }
        onClickHeaderLeftButton={ onClickHeaderLeftButton } />
    </Header>
  );
});

class CollectionAddPage extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }
  state = {
    inputText: ''
  };

  componentWillMount() {
    setParamsToNavigation(
      this.props,
      {
        onClickHeaderRightButton: this._onClickHeaderNextButton,
        onClickHeaderLeftButton: this._onClickHeaderCancelButton
      }
    );
  }


  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.labelContainer }>
          <Text style={ styles.labelText }>
            이름
          </Text>
        </View>
        <View style={ styles.inputContainer }>
          <TextInput
            style={ styles.input }
            value={ this.state.inputText }
            onChangeText={ this._onChangeText } />
        </View>
      </View>
    );
  }

  _onChangeText = (inputText) => {
    this.setState({ inputText });
  }

  _onClickHeaderNextButton = () => {
    if (this.state.inputText === '') {
      return Alert.alert('컬렉션 이름을 입력해주세요.');
    }
    const vm = new ViewManager(
      selectType.SELECT_FROM_COLLECTION_NEXT_BUTTON,
      selectType.SELECT_FROM_COLLECTION_NEXT_BUTTON,
      _h._getHeaderWithLabelsProps,
      undefined
    );
    const params = {
      vm,
      selectType: selectType.SELECT_FROM_COLLECTION_NEXT_BUTTON,
      collectionLabel: this.state.inputText
    };
    navigateTo(this.props, 'collectionSelect', params);
  }

  _onClickHeaderCancelButton = () => {

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
    backgroundColor: 'white'
  },
  labelContainer: {
    height: 50,
    paddingLeft: 10,
    borderWidth: .5,
    borderColor: 'black',
    justifyContent: 'center'
  },
  labelText: {
    fontSize: 15
  },
  inputContainer: {
    height: 60,
    borderWidth: .5,
    borderColor: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  input: {
    height: 50
  }
});

export default CollectionAddPage;
