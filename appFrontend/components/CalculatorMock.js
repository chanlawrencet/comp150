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
        const {unlock, code} = this.props
        if (this.state.text === code){
            unlock()
        }
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <Calculator thousandSeparator='' style={{ flex: 1 }} displayTextAlign='right' onTextChange={this.setText}/>
            </View>
        )
    }
}

export default CalculatorMock