import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import t from 'tcomb-form-native';
import { Calculator } from 'react-native-calculator'

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  address: t.String,
  phone: t.Number,
  age: t.Number,
  emergencyContact: t.Number,
  gender: t.String,
  race: t.String

});

const Dis = t.struct({
  enable: t.Boolean
});


class Setup extends React.Component{


  componentWillMount() {
    this.setState({
      showScreen:'setup',
      uid:'',
      enteredCode:'',
      verifyCode:'',
      showCode: false,
    })
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
    if (value == null){
      return
    }
    this.setState({
      name:value.name,
      address:value.address,
      phone:value.phone,
      age:value.age,
      emergencyContact:value.emergencyContact,
      gender:value.gender,
      race:value.race,
      showScreen:'showCalcSetupInfo',
    })
  };

  handleSubmitD = () => {
    const {notSetup, setCode} = this.props;
    const {enteredCode} = this.state;
    const value = this._formD.getValue();
    if (value == null){
      return
    }
    this.setState({
      agreeToAudio: value.enable,
      showScreen: 'setup'
    })
    notSetup()
    setCode(enteredCode)
  };

  render() {
    const {showScreen, showForm, email, showCalcSetup, enteredCode, showCalcVerify, verifyCode, showCode} = this.state;

    if (showScreen === 'disclaimer'){
      return(
        <View style={{flex:1}}>
          <Text style={{textAlign:'center', marginTop:100, fontSize:20}}>The application can record and notify authorities if it detects violence.</Text>
          <View style={{flex:1, alignSelf: 'center'}}>
            <Form
              type={Dis}
              ref={c => this._formD = c}
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>
            <Button onPress={() => this.setState({showScreen:'showCalcSetupInfo', enteredCode:''})} title={'reset code'}/>
            <Button onPress={this.handleSubmitD} title={'finish'} disabled={enteredCode !== verifyCode}/>
          </View>
        </View>

      )
    }
    if (showScreen === 'showCalcVerify'){
      return(
        <View style={{flex:1}}>
          <Text style={{textAlign:'center', marginTop:50, fontSize:15}}>Re-enter in your desired code in the calculator below:</Text>
          <View style={{flex:1, marginBottom:24}}>
            <Calculator  thousandSeparator='' style={{ flex: 1}} displayTextAlign='right' onTextChange={this.setTextVerify}/>
          </View>
          <View style={{marginTop:24}}>
            {enteredCode !== verifyCode ?
              <Text style={{textAlign:'center', fontSize:20, marginBottom:20, color:'red'}}>Codes do not match.</Text>:
              <Text style={{textAlign:'center', fontSize:20, marginBottom:20, color:'green'}}>Correct code</Text>
            }
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>
            <Button onPress={() => this.setState({showScreen:'showCalcSetupInfo', enteredCode:''})} title={'reset code'}/>
            <Button onPress={() => this.setState({showScreen:'disclaimer'})} title={'next'} disabled={enteredCode !== verifyCode}/>
          </View>
        </View>
      )
    }

    if (showScreen === 'showCode'){
      return (
        <View style={{flex:1, marginTop:200}}>
          <Text style={{textAlign:'center', fontSize:30}}>Your code:</Text>
          <Text style={{textAlign:'center', fontSize:50}}>"{enteredCode}"</Text>
          <View style={{flex:1}}/>
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>
            <Button onPress={() => this.setState({showScreen:'showCalcSetup'})} title={'back'}/>
            <Button onPress={() => this.setState({showScreen:'showCalcVerify'})} title={'continue'}/>
          </View>
        </View>
      )
    }

    if (showScreen === 'showCalcSetup'){
      return(
        <View style={{flex:1}}>
          <Text style={{textAlign:'center', marginTop:50, fontSize:15, marginBottom:5}}>Enter in your desired code in the calculator below:</Text>
          <View style={{flex:1, marginBottom:20}}>
            <Calculator thousandSeparator='' style={{ flex: 1}} displayTextAlign='right' onTextChange={this.setText}/>
          </View>
          <Text style={{textAlign:'center', marginTop:5, fontSize:20, marginBottom:20}}>Currently Entered:"{enteredCode}"</Text>
          {enteredCode.length > 10 ?
            <Text style={{textAlign:'center', marginTop:5, fontSize:20, marginBottom:20, color:'red'}}>Too long. Must be between 5 and 10 characters.</Text>:
            null
          }
          {enteredCode.length < 5 ?
            <Text style={{textAlign:'center', marginTop:5, fontSize:20, marginBottom:20, color:'red'}}>Too short. Must be between 5 and 10 characters.</Text>:
            null
          }
          {enteredCode.length <= 10 && enteredCode.length >=5 ?
            <View style={{height:76}}/> :
            null
          }
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>
            <Button onPress={() => this.setState({showScreen:'showCalcSetupInfo'})} title={'back'}/>
            <Button onPress={() => this.setState({showScreen:'showCode'})} title={'next'} disabled={enteredCode.length > 10 || enteredCode.length < 5}/>
          </View>
        </View>
      )
    }

    if (showScreen === 'showCalcSetupInfo'){
      return (
        <View style={{flex:1, marginTop:200}}>
          <Text style={{textAlign:'center', fontSize:30}}>This app requires a secret calculator code to be entered. Please enter your desired code on the next page.</Text>
          <Text style={{textAlign:'center', fontSize:20}}>Code must be 5-10 characters long.</Text>
          <View style={{flex:1}}/>
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>
            <Button onPress={() => this.setState({showScreen:'showForm'})} title={'back'}/>
            <Button onPress={() => this.setState({showScreen:'showCalcSetup'})} title={'continue'}/>
          </View>

        </View>
      )
    }

    if (showScreen === 'showForm'){
      return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
          <ScrollView style={{flex:1}}>
            <View style={{flex:1, marginTop:50, paddingLeft:50, paddingRight:50}}>
              <Text style={{fontSize: 20, textAlign: "center"}}>Enter your information:</Text>
              <Form
                type={User}
                ref={c => this._form = c}
              />
              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginBottom:10}}>
                <Button onPress={() => this.setState({showScreen:'setup'})} title={'back'}/>
                <Button onPress={this.handleSubmit} title={'submit'}/>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      )
    }
    return (
      <View style={{ flex: 1, marginTop:50}}>
        <View style={{marginBottom:10}}>
          <Text style={{fontSize: 20, textAlign: "center"}}>150 Project {email}</Text>
        </View>
        <View style={{marginBottom:10}}>
          <Button onPress={() => this.setState({showScreen: 'showForm'})} title={'set up app'}/>
        </View>
        <Button title={'emergency call'}/>
      </View>
    );
  }
}

export default Setup;