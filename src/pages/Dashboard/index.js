import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as ImagePicker from 'react-native-image-picker';
import firebase from '../../config/firebase';

const locations = [
  { id: 1, name: 'Agrowisata Belimbing' },
  { id: 2, name: 'Gofun Theme Park' },
  { id: 3, name: 'Khayangan Api' },
  { id: 4, name: 'Pantai Boom Tuban' },
  { id: 5, name: 'Pantai Kelapa Tuban' },
  { id: 6, name: 'Pantai Klayar' },
  { id: 7, name: 'Pantai Kutang' },
  { id: 8, name: 'Pantai Remen Tuban' },
  { id: 9, name: 'Pantai Semilir Tuban' },
  { id: 10, name: 'Waduk Pacal' },
];

const dayArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let day = new Date().getDay();
let date = new Date().getDate();
let month = new Date().getMonth() + 1;
// month = monthArray[month]
const year = new Date().getFullYear();
const currentDate = date + '-' + month + '-' + year;
const currentDay = dayArray[day]


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resourcePath: '',
          lokasi: '',
          keramaian: '',
          kebersihan: '',
          masker: '',
          tempError: null,
          tempError2: null,
          tempError3: null,

        }
    }

    // Launch Camera
  cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
    } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    });
  }

    tempValidation() {
        console.log(this.state.keramaian)
        if (this.state.keramaian >= 100) {
            console.log("Keramaian tidak boleh lebih dari 100 dB")
            this.setState({ tempError: "Keramaian tidak boleh lebih dari 100 dB" })}
        if (this.state.kebersihan >= 100) {
                console.log("Nilai Kebersihan di antara 0-100 %")
                this.setState({ tempError2: "Nilai Kebersihan di antara 0-100%" })} 
        if (this.state.masker >= 100) {
                    console.log("Skor Pemakaian Masker dalam range 0-100")
                    this.setState({ tempError3: "Skor Pemakaian Masker dalam range 0-100" })
        } else {
            this.setState({ tempError: null , tempError2: null , tempError3: null })
        }
    }

    handleSubmit(lokasi, keramaian, kebersihan, masker, resourcePath,) {
        let url = '/' + lokasi + '/data';
        console.log(url);

        firebase.database().ref(url).push({
            resourcePath,
            keramaian,
            kebersihan,
            masker,
            date: currentDate,
            day: currentDay
        })
            .then(() => {
                this.setState({ lokasi: '', keramaian: '', kebersihan: '', masker: '', resourcePath: '' })
                alert('Berhasil!','Data telah tersimpan');
                this.props.navigation.navigate('Dashboard');
            })
    }

    handleLokasi(item) {
        console.log(item);
        this.setState({ lokasi: item.name })
    }

    render() {
        const { navigation } = this.props;
        const { lokasi, keramaian, kebersihan, masker, resourcePath } = this.state;
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.form}>
                <View style={styles.container}>
                <Text style={styles.halo}>Input Data Kondisi Pariwisata</Text>
                <View style={styles.garis} />
                    <Text style={styles.label}>Lokasi Wisata</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        onItemSelect={item => this.handleLokasi(item)}
                        textInputStyle={{
                          width: '100%',
                          alignSelf: "center",
                          borderColor: "#ccc",
                          borderBottomWidth: 1,
                          color: "#353535",
                          
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={locations}
                        defaultIndex={0}
                        placeholder="Nama Lokasi Wisata"
                        placeholderTextColor="grey"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.inputTitleA}>Keramaian</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onBlur={() => this.tempValidation()}
                        placeholder="Dalam dB"
                        placeholderTextColor="grey"
                        keyboardType="number-pad"
                        maxLength={4}
                        onChangeText={keramaian => this.setState({ keramaian })}
                        value={keramaian}
                    />
                    {
                        this.state.tempError ? <Text style={{ 
                          fontSize: 14,
                          color: 'red', 
                          marginTop: -15, 
                          marginBottom: 15 }}>{this.state.tempError}</Text> : null
                    }
                    <Text style={styles.label}>Kebersihan</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onBlur={() => this.tempValidation()}
                        placeholder="Dalam %"
                        placeholderTextColor="grey"
                        keyboardType="number-pad"
                        maxLength={3}
                        onChangeText={kebersihan => this.setState({ kebersihan })}
                        value={kebersihan}
                    />
                    {
                        this.state.tempError2 ? <Text style={{ 
                          fontSize: 14,
                          color: 'red', 
                          marginTop: -15, 
                          marginBottom: 15 }}>{this.state.tempError2}</Text> : null
                    }
                    <Text style={styles.label}>Pemakaian Masker</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onBlur={() => this.tempValidation()}
                        placeholder="Masukkan Skor 0-100"
                        placeholderTextColor="grey"
                        keyboardType="number-pad"
                        maxLength={3}
                        onChangeText={masker => this.setState({ masker })}
                        value={masker}
                    />
                    {
                        this.state.tempError3 ? <Text style={{ 
                          fontSize: 14,
                          color: 'red', 
                          marginTop: -15, 
                          marginBottom: 15 }}>{this.state.tempError3}</Text> : null
                    }
                    <View>
                    <Text style={{ alignItems: 'center' }}
                    value={resourcePath} >
                    {this.state.resourcePath.uri}
                    </Text>
                    <TouchableOpacity onPress={this.cameraLaunch} style={styles.tmb}  >
                        <Text style={styles.textTmb}>Take a Photo from Camera</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('UploadPhoto')} 
                    style={styles.tmb}  >
                    <Text style={styles.textTmb}>
                      Take a Photo from File
                      </Text>
                    </TouchableOpacity>      
                    <TouchableOpacity
                        style={styles.tmb}
                        onPress={() => this.handleSubmit(lokasi, keramaian, kebersihan, masker, resourcePath)} >
                        <Text style={styles.textTmb}>
                            SUBMIT
                    </Text>
                    </TouchableOpacity>

                    </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 30,
    backgroundColor: '#fff'
  },
  halo: {
    fontFamily: "Sulphur Point",
    fontSize: 22,
    fontWeight: "300",
    fontWeight: "bold",    
    textAlign:"center",
    color: "#353535",
    top: 5
  },
  garis: {
    borderWidth: 1,
    marginBottom: 35,
    marginTop: 15,
    color: "#353535"
  },
  label: {
    fontFamily: "Sulphur Point",
    fontSize: 15,
    fontWeight: "bold",
    color: "#353535"
  },
    inputTitleA: {
      fontFamily: "Sulphur Point",
      fontSize: 15,
      fontWeight: "bold",
      color: "#353535",
      marginTop: 24
    },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1,
      color: "#353535"
    },
    tmb: {
      height: 40,
      width: '100%',
      backgroundColor: '#F6566F',
      borderRadius: 15,
      marginTop: 15
    },
    textTmb: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        padding:10
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default Dashboard;