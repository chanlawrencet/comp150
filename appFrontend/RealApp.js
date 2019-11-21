import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import CameraExample from './components/CameraExample'
import ViolenceForm from "./components/ViolenceForm"
import Gallery from "./components/Gallery"
// import AudioExample from "./components/AudioExample";


class RealApp extends React.Component {

  goToForms = () => {
    this.setState({ currentView: 'form' })
  }

  setPhotoURI = (uri) => {
    this.setState({ photoURI: uri })
  }

  setAudioURI = (uri) => {
    this.setState({ audioURI: uri })
  }

  componentWillMount() {
    this.setState({
      currentView: 'home',
      photoURI: '',
      audioURI: ''
    })
  }

  render() {
    const { lock, reset, uid } = this.props
    const { currentView, photoURI } = this.state

    // if (currentView === 'audio') {
    //   return (
    //     <View style={styles.container}>
    //       <View style={styles.notiBar}></View>
    //       <View style={styles.contentContainer}>
    //         <AudioExample setAudioURI={this.setAudioURI.bind(this)} uid={uid} />
    //       </View>
    //       <View style={styles.emergencyContainer}>
    //         <TouchableOpacity
    //           onPress={() => this.setState({ currentView: 'home' })}
    //           style={styles.backButton}
    //         >
    //           <Icon name="arrow-left" size={50} color='black' />
    //           <Text style={styles.text}>Back</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={lock} style={styles.lockButton}>
    //           <Icon name="lock" size={50} color='black' />
    //           <Text style={styles.text}>Lock</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   )
    // }

    if (currentView === 'gallery') {
      return (
        <View style={styles.container}>
          <View style={styles.notiBar}></View>
          <View style={styles.contentContainer}>
            <Gallery />
          </View>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ currentView: 'home', photoURI: '' })}
              style={styles.backButton}
            >
              <Icon name="home" size={50} color='black' />
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={lock} style={styles.lockButton}>
              <Icon name="lock" size={50} color='black' />
              <Text style={styles.text}>Lock</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (currentView === 'form') {
      return (
        <View style={styles.container}>
          <View style={styles.notiBar}></View>
          <View style={styles.contentContainer}>
            <ViolenceForm photoURI={photoURI} uid={uid} />
          </View>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ currentView: 'home', photoURI: '' })}
              style={styles.backButton}
            >
              <Icon name="home" size={50} color='black' />
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={lock} style={styles.lockButton}>
              <Icon name="lock" size={50} color='black' />
              <Text style={styles.text}>Lock</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (currentView === 'camera') {
      return (
        <View style={styles.container}>
          <View style={styles.notiBar}></View>
          <View style={styles.contentContainer}>
            <CameraExample goToForms={this.goToForms.bind(this)} setPhotoURI={this.setPhotoURI.bind(this)} />
          </View>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ currentView: 'home' })}
              style={styles.backButton}
            >
              <Icon name="home" size={50} color='black' />
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={lock} style={styles.lockButton}>
              <Icon name="lock" size={50} color='black' />
              <Text style={styles.text}>Lock</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (currentView === 'home') {
      return (
        <View style={styles.container}>
          <View style={styles.notiBar}></View>
          <View style={styles.contentContainer}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ currentView: 'camera' })}
                style={styles.menuOption}
              >
                <Icon name="camera" size={50} color='black' />
                <Text style={styles.text}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ currentView: 'form' })}
                style={styles.menuOption}
              >
                <Icon name="images" size={50} color='black' />
                <Text style={styles.text}>Add Note</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ currentView: 'gallery' })}
                style={styles.menuOption}
              >
                <Icon name="sticky-note" size={50} color='black' />
                <Text style={styles.text}>Saved Files</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ currentView: 'audio' })}
                style={styles.menuOption}
              >
                <Icon name="microphone" size={50} color='black' />
                <Text style={styles.text}>Audio Detection</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => Alert.alert(
                  'Reset App?',
                  'All information stored on this version of the app will be destroyed.',
                  [
                    {text: 'Cancel', onPress: () => this.setState({ currentView: 'home' })},
                    {text: 'OK', onPress: reset}
                  ],
                  {cancelable: false}
                )}
                style={styles.menuOption}
              >
                <Icon name="cog" size={50} color='black' />
                <Text style={styles.text}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity onPress={lock} style={styles.lockButton}>
              <Icon name="lock" size={50} color='black' />
              <Text style={styles.text}>Lock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('Emergency call', "Emergency call will be placed momentarily.")}
              style={styles.callButton}
            >
              <Icon name="phone" size={50} color='black' />
              <Text style={styles.text}>Emergency Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    notiBar: {
      height: '3%',
      backgroundColor: 'black'
    },
    contentContainer: {
      height: '82%',
      justifyContent: 'space-evenly'
    },
    rowContainer: {
      height: '25%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    menuOption: {
      alignItems: 'center',
      width: '40%',
      height: '100%',
      backgroundColor: '#ccecff',
      justifyContent: 'space-evenly',
      borderRadius: 10
    },
    emergencyContainer: {
      height: '15%',
      flexDirection: 'row'
    },
    callButton: {
      alignItems: 'center',
      height: '100%',
      width: '50%',
      backgroundColor: '#ff1a1a',
      justifyContent: 'space-evenly',
      borderWidth: 2,
      borderTopWidth: 4,
      borderColor: 'black'
    },
    lockButton: {
      alignItems: 'center',
      height: '100%',
      width: '50%',
      backgroundColor: 'orange',
      justifyContent: 'space-evenly',
      borderWidth: 2,
      borderTopWidth: 4,
      borderColor: 'black'
    },
    backButton: {
      alignItems: 'center',
      height: '100%',
      width: '50%',
      backgroundColor: '#ccecff',
      justifyContent: 'space-evenly',
      borderWidth: 2,
      borderTopWidth: 4,
      borderColor: 'black'
    },
    text: {
      fontSize: 20
    }
  }
)

export default RealApp