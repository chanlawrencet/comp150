import React from 'react'
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
} from 'react-native';
import CameraExample from './components/CameraExample'

class RealApp extends React.Component{

    componentWillMount(){
        this.setState({
            currentView: 'home'
        })
    }
    render(){
        const {lock} = this.props
        const {currentView} = this.state
        return(
            <View style={{ flex: 1 }}>
                {currentView === 'camera' ? <CameraExample/> : null}
                {currentView === 'home' ? (
                    <View style={{marginTop: 50}}>
                        <Text style={{fontSize: 20, textAlign: "center"}}>150 Project</Text>
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 15, textAlign:'center'}}>Options:</Text>
                            <Button onPress={() => this.setState({currentView:'camera'})} title='camera'/>
                        </View>
                    </View>
                ) : null}
                {currentView !== 'home' ? (
                    <View>
                        <Button onPress={() => this.setState({currentView: 'home'})} title='home'/>
                    </View>
                ) : null}
                <Button onPress={lock} title='lock'/>
            </View>
        )

    }
}

export default RealApp