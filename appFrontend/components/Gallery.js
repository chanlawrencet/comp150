import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert, Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
class Gallery extends React.Component{

  componentWillMount() {
    this.setState({
      photoURI: null
    })
  }

  componentDidMount() {
    var outside

    fetch('https://comp150.herokuapp.com/getImages')
      .then(response => response.blob())
      .then(images => {
        // Then create a local URL for that image and print it
        var blob = new Blob([images], { type: 'image/png' });
        // var blobUrl = URL.createObjectURL(blob);

        this.setState({
          photoURI: "data:image/png;base64," + blob
        })
      })
  }

  render() {
    const {photoURI} = this.state
    if (photoURI === null){
      return(
        <View style={{flex:1}}>
          <Text>Loading</Text>
        </View>
      )
    }

    return(
      <View style={{flex:1}}>
        <Text>Here:{photoURI}</Text>
        <Image
          // style={{ width: 100, height: 100, position:'flex-center' }}
          source={{uri: 'https://comp150.herokuapp.com/getImages'}}
          style={{ flex: 1,
            transform:[{scale:0.9}]}}
        />
      </View>
    )
  }
}

export default Gallery;