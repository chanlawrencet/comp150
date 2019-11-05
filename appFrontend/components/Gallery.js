import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert, Image, ScrollView, KeyboardAvoidingView, FlatList
} from 'react-native';

class Gallery extends React.Component{

  componentWillMount() {
    this.setState({
      photoURI: null,
      numImages: null
    })
  }

  componentDidMount() {
    // const {uid} = this.props
    console.log('callingsdfsd')
    const uid = '1234'
    fetch('https://comp150.herokuapp.com/getNumImages?uid='+uid).then(
      response => response.json()).then(
        response => {
          const number = response['number']
          this.setState({
            numImages: number
          })
        }
    )


  }

  makeImages = () => {
    const {numImages} = this.state;
    let images = []
    for (let i = 0; i < numImages; i++){
      images.push(this.makeImage(i.toString()))
    }
    return images;
  }

  makeImage = (n) => {
    let d = new Date();
    const theKey = d.getMilliseconds().toString()
    let dd = new Date();
    const theKey2 = dd.getMilliseconds().toString()

    return(
      <View style={{flex:1}} key={theKey.concat(theKey2).concat(n)}>
        <Image
          source={{uri: "https://comp150.herokuapp.com/getImages?uid=1234&number=".concat(n).concat("&milliseconds=").concat(theKey)}}
          style={{ flex: 1,
            transform:[{scale:0.9}]}}
        />
      </View>
    )

  }


  render() {
    const {photoURI} = this.state;
    const {numImages} = this.state;
    let d = new Date();
    const theKey = d.getMilliseconds().toString()

    if (numImages === null){
      return(
        <View style={{flex:1}} key={theKey}>
          <Text>Loading</Text>
        </View>
      )
    }

    return(
      <View style={{flex:1}} key={theKey.concat("NO")}>
        {this.makeImages()}
      </View>

    )
  }
}

export default Gallery;