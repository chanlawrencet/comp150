import React from 'react'
import {
  Dimensions,
  Image,
  Slider,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
  
  export default class AudioExample extends React.Component {

    recordAudio = async () => {
      console.log("Now Recording...")

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      if (this.recording !== null) {
        this.recording.setOnRecordingStatusUpdate(null);
        this.recording = null;
      }
  
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(this.recordingSettings);
      recording.setOnRecordingStatusUpdate
  
      this.recording = recording;
      const audioURI = this.recording.getURI()
      //setAudioURI(audioURI)
      await this.recording.startAsync();
      this.setState({
        isLoading: false,
        audioURI: audioURI
      });
      //await this.recording.stopAndUnloadAsync();
      console.log("Recording finished")
      console.log("This is the URI: " + audioURI)
    }

    // Need to figure out when to stop recording w/ .stopAndUploadAsync() and how to set audioURI 
    // so RealApp.js has access to it like CameraExample.js and photoURI

    constructor(props) {
      super(props);
      this.recording = null;
      this.state = {
        haveRecordingPermissions: false,
        isRecording: false,
        shouldCorrectPitch: true,
        audioURI: '',
        volume: 1.0,
        rate: 1.0,
      };
      this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
      this.recordingSettings.android['maxFileSize'] = 10000 // size of max audio file to be created in bytes
    }
  
    componentDidMount() {
      this._askForPermissions();
      setInterval(this.recordAudio, 4000)
    }
  
    _askForPermissions = async () => {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      this.setState({
        haveRecordingPermissions: response.status === 'granted',
      });
    };
  
    render() {
      //onst {setAudioURI} = this.props;
      if (!this.state.haveRecordingPermissions){
          return (
              <View style={{flex:1}}>
                  <View />
                  <Text>
                    You must enable audio recording permissions in order to use this.
                  </Text>
                  <View />
              </View>
          )
      }
//       <View style={{flex:1}}>
// was   <View style={styles.container}
      return (
        <View style={{ flex:1 }}>
            <Text>
             You are now recording audio!
            </Text>
            <View />
        </View>
      );
    }
  }