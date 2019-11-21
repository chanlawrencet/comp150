import React from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photoURI: '',
    showCamera: true
  };

  snap = async () => {
    // console.log('snap')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.2,
        skipProcessing: true
      });
      this.setState({
        photoURI: photo.uri,
        showCamera: false
      });
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, showCamera, photoURI } = this.state;
    const { setPhotoURI, goToForms } = this.props;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          {showCamera ?
            <View style={styles.container}>
              <Camera
                style={styles.container}
                type={this.state.type}
                ratio='16:10'
                ref={ref => { this.camera = ref; }}
              >
                <View style={styles.background}>
                  <TouchableOpacity style={styles.flipButton}
                    onPress={() => {
                      this.setState({
                        type:
                          this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                      });
                    }}>
                    <Icon name='sync-alt' size={40} color='black'></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => this.snap()}>
                    <Icon name='stop-circle' size={65} color='black'></Icon>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
            :
            <View style={styles.container}>
              {photoURI !== '' &&
                <Image
                  source={{ uri: this.state.photoURI }}
                  style={{
                    flex: 1,
                    transform: [{ scale: 0.9 }]
                  }}
                />
              }
              <View style={styles.retakeContainer}>
                <TouchableOpacity style={styles.twoButton}
                  onPress={() => { this.setState({ showCamera: true }) }}>
                  <Icon name='undo-alt' size={48} color='black'></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.twoButton}
                  onPress= {() => {setPhotoURI(photoURI); goToForms()}}>
                  <Icon name='arrow-right' size={54} color='black'></Icon>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  actionButton: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    right: 20,
    left: 20,
    alignItems: 'center'
  },
  flipButton: {
    position: 'absolute',
    padding: 15,
    right: 20,
    left: 20,
    alignItems: 'center',
  },
  retakeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25
  },
  twoButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});