import React from 'react'
import {
    Dimensions,
    Image,
    Slider,
    TouchableHighlight,
    StyleSheet,
    Button,
    View,
    Text,
} from 'react-native';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';


export default class AudioExample extends React.Component {
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

    recordAudio = async () => {
        console.log("Now Recording...")
        const value = this.props;
        const { audioURI } = this.state;

        /*this.setState({
          agreeToAudio: value.Enabled
        })*/

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
        let audio = await recording.prepareToRecordAsync(this.recordingSettings);
        recording.setOnRecordingStatusUpdate

        this.recording = recording;
        const aURI = this.recording.getURI()

        await this.recording.startAsync();
        this.setState({
            isLoading: false,
            audioURI: aURI,
            //agreeToAudio: value.disable
        });
    
        console.log("This is the this.audioURI: " + this.state.audioURI)
    }

    stopAudio = async () => {
        console.log("Stopping Audio Recording")
        const audio = this.recording.getURI()
        console.log("Recording has now stopped")
    }

    uploadAudio = async (uid) => { //uri
        //const { audioURI, uid } = this.props;
        this.setState({ processing: true })
        /* 
        let database = 'http://localhost:5000/uploadAudio'
        */
        
        console.log('audioURI before uploading: ' + this.state.audioURI)

        const formData = new FormData();
        formData.append('audio', {
            uri: this.state.audioURI,
            name: 'audio.m4a',
            type: 'audio/m4a',
        });

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        delete options.headers['Content-Type'];

        fetch('https://comp150.herokuapp.com/uploadAudio?uid=' + uid, options).then(
            () => this.setState({ processing: false, success: true })
        );
    }

    componentDidMount() {
        this._askForPermissions();
        this.recordAudio()
        //setTimeout(this.stopAudio, 5000)
    }

    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({
            haveRecordingPermissions: response.status === 'granted',
        });
    };

    render() {
        const { setAudioURI, uid } = this.props;
        //onst {setAudioURI} = this.props;
        if (!this.state.haveRecordingPermissions) {
            return (
                <View style={{ flex: 1 }}>
                    <View />
                    <Text>
                        You must enable audio recording permissions in order to use this.
                  </Text>
                </View>
            )
        }
        //       <View style={{flex:1}}>
        // was   <View style={styles.container}
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 20 }}>
                    You are now recording audio!
            </Text>
                <Button onPress={() => {
                    this.stopAudio()
                    setAudioURI(this.state.audioURI)
                    this.uploadAudio(uid)
                }
                } title='upload' />
            </View>
        );
    }
}