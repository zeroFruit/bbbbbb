import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';

class CameraComponent extends PureComponent {
  render() {
    return (
      <View style={ styles.container }>
        <Camera
          ref={ (cam) => { this.camera = cam; } }
          style={ styles.preview }
          aspect={ Camera.constants.Aspect.fill }>
          <Text style={ styles.capture } onPress={ this._takePicture }>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  _takePicture = async () => {
    const options = {};
    try {
      const data = await this.camera.capture({ metadata: options });
      console.log('data', data);
    } catch (e) {
      console.error('error', e);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    alignItems: 'center'
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
