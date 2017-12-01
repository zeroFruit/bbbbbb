import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  renderHeaderWithNavigation,
  setParamsToNavigation
} from '../../Router';
import { selectType } from '../../config';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import CameraComponent from '../../components/CameraComponent';


const renderHeader = params => (
  <Header headerStyle={ StyleSheet.flatten(styles.header) }>
    <HeaderBarWithTexts
      title="페이지 업로드"
      leftLabel="뒤로"
      rightLabel="완료"
      onClickHeaderRightButton={ params.onClickHeaderRightButton ? params.onClickHeaderRightButton : () => {} }
      onClickHeaderLeftButton={ params.onClickHeaderLeftButton ? params.onClickHeaderLeftButton : () => {} }
      selectType={ selectType.SELECT_FROM_COLLECTION_CARD } />
  </Header>
);

class NewPost extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
  }

  render() {
    return (
      <View>
        <CameraComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  }
});

export default NewPost;
