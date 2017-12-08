import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Vibration, CameraRoll, ScrollView, Alert } from 'react-native';
import { FileSystem } from 'expo';
import {
  renderHeaderWithNavigation,
  setParamsToNavigation,
  navigateTo
} from '../../Router';
import { selectType } from '../../config';
import logger from '../../utils/LogUtils';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import CameraComponent from '../../components/CameraComponent';
import CameraButtonPanel from '../../components/CameraButtonPanel';
import NewPostButtonGroups from '../../components/NewPostButtonGroups';
import NewPostSelectedCameraRoll from '../../components/NewPostSelectedCameraRoll';
import NewPostCameraRollThumbnail from '../../components/NewPostCameraRollThumbnail';

import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';


const renderHeader = defaultViewWhileNoParams((params) => {
  return (
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
});


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
    selectedPhoto: null,
    photoUri: null
  };

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickHeaderRightButton: this._onClickHeaderNextButton,
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
              photoTakenUri={ this.state.photoUri }
              setCameraRef={ this._setCameraRef } />
            <CameraButtonPanel
              onPressButton={ this._takePicture } />
          </View>
        )
      case screenTypes.LIBRARY:
        return (
          <View>
            <NewPostSelectedCameraRoll
              selectedThumbnail={ this.state.selectedPhoto } />
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
      try {
        const photo = await this.camera.takePictureAsync();
        const uri = await CameraRoll.saveToCameraRoll(photo.uri);
        this._setStatePhotoUri(uri);

        Vibration.vibrate();
      } catch (e) {
        logger.log(e, 'Take picture failed');
      }
    }
  }

  _setStateScreenType = (type) => {
    this.setState({ screenType: type });
  }

  _setStateSelectedPhoto = (photo) => {
    this.setState({ selectedPhoto: photo });
  }

  _setStatePhotoUri = (uri) => {
    this.setState({ photoUri: uri });
  }

  _onClickThumbnail = (item) => {
    this._setStateSelectedPhoto(item);
  }

  _onClickHeaderNextButton = () => {
    const { selectedPhoto, photoUri } = this.state;
    if (!selectedPhoto && !photoUri) {
      Alert.alert('등록할 사진을 선택해주세요.');
    } else {
      const key = 'NewPostWrite';
      navigateTo(this.props, key, { photo: photoUri || selectedPhoto });
    }
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  },
  container: {
    justifyContent: 'space-between'
  }
});

export default NewPost;
