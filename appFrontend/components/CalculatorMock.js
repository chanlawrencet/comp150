import React from 'react'
import { Calculator } from 'react-native-calculator'
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
} from 'react-native';

class CalculatorMock extends React.Component{

    componentWillMount(){
        this.setState({
            text:'nothing'
        })
    }

    setText = (textInput) => {
        this.setState({
            text: textInput
        })
    }

    componentDidUpdate(){
        const {unlock} = this.props
        if (this.state.text === '18'){
            unlock()
        }
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <Calculator style={{ flex: 1 }} displayTextAlign='right' onTextChange={this.setText}/>
            </View>
        )
    }
}

export default CalculatorMock