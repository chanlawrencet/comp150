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
  TouchableOpacity
} from 'react-native';
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Form = t.form.Form;
const FormContent = t.struct({
  location: t.String,
  description: t.String,
});

const options = {
  fields: {
    description: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 150
          }
        }
      }
    }
  }
}

class ViolenceForm extends React.Component {

  componentWillMount() {
    this.setState({
      success: false,
      processing: false,
    })
  }

  submitForm = () => {
    const { photoURI, uid } = this.props;
    const formData = new FormData();
    this.setState({ processing: true })
    formData.append('image', { uri: photoURI, name: 'image.jpg', type: 'image/jpeg' });
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
      () => this.setState({ processing: false, success: true })
    );

  }

  render() {
    const { photoURI } = this.props;
    const { success, processing } = this.state;

    if (processing) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Sending</Text>
        </View>
      )
    }
    if (success) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Success</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {photoURI !== '' ?
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: photoURI }}
              style={{
                flex: 1,
                transform: [{ scale: 0.8 }]
              }}
            />
          </View> : <View style={{ height: '5%' }}/>}
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ScrollView>
            <View style={styles.formContainer}>
              <Form
                type={FormContent}
                options={options}
              />
            </View>   
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.submitForm} style={styles.submitButton}>
              <Text style={styles.textButton}>Submit</Text>
              <Icon name="arrow-right" size={40} color='black' />
            </TouchableOpacity>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    marginTop: 50
  },
  buttonContainer: {
    alignItems: 'center',
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 20,
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