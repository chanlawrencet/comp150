import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert, Image, ScrollView, KeyboardAvoidingView, FlatList, ActivityIndicator
} from 'react-native';

class Gallery extends React.Component {

  componentWillMount() {
    this.setState({
      photoURI: null,
      numImages: null,
      formData: null
    })
  }

  componentDidMount() {
    const uid = '1234'

    let d = new Date();
    const theKey = d.getMilliseconds().toString()

    fetch('https://comp150.herokuapp.com/getNumImages?uid=' + uid).then(
      response => response.json()).then(
        response => {
          const number = response['number']
          this.setState({
            numImages: number
          })
        }
      )
    fetch ('https://comp150.herokuapp.com/getForms?uid='.concat(uid).concat("&milliseconds=").concat(theKey)).then(
      response => response.json()).then(
        response => {
          const formData = response['forms']
          this.setState({
            formData: formData
          })
        }
    )

  }

  makeImages = () => {
    const { numImages } = this.state;
    let images = []
    for (let i = 0; i < numImages; i++) {
      images.push(this.makeImage(i.toString()))
    }
    return images;
  }

  makeImage = (n) => {
    let d = new Date();
    const theKey = d.getMilliseconds().toString()
    let dd = new Date();
    const theKey2 = dd.getMilliseconds().toString()

    return (
      <View style={{ flex: 1 }} key={theKey.concat(theKey2).concat(n)}>
        <Image
          source={{ uri: "https://comp150.herokuapp.com/getImages?uid=1234&number=".concat(n).concat("&milliseconds=").concat(theKey) }}
          style={{
            flex: 1,
            transform: [{ scale: 0.9 }]
          }}
        />
      </View>
    )

  }

  render() {
    const { photoURI } = this.state;
    const { numImages, formData } = this.state;
    let d = new Date();
    const theKey = d.getMilliseconds().toString()

    if (formData === null) {
      return (
        <View style={{ flex: 1 }} key={theKey}>
          <Text>Loading</Text>
          <ActivityIndicator size={50} color="#0000ff"/>
        </View>
      )
    }

    if (formData === undefined) {
      return (
        <View style={{ flex: 1, padding:6 }} key={theKey}>
          <Text style={{ fontSize: 30, textAlign: 'center' }}>Online Saved Forms</Text>
          <View style={styles.separator}/>
          <Text style={styles.fieldTitleText}>No saved forms found.</Text>
          <Text style={styles.fieldTitleText}>Take a picture or save a form to view forms.</Text>
        </View>
      )
    }

    let previousDateTime = '';
    return(
      <ScrollView style={{padding: 10}} key={theKey.concat("yes")}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Online Saved Forms</Text>
        {formData.map(formInstance => {
          if (formInstance.location === 'N/A') {
            previousDateTime = formInstance.dateTime
            return (
              <View style={{flex: 1}} key={formInstance.dateTime.concat(formInstance.dateTime)}>
                <View style={styles.separator}/>
                <Text style={styles.fieldTitleText}>Time: {formInstance.dateTime}</Text>
                <Image
                  source={{uri: "https://comp150.herokuapp.com/getImages?uid=1234&number=".concat(formInstance.description).concat("&milliseconds=").concat(theKey)}}
                  style={{
                    marginLeft: 100,
                    marginRight: 100,
                    width: 200,
                    height: 200,
                    transform: [{scale: 0.9}]
                  }}
                />

              </View>
            )
          }
          else {
            let oldPrevousDateTime = previousDateTime
            previousDateTime = formInstance.dateTime
            return (
              <View style={{flex:1, marginBottom:5}} key={formInstance.dateTime}>
                {oldPrevousDateTime !== formInstance.dateTime ?
                  <View style={styles.separator}/> : null
                }
                {oldPrevousDateTime !== formInstance.dateTime ?
                  <Text style={styles.fieldTitleText}>Time: {formInstance.dateTime}</Text>
                  : null
                }
                <Text style={styles.fieldTitleText}>Location: {formInstance.location}</Text>
                <Text style={styles.fieldTitleText}>Description: {formInstance.description}</Text>
                <View style={{ height: 15 }}/>
              </View>
            )
          }
        })
        }
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create(
{
  rowContainer:{
    flex: 1,
    flexDirection: 'row'
  },
  fieldTitleText: {
    paddingLeft: 12,
    fontSize: 20,
    margin: 2
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 2.5,
    marginBottom: 15
  }
}
)

export default Gallery