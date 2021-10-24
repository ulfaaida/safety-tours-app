import React from 'react';
import { View, Image, Platform, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firebase from '../../config/firebase';

const createFormData = (photo = {}) => {
const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'android' ? photo.uri.replace('file://', '') : photo.uri,
  });

  
  return data;
};

const UploadPhoto = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    let url = '/Pantai Klayar' + '/image' ;
    console.log();
    firebase.database().ref(url).push({
        photo,
    })
      .then((response) => {
        console.log('response', response);
        Alert.alert('Upload Foto Berhasil');
        this.props.navigation.navigate('Dashboard')
      })
      
   
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <TouchableOpacity style={styles.tmb} onPress={handleUploadPhoto}>
                    <Text style={styles.textTmb}>UPLOAD PHOTO</Text>
                </TouchableOpacity>
        </>
      )}

      <View>
      <TouchableOpacity style={styles.tmb} onPress={handleChoosePhoto}>
                    <Text style={styles.textTmb}>CHOOSE PHOTO</Text>
                </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tmb: {
    height: 40,
    width: '100%',
    backgroundColor: '#F6566F',
    borderRadius: 15,
    marginTop: 10
  },
  textTmb: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 15,
      padding:10
  },
})

export default UploadPhoto;