import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../config/firebase';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '' , this.state.password === '' , this.state.email === '') {
      Alert.alert('Enter details to Sign In!')
    } else {
      this.setState({
        isLoading: true,
      })
    
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('MainApp')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}> 
      <Image
        source={require('../../assets/images/logggo.png')}
        style={styles.imagelogo}
                /> 
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          placeholderTextColor="grey" 
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          placeholderTextColor="grey" 
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#F6566F"
          title="Sign in"
          onPress={() => this.userLogin()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Register')}>
          Don't have an account? Click here to Sign Up
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  imagelogo: {
    width: 259, 
    height:80,
    alignSelf: "center",
    marginBottom: 35,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 10,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    color: "#353535"
  },
  loginText: {
    color: '#46A6FF',
    marginTop: 15,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});