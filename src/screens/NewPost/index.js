import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileSystem } from 'expo';
import {
  renderHeaderWithNavigation,
  setParamsToNavigation
} from '../../Router';
import { selectType } from '../../config';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import CameraComponent from '../../components/CameraComponent';
import CameraButtonPanel from '../../components/CameraButtonPanel';
import NewPostButtonGroups from '../../components/NewPostButtonGroups';


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

  state = {
    photoUri: null,
    photoId: 0
  };

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={ styles.container }>
        <CameraComponent
          setStatePhotoId={ this._setStatePhotoId }
          setStatePhotoUri={ this._setStatePhotoUri }
          photoId={ this.state.photoId } />
        <View style={ { justifyContent: 'center', alignItems: 'center' } }>
          <Text>{ this.state.photoUri }</Text>
        </View>
      </View>
    );
  }

  _setStatePhotoUri = (uri) => {
    this.setState({ photoUri: uri });
  }

  _setStatePhotoId = (id) => {
    this.setState({ photoId: id });
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  },
  container: {
  }
});

export default NewPost;
