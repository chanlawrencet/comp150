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



class App extends React.Component{

    unlock = () => {
        this.setState({locked:false})
    }

    componentWillMount(){
        this.setState({locked:true})
    }

    render(){
        const {locked} = this.state

        return(
            <View style={{ flex: 1 }}>
                {locked ? (
                    <CalculatorMock locked unlock={this.unlock.bind(this)}/>
                ) : 
                <View>
                    <Text style={{marginTop: 50, fontSize: 20, textAlign: "center"}}>Unlocked!</Text>
                    <Button onPress={() => this.setState({locked:true})} title='lock'/>
                </View>

                }
                
            </View>
        )
    }
}

export default App