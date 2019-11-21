import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator
} from 'react-native';


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class ViolenceForm extends React.Component{

  componentWillMount() {
    this.setState({
      success: false,
      processing: false,
      location: '',
      description:''
    })
  }

  submitForm = () => {
    const {photoURI, uid} = this.props;
    const {location, description} = this.state;

    this.setState({processing: true})

    // send rest of form

    const currDate = new Date();
    const body = {
      location: location,
      description: description,
      dateTime: currDate.toLocaleString()
    };

    fetch('https://comp150.herokuapp.com/sendForm?uid=' + uid,
      {method:'POST',
        body:JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }})
      .then(response => response.status)
      .then(status => {
        if (status !== 200){
          console.log('big bad')
        }
        if (photoURI !== ""){
          const formData = new FormData();
          formData.append('image', {uri: photoURI, name: 'image.jpg', type: 'image/jpeg'});
          formData.append('dateTime', currDate.toLocaleString());
          const options = {
            method: 'POST',
            body: formData,
            // If you add this, upload won't work
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          };

          delete options.headers['Content-Type'];

          fetch('https://comp150.herokuapp.com/uploadImage?uid=' + uid, options).then(
            () => {
              this.setState({processing: false, success:true})
            });
        } else {
          this.setState({processing: false, success:true})
        }
      }).catch(x => {
      console.log('no data', x)
      return('no data')
    })
  };

  render() {
    const {photoURI, goToHome} = this.props;
    const {success, processing, location, description} = this.state;

    if (processing){
      return(
        <View  style={styles.container}>
          <Text style={styles.text}>Sending...</Text>
          <ActivityIndicator size={50} color="#0000ff"/>
        </View>
      )
    }
    if (success){
      sleep(1000).then(() => {goToHome()})
      return(
        <View style={styles.container}>
          <Text style={styles.text}>Success! Going home...</Text>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <Text style={{fontSize:30, padding: 6}}>Save Evidence Form:</Text>
        {photoURI !== '' ?
          <View style={styles.container}>
            <Image
              source={{uri: photoURI}}
              style={{
                marginTop: 5,
                marginLeft: 100,
                marginRight: 100,
                minWidth: 200,
                minHeight: 200,
                transform: [{scale: 0.9}]
              }}
            />
          </View>: <View/>}
        <KeyboardAvoidingView style={{flex:1, marginTop:20, paddingLeft:5, paddingRight:5}} behavior="padding" enabled>
          <ScrollView>
            <Text>Location:</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding:5 }}
              onChangeText={text => this.setState({location:text})}
              value={location}
            />
            <Text>Description:</Text>
            <TextInput
              style={{ height: 100, borderColor: 'gray', borderWidth: 1, textAlignVertical:'top', padding:5}}
              onChangeText={text => this.setState({description:text})}
              multiline
              numberOfLines={4}
              value={description}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.submitForm}
            title='submit'
            disabled={location.toString().length === 0 || description.toString().length === 0}
          />
          {location.toString().length === 0 || description.toString().length === 0 ?
            <Text>Please enter location and description.</Text> :
            null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 50 
  },
  buttonContainer: {
    alignItems: 'center',
    height: '15%'
  },
  submitButton: {
    alignItems: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: '#ff1a1a',
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderTopWidth: 4,
    borderColor: 'black'
  }
})

export default ViolenceForm;