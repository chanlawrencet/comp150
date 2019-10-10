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

async function alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }

class App extends React.Component{

    unlock = () => {
        this.setState({locked:false})
    }

    lock = () => {
        this.setState({locked:true})
    }

    componentWillMount(){
        this.setState({locked:true})
    }

    render(){
        const {locked} = this.state
        // alertIfRemoteNotificationsDisabledAsync()
        return(
            <View style={{ flex: 1 }}>
                {locked ? (
                    <CalculatorMock locked unlock={this.unlock.bind(this)}/>
                ) : 
                <RealApp lock={this.lock.bind(this)}/>
                }
                
            </View>
        )
    }
}

export default App