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
  ActivityIndicator, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

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
    const {photoURI, uid, setPhotoURI} = this.props;
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
              setPhotoURI('')
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
        <Text style={{fontSize:30, padding: '3%'}}>Save Evidence Form:</Text>
        {photoURI !== '' ?
          <View style={styles.container}>
            <Image
              source={{uri: photoURI}}
              style={{
                marginLeft: 100,
                marginRight: 100,
                minWidth: 200,
                minHeight: 200,
                transform: [{scale: 0.9}]
              }}
            />
          </View>: <View/>}
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ScrollView>
            <View style={styles.formContainer}>
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.submitForm} style={styles.submitButton} disabled={location.toString().length === 0 || description.toString().length === 0}>
            <Text style={styles.textButton}>Submit</Text>
            <Icon name="arrow-right" size={40} color='black' />
          </TouchableOpacity>
        </View>
        {location.toString().length === 0 || description.toString().length === 0 ?
          <Text style={styles.text}>Please enter location and description.</Text> :
          <Text style={styles.text}></Text>}
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
    fontSize: 20,
    margin: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: "10%",
    justifyContent: 'space-evenly'
  },
  textButton: {
    fontSize: 25,
    textAlign: 'center'
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  submitButton: {
    alignItems: 'center',
    height: 60,
    width: 170,
    flexDirection: 'row',
    backgroundColor: '#ccecff',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    margin: 10
  }
})

export default ViolenceForm;