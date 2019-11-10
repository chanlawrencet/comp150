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
import ViolenceForm from "./components/ViolenceForm";
import Gallery from "./components/Gallery";
import Audio from 
"./components/Audio";


class RealApp extends React.Component{

    goToForms = () => {
        this.setState({currentView:'form'})
    };

    setPhotoURI = (uri) => {
        this.setState({photoURI: uri})
    };

    componentWillMount(){
        this.setState({
            currentView: 'home',
            photoURI: ''
        })
    }
    render(){
        const {lock, reset, uid} = this.props
        const {currentView, photoURI} = this.state

        if (currentView === 'gallery'){
          return(
            <View style={{flex:1}}>
              <Gallery/>
              <View style={{marginBottom:10}}>
                <Button onPress={() => {
                  this.setState({
                    currentView: 'home',
                    photoURI: ''
                  })
                }} title='home'/>
              </View>
              <Button onPress={lock} title='lock'/>
            </View>
          )

        }
        if (currentView === 'form'){
            return(
              <View style={{flex:1}}>
                  <ViolenceForm photoURI={photoURI} uid={uid}/>
                  <View style={{marginBottom:10}}>
                      <Button onPress={() => {
                          this.setState({
                              currentView: 'home',
                              photoURI: ''
                          })
                      }} title='home'/>
                  </View>
                <Button onPress={lock} title='lock'/>
              </View>
            )
        }

        if (currentView === 'camera'){
            return(
              <View style={{flex:1}}>
                  <CameraExample goToForms={this.goToForms.bind(this)} setPhotoURI={this.setPhotoURI.bind(this)}/>
                  <Button onPress={() => this.setState({currentView: 'home'})} title='home'/>
                  <Button onPress={lock} title='lock'/>
              </View>
            )
        }

        if (currentView === 'home'){
            return(
              <View style={{flex:1}}>
                  <View style={{marginTop: 50}}>
                      <Text style={{fontSize: 20, textAlign: "center"}}>150 Project</Text>
                      <View style={{marginTop: 20}}>
                          <Text style={{fontSize: 15, textAlign:'center'}}>Options:</Text>
                          <View style={{marginBottom:10}}>
                            <Button onPress={() => this.setState({currentView:'camera'})} title='camera'/>
                          </View>
                          <View style={{marginBottom:10}}>
                            <Button onPress={() => this.setState({currentView: 'form'})} title='new form'/>
                          </View>
                          {/*<View style={{marginBottom:10}}>*/}
                          {/*    <Button onPress={() => this.setState({currentView: 'form'})} title='old forms'/>*/}
                          {/*</View>*/}
                          <View style={{marginBottom:10}}>
                              <Button onPress={() => this.setState({currentView: 'gallery'})} title='gallery'/>
                          </View>
                          <View style={{marginBottom:10}}>
                              <Button onPress={() => this.setState({currentView: 'audio'})} title='record audio'/>
                          </View>
                          <View style={{marginBottom:10}}>
                              <Button onPress={reset} title='reset'/>
                          </View>
                          <Button onPress={lock} title='lock'/>
                      </View>
                  </View>
              </View>
            )
        }
    }
}

export default RealApp
