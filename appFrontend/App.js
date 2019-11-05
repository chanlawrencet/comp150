import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { Calculator } from 'react-native-calculator'
import CalculatorMock from './components/CalculatorMock'
import RealApp from './RealApp'
import Setup from "./components/Setup";

async function alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }

class App extends React.Component{

    setUid = newUid => {
      this.setState({uid:newUid})
    }

    unlock = () => {
        this.setState({locked:false})
    }

    lock = () => {
        this.setState({locked:true})
    }

    setup = () => {
        this.setState({setup: true})
    }

    notSetup = () => {
        this.setState({setup: false})
    }

    setCode = (theCode) => {
        this.setState({code: theCode})
    }


    componentWillMount(){
        this.setState({
            locked:true,
            setup: false,
            code:'1',
            uid: '1234'
        })
    }

    render(){
        const {locked, setup, code, uid} = this.state;
        // alertIfRemoteNotificationsDisabledAsync()
        if (setup){
            return (
                <Setup setCode={this.setCode.bind(this)} notSetup={this.notSetup.bind(this)} setUid={this.setUid.bind(this)}/>
            )
        }

        if (locked){
            return (
              <View style={{ flex: 1 }}>
                  <CalculatorMock code={code} locked unlock={this.unlock.bind(this)}/>
              </View>
            )
        } else {
            return (
              <View style={{ flex: 1 }}>
                  <RealApp reset={this.setup.bind(this)} lock={this.lock.bind(this)} uid={uid}/>
              </View>
            )
        }
    }
}

export default App