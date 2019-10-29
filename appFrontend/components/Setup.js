import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import t from 'tcomb-form-native';

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


class Setup extends React.Component{


  componentWillMount() {
    this.setState({
      showForm:false,
      email:''
    })
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value == null){
      return
    }
    this.setState({
      email:value.email
    })
  };

  render() {
    const {showForm, email} = this.state;
    if (showForm){
      return (
        <View style={{flex:1, marginTop:50, paddingLeft:50, paddingRight:50}}>
          <Text style={{fontSize: 20, textAlign: "center"}}>Enter your information:{email}:</Text>
          <Form
            type={User}
            ref={c => this._form = c}
          />
          <Button onPress={this.handleSubmit} title={'submit'}/>
          <Button onPress={() => this.setState({showForm: false})} title={'back'}/>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, marginTop:50}}>
        <View style={{marginBottom:10}}>
          <Text style={{fontSize: 20, textAlign: "center"}}>150 Project, {email}</Text>
        </View>
        <View style={{marginBottom:10}}>
          <Button onPress={() => this.setState({showForm: true})} title={'set up app'}/>
        </View>
        <Button title={'emergency call'}/>
      </View>
    );
  }
}

export default Setup;