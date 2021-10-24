import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
import firebase from '../../config/firebase';

export default class Account extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }


  alertSign = () => {
    Alert.alert(
      //title
      'Hi,',
      //body
      'Are you sure want to logout ?',
      [
          { text: 'Yes', onPress: this.signOut },
          { text: 'No', onPress: this.cancleSignout, style: 'cancel' },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
  );
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Welcome')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  cancleSignout = () => {
    this.props.navigation.navigate('Account');
  }

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
          <Image
                    source={require('../../assets/images/akun.png')}
                    style={styles.imagelogo}
                />
        <Text style = {styles.textStyle}>
          Your Name : {this.state.displayName}
        </Text>
        <Text style = {styles.textStyle}>
            Thank You!</Text>

        <Button
          color="#F6566F"
          title="Logout"
          onPress={() => this.alertSign()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  imagelogo: {
    width: 120, 
    height:120,
    alignSelf: "center",
    marginBottom: 10
},
  textStyle: {
    fontFamily : "Sulphur Point",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20
  }
});