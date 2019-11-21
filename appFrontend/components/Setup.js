import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import t from 'tcomb-form-native'
import { Calculator } from 'react-native-calculator'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  address: t.String,
  phone: t.Number,
  emergencyContact: t.Number
});

class Setup extends React.Component {

  componentWillMount() {
    this.setState({
      showScreen: 'setup',
      uid: '',
      enteredCode: '',
      verifyCode: '',
      showCode: false,
    })

    fetch('https://comp150.herokuapp.com/resetDatabase').then(r => r);
  }

  setText = (textInput) => {
    this.setState({
      enteredCode: textInput
    })
  };

  setTextVerify = (textInput) => {
    this.setState({
      verifyCode: textInput
    })
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value == null) {
      return
    }
    this.setState({
      name: value.name,
      address: value.address,
      phone: value.phone,
      emergencyContact: value.emergencyContact,
      showScreen: 'showCalcSetupInfo',
    })
  };

  handleSubmitD = () => {
    const { notSetup, setCode } = this.props;
    const { enteredCode } = this.state;
    this.setState({
      showScreen: 'setup'
    })
    notSetup()
    setCode(enteredCode)
  };

  render() {
    const { showScreen, showForm, email, showCalcSetup, enteredCode, showCalcVerify, verifyCode, showCode } = this.state;

    if (showScreen === 'showCalcVerify') {
      return (
        <View style={styles.container}>
          <View style={styles.notiBar}></View>
          <View style={{ height: '7%' }}>
            <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 5 }}>Re-enter in your desired code in the calculator below:</Text>
          </View>
          <View style={{ paddingHorizontal: '2%', height: '65%' }}>
            <View style={{ height: '100%' }}>
              <Calculator thousandSeparator='' style={{ flex: 1 }} displayTextAlign='right' onTextChange={this.setTextVerify}
                numericButtonBackgroundColor='white' numericButtonColor='black' fontSize={35} borderColor='black' />
            </View>
          </View>

          <View style={{ height: '14%', paddingTop: '5%' }}>
            {enteredCode !== verifyCode ?
              <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20, color: 'red' }}>Codes do not match.</Text> :
              <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20, color: 'green' }}>Correct code</Text>
            }
          </View>
          <View style={styles.calculatorButtonContainer}>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showCalcSetupInfo' })} style={styles.twoButton}>
              <Icon name="arrow-left" size={25} color='black' />
              <Text style={styles.textButton}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSubmitD} disabled={enteredCode !== verifyCode} style={styles.twoButton}>
              <Text style={styles.textButton}>Finish</Text>
              <Icon name="arrow-right" size={25} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (showScreen === 'showCode') {
      return (
        <View style={styles.container}>
          <View style={{ height: '35%' }}></View>
          <Text style={styles.titleText}>Your code:</Text>
          <Text style={styles.titleText}>"{enteredCode}"</Text>
          <View style={{ height: '5%' }}></View>
          <View style={styles.calculatorButtonContainer}>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showCalcSetupInfo' })} style={styles.twoButton}>
              <Icon name="arrow-left" size={25} color='black' />
              <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showCalcVerify' })}
              disabled={enteredCode.length > 10 || enteredCode.length < 5}
              style={styles.twoButton}>
              <Text style={styles.textButton}>Next</Text>
              <Icon name="arrow-right" size={25} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (showScreen === 'showCalcSetup') {
      return (
        <View style={styles.container}>
          <View style={styles.notiBar}></View>
          <View style={{ height: '7%' }}>
            <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 5 }}>Enter in your desired code in the calculator below:</Text>
          </View>
          <View style={{ paddingHorizontal: '2%', height: '65%' }}>
            <View style={{ height: '100%' }}>
              <Calculator thousandSeparator='' style={{ flex: 1 }} displayTextAlign='right' onTextChange={this.setText}
                numericButtonBackgroundColor='white' numericButtonColor='black' fontSize={35} borderColor='black' />
            </View>
          </View>
          <View style={{ height: '7%' }}>
            <Text style={{ fontSize: 20, textAlign: "center", paddingTop: 5 }}>Currently Entered: "{enteredCode}"</Text>
          </View>
          {enteredCode.length > 10 ?
            <Text style={styles.redText}>Too long. Must be between 5 and 10 characters.</Text> :
            null
          }
          {enteredCode.length < 5 ?
            <Text style={styles.redText}>Too short. Must be between 5 and 10 characters.</Text> :
            null
          }
          {enteredCode.length <= 10 && enteredCode.length >= 5 ?
            <Text style={styles.redText}></Text> :
            null
          }
          <View style={styles.calculatorButtonContainer}>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showCalcSetupInfo' })} style={styles.twoButton}>
              <Icon name="arrow-left" size={25} color='black' />
              <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showCode' })}
              disabled={enteredCode.length > 10 || enteredCode.length < 5}
              style={styles.twoButton}>
              <Text style={styles.textButton}>Next</Text>
              <Icon name="arrow-right" size={25} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (showScreen === 'showCalcSetupInfo') {
      return (
        <View style={styles.container}>
          <View style={{ height: '15%' }}></View>
          <View style={{ height: '30%' }}>
            <Text style={{ fontSize: 24, textAlign: 'center', padding: '5%' }}>Please enter your secret code on the next page
            and make sure your surroundings are clear before entering your code each time.</Text>
          </View>
          <View style={{ height: '8%' }}></View>
          <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 36, paddingTop: 6 }}>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showForm' })} style={styles.twoButton}>
              <Icon name="arrow-left" size={25} color='black' />
              <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showCalcSetup' })} style={styles.twoButton}>
              <Text style={styles.textButton}>Next</Text>
              <Icon name="arrow-right" size={25} color='black' />
            </TouchableOpacity>
          </View>
          <View style={{ height: '10%' }}></View>
        </View>
      )
    }

    if (showScreen === 'showForm') {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ScrollView>
            <View style={styles.notiBar}></View>
            <View style={styles.contentContainer}>
              <View style={styles.textBox}>
                <Text style={styles.titleText}>Enter your information:</Text>
              </View>
              <View style={styles.formContainer}>
                <Form
                  type={User}
                  ref={c => this._form = c}
                />
              </View>
              <View style={styles.twoButtonContainer}>
                <TouchableOpacity onPress={() => this.setState({ showScreen: 'setup' })} style={styles.twoButton}>
                  <Icon name="arrow-left" size={25} color='black' />
                  <Text style={styles.textButton}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleSubmit} style={styles.twoButton}>
                  <Text style={styles.textButton}>Next</Text>
                  <Icon name="arrow-right" size={25} color='black' />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.notiBar}></View>
        <ScrollView style={styles.contentContainer}>
        <View style={{ height: 30 }}></View>
          <Text style={styles.titleText}>Hey there!</Text>
          <View style={{ height: 10 }}></View>
          <View style={styles.textBox}>
            <Text style={styles.text}>This is Ada. It can help you document instances of mistreatment
            from your family members or significant other on a shared or monitored phone discreetly.</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>This is how Ada works: the front-facing app is a fully functional calculator, but when
            you enter your personal code on the calculator, it reveals a portal for you to take pictures
            and notes or place emergency calls to local authorities. Anything you save on the app will be safely stored on the cloud and cannot be
            found from anywhere else on your phone, so you don’t need to worry.</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Even if someone else finds out about Ada, you can remove all
            your data easily by hitting the reset button, and you can later contact us to retrieve
            your account and documentation.</Text>
          </View>
          <View style={{ height: 30 }}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.setState({ showScreen: 'showForm' })} style={styles.submitButton}>
              <Text style={styles.textButton}>Set Up Ada</Text>
              <Icon name="arrow-right" size={40} color='black' />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notiBar: {
    height: 24,
    backgroundColor: 'white'
  },
  contentContainer: {
    height: '82%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textBox: {
    padding: '2%'
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
    paddingTop: '2%'
  },
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  redText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: 'red',
    height: '7%',
  },
  buttonContainer: {
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: '5%',
    justifyContent: 'space-evenly',
    marginBottom: '0.5%'
  },
  textButton: {
    fontSize: 25,
    textAlign: 'center'
  },
  submitButton: {
    alignItems: 'center',
    height: 60,
    width: 190,
    flexDirection: 'row',
    backgroundColor: '#ccecff',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    margin: 10
  },
  twoButtonContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  twoButton: {
    alignItems: 'center',
    height: 50,
    width: 140,
    flexDirection: 'row',
    backgroundColor: '#ccecff',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    margin: 10
  },
  formContainer: {
    width: '90%'
  },
  calculatorButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly'
  }
})

export default Setup;