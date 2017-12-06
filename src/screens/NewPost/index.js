import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Vibration, CameraRoll } from 'react-native';
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
    
  }

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickHeaderRightButton: () => {},
      onClickHeaderLeftButton: () => {}
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <CameraComponent
          setCameraRef={ this._setCameraRef } />
        <CameraButtonPanel
          onPressButton={ this._takePicture } />
        <NewPostButtonGroups />
      </View>
    );
  }

  _setCameraRef = (camera) => {
    this.camera = camera;
  }

  _takePicture = async () => {
    // if (this.camera) {
    //   const photo = await this.camera.takePictureAsync();
    //   try {
    //     const result = await CameraRoll.saveToCameraRoll(photo.uri);
    //     Vibration.vibrate();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    console.log('clicked!');
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
