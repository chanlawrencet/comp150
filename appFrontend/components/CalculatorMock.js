import React from 'react'
import { Calculator } from 'react-native-calculator'
import { StyleSheet, View } from 'react-native'

class CalculatorMock extends React.Component {

    componentWillMount() {
        this.setState({
            text: 'nothing'
        })
    }

    setText = (textInput) => {
        this.setState({
            text: textInput
        })
    }

    componentDidUpdate() {
        const { unlock, code } = this.props
        if (this.state.text === code) {
            unlock()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Calculator
                    style={styles.calculator}
                    thousandSeparator=''
                    displayTextAlign='right'
                    onTextChange={this.setText}
                    numericButtonBackgroundColor='white'
                    numericButtonColor='black'
                    acceptButtonColor='pink'
                    acceptButtonBackgroundColor='orange'
                    fontSize={48}
                    borderColor='black'
                />
                <View style={styles.padding}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calculator: {
        flex: 5,
        paddingTop: 24
    },
    padding: {
        height: 24
    }
})

export default CalculatorMock