import React from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photoURI: '',
    showCamera: true
  };

  snap = async () => {
    console.log('snap')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
          quality:0.2,
          skipProcessing:true
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
    const {setPhotoURI, goToForms} = this.props;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
            {showCamera ?
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.type}
                        ref={ref => {this.camera = ref;}}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                        </View>
                    </Camera>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly', margin:20}}>
                        <Button
                            onPress={() => {
                                this.setState({
                                    type:
                                        this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                });
                            }}
                            title='flip'/>

                    <Button
                        onPress={() => this.snap()}
                        title='snap'
                    />
                    </View>
                </View> :
                <View style={{ flex: 1 }}>
                    {photoURI !== '' &&
                        <Image
                            // style={{ width: 100, height: 100, position:'flex-center' }}
                            source={{uri: this.state.photoURI}}
                            style={{ flex: 1,
                            transform:[{scale:0.9}]}}
                        />
                    }
                    <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:20}}>
                        <Button onPress={() => {this.setState({showCamera: true})}} title='retake'/>
                        <Button onPress={() => {
                          setPhotoURI(photoURI)
                          goToForms()
                        }
                        } title='continue'/>
                    </View>
                </View>
            }
        </View>
      );
    }
  }
}