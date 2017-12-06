import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { SCREEN_WIDTH } from '../../config';

class CameraComponent extends PureComponent {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return (
        <View style={ styles.errContainer }>
          <Text>No permissions set</Text>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return (
        <View style={ styles.errContainer }>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <Camera
          style={ styles.preview }
          ref={ (ref) => { this.props.setCameraRef(ref); } }
          ratio="4:3"
          type={ this.state.type } />
      );
    }
  }
}

const styles = StyleSheet.create({
  errContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  preview: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default CameraComponent;
