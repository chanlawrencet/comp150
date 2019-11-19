import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import CameraExample from './components/CameraExample'
import ViolenceForm from "./components/ViolenceForm";
import Gallery from "./components/Gallery";
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

    if (currentView === 'gallery') {
      return (
        <View style={{ flex: 1 }}>
          <Gallery />
          <View style={{ marginBottom: 10 }}>
            <Button onPress={() => {
              this.setState({
                currentView: 'home',
                photoURI: ''
              })
            }} title='home' />
          </View>
          <Button onPress={lock} title='lock' />
        </View>
      )

    }
    if (currentView === 'form') {
      return (
        <View style={{ flex: 1 }}>
          <ViolenceForm photoURI={photoURI} uid={uid} />
          <View style={{ marginBottom: 10 }}>
            <Button onPress={() => {
              this.setState({
                currentView: 'home',
                photoURI: ''
              })
            }} title='home' />
          </View>
          <Button onPress={lock} title='lock' />
        </View>
      )
    }

    if (currentView === 'camera') {
      return (
        <View style={{ flex: 1 }}>
          <CameraExample goToForms={this.goToForms.bind(this)} setPhotoURI={this.setPhotoURI.bind(this)} />
          <Button onPress={() => this.setState({ currentView: 'home' })} title='home' />
          <Button onPress={lock} title='lock' />
        </View>
      )
    }

    // if (currentView === 'audio'){
    //     return(
    //       <View style={{flex:1}}>
    //         <AudioExample setAudioURI={this.setAudioURI.bind(this)} uid={uid}/>
    //         <Button onPress={() => this.setState({currentView: 'home'})} title='home'/>
    //         <Button onPress={lock} title='lock'/>
    //       </View>
    //     )
    // }

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
                onPress={() => this.setState({ currentView: 'gallery' })}
                style={styles.menuOption}
              >
                <Icon name="images" size={50} color='black' />
                <Text style={styles.text}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ currentView: 'form' })}
                style={styles.menuOption}
              >
                <Icon name="sticky-note" size={50} color='black' />
                <Text style={styles.text}>New Form</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert('Saved forms will be displayed.')}
                style={styles.menuOption}
              >
                <Icon name="folder-open" size={50} color='black' />
                <Text style={styles.text}>Saved Forms</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ currentView: 'audio' })}
                style={styles.menuOption}
              >
                <Icon name="volume-up" size={50} color='black' />
                <Text style={styles.text}>Record Audio</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={reset}
                style={styles.menuOption}
              >
                <Icon name="cog" size={50} color='black' />
                <Text style={styles.text}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.emergencyContainer}>
            <TouchableOpacity onPress={lock} style={styles.lockButton}>
              <Icon name="lock" size={50} color='black' />
              <Text style={styles.text}>Lock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('Emergency call will be made.')}
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
      backgroundColor: '#c4c4c4',
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
      justifyContent: 'space-evenly'
    },
    lockButton: {
      alignItems: 'center',
      height: '100%',
      width: '50%',
      backgroundColor: 'orange',
      justifyContent: 'space-evenly'
    },
    text: {
      fontSize: 20
    }
  }
)

export default RealApp
