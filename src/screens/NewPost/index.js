import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Vibration, CameraRoll, ScrollView } from 'react-native';
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
import NewPostSelectedCameraRoll from '../../components/NewPostSelectedCameraRoll';
import NewPostCameraRollThumbnail from '../../components/NewPostCameraRollThumbnail';


const renderHeader = params => (
  <Header headerStyle={ StyleSheet.flatten(styles.header) }>
    <HeaderBarWithTexts
      title="페이지 업로드"
      leftLabel="취소"
      rightLabel="다음"
      onClickHeaderRightButton={ params.onClickHeaderRightButton ? params.onClickHeaderRightButton : () => {} }
      onClickHeaderLeftButton={ params.onClickHeaderLeftButton ? params.onClickHeaderLeftButton : () => {} }
      selectType={ selectType.SELECT_FROM_COLLECTION_CARD } />
  </Header>
);


const screenTypes = {
  PICTURE: 'screenType/picture',
  LIBRARY: 'screenType/library'
};
class NewPost extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  state = {
    screenType: screenTypes.PICTURE,
    selectedThumbnail: null
  };

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        {
          this._renderComponent(this.state.screenType)
        }
        <NewPostButtonGroups
          SCREEN_TYPES={ screenTypes }
          setStateScreenType={ this._setStateScreenType } />
      </View>
    );
  }

  _renderComponent = (screenType) => {
    switch(screenType) {
      case screenTypes.PICTURE:
        return (
          <View>
            <CameraComponent
              setCameraRef={ this._setCameraRef } />
            <CameraButtonPanel
              onPressButton={ this._takePicture } />
          </View>
        )
      case screenTypes.LIBRARY:
        return (
          <View>
            <NewPostSelectedCameraRoll
              selectedThumbnail={ this.state.selectedThumbnail } />
            <NewPostCameraRollThumbnail
              onClickThumbnail={ this._onClickThumbnail } />
          </View>
        );
      default:
        return <View />;
    }
  }

  _setCameraRef = (camera) => {
    this.camera = camera;
  }

  _takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      try {
        const result = await CameraRoll.saveToCameraRoll(photo.uri);
        Vibration.vibrate();
      } catch (e) {
        console.log(e);
      }
    }
  }

  _setStateScreenType = (type) => {
    this.setState({ screenType: type });
  }

  _onClickThumbnail = (item) => {
    this.setState({ selectedThumbnail: item });
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
