import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import firebase from '../../config/firebase';

let dataArr = [];
let labelArr = []
const dayArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthArray = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
let today;

const items = [
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

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            day: '',
            date: '',
            location: null,
            coordinate: null,
            latlong: null,
            refreshing: false,
        }
    }

    componentDidMount() {
        let day = new Date().getDay();
        let date = new Date().getDate();
        let month = new Date().getMonth();
        month = monthArray[month]
        const year = new Date().getFullYear();
        console.log(month)

        if (date < 10) {
            date = '0' + date;
        }

        if (month < 10) {
            month = '0' + month;
        }

        let currentDay = dayArray[day];
        today = date + ' ' + month + ' ' + year;
        let currentDate = date + '-' + month + '-' + year;
        this.setState({ day: currentDay, date: currentDate })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        firebase.database().ref('/').once('value', (snap) => {
            let value = snap.val()
        }).then(() => {
            this.setState({ refreshing: false })
        })
    }

    handlePlace(item) {
        console.log(item)
        let locationName = item.name
        let locationId = item.id

        firebase.database().ref('/' + locationName).on('value', (snap) => {
            let latitude = snap.val().latitude
            let longitude = snap.val().longitude

            const location = {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }

            const locationWithoutDelta = {
                latitude,
                longitude
            }

            const region = Object.create(location)
            const coordinate = Object.create(locationWithoutDelta)
            this.setState({ latlong: region, coordinate, location: locationName })

        })

        firebase.database().ref('/' + locationName + '/data').on('value', (snap) => {
            let key;
            let value;
            dataArr = []
            labelArr = []
            snap.forEach((item) => {
                key = item.key
                value = item.val()
                console.log(value.nilai)
                dataArr.push(Number(value.nilai))
                labelArr.push(value.day)
            })
            console.log(key)
            console.log(value)

            this.setState({ data: value })
        })
    }

    render() {
        const { data, day, date, location, latlong, coordinate, refreshing } = this.state
        console.log(day)
        console.log(date)

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps='always'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                {/* <Text style={styles.title}>Bezier Line Chart</Text> */}
                <Text style={styles.title}>Informasi Kondisi Pariwisata</Text>
                <Text style={styles.date}>{day}, {today}</Text>
                <SearchableDropdown
                    style={styles.searchForm}
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => this.handlePlace(item)}
                    textInputStyle={{
                      width: '100%',
                      alignSelf: "center",
                      borderColor: "#ccc",
                      borderBottomWidth: 1,
                      color: "#353535",
                      top: 35,
                    }}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={{
                        color: '#222',
                    }}
                    items={items}
                    defaultIndex={0}
                    placeholder="Pilih Lokasi Pariwisata"
                    placeholderTextColor="grey" 
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />
                {location ?
                    <View>
                      
                        <View style={styles.mapContainer}>
                        
                                <MapView
                                style={{
                                    flex: 1,
                                    height: '100%',
                                    width: '100%', 
                                    justifyContent: 'center', 
                                    position: 'absolute',
                                    top:70
                                }}
                                region={latlong}
                            >
                                <MapView.Marker
                                    coordinate={coordinate}
                                    title={location}
                                />
                            </MapView>
                            <Text style={styles.lokasimap}>Lokasi pada Maps</Text>
                        </View>
                        <View style={styles.indicatorWrapper}>
                            <Text style={styles.nilai}>Nilai Akhir = {data.nilai}</Text>
                            <Text style={styles.status}>Kondisi: {data.status}</Text>
                        </View>
                        <LineChart
                            data={{
                                labels: labelArr,
                                datasets: [
                                    {
                                        data: dataArr
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width * 0.94} // from react-native
                            height={220}
                            // yAxisLabel="$"
                            // yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#E90024",
                                backgroundGradientFrom: "#FFA8B5",
                                backgroundGradientTo: "#F9D9DE",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#E90024"
                                }
                            }}
                            bezier
                            style={styles.chart}
                        />
                        <Text style={styles.detail}>Details</Text>
                        <View style={styles.cardContainer}>
                              <View style={styles.card}>
                                <View style={styles.botPart}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='universal-access' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>Keramaian</Text>
                                        </View>
                                        <Text style={{ fontSize: 30, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.keramaian} dB</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.cardContainer}>
                              <View style={styles.card}>
                                <View style={styles.botPart}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='percent' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>Kebersihan</Text>
                                        </View>
                                        <Text style={{ fontSize: 30, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.kebersihan} %</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.cardContainer}>
                              <View style={styles.card2}>
                                <View style={styles.botPart}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={styles.valueWrapper}>
                                            <Icon name='globe' size={22} color='#fff' style={styles.iconValue} />
                                            <Text style={styles.value}>Skor Pemakaian Masker</Text>
                                        </View>
                                        <Text style={{ fontSize: 30, color: '#fff', fontWeight: '700', textAlign: 'center' }}>{data.masker} </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> : <Text style={{ color: '#bbb', fontSize: 32, fontWeight: '600', textAlign: 'center', marginTop: 100 }}>Search Place</Text>
                }

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30
    },
    title: {
      fontFamily: "Sulphur Point",
      fontSize: 22,
      fontWeight: "200",
      fontWeight: "bold",
      textAlign:"center",
      color: "#353535"
    },
    date: {
      fontFamily: "Sulphur Point",
      fontSize: 12,
        color: '#353535',
        top: 10,
        textAlign: 'center',
        fontWeight: "200",
        letterSpacing: 1.5
    },
       itemStyle: {
        padding: 5,
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        
    },
    indicatorWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor :'#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    nilai: {
      fontFamily: "Sulphur Point",
        fontSize: 18,
        fontWeight: 'bold',
        color: '#353535',
        top: 10
    },
    status: {
      fontFamily: "Sulphur Point",
        fontSize: 12,
        color: 'grey',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        top: 10
    },
    chart: {
        marginVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    lokasimap: {
      fontFamily: "Sulphur Point",
      fontSize: 18,
        fontWeight: '700',
        color: '#353535',
        textAlign: 'center',
        marginLeft: -50,
        top:-70 
    },
    detail: {
      fontFamily: "Sulphur Point",
      fontSize: 24,
        fontWeight: '700',
        color: '#353535',
        textAlign: 'center',
        top:10, 
        marginBottom: 10,
        elevation: 15
    },
    cardContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding:10
    },
    card: {
        width: '100%',
        height: 100,
        backgroundColor: '#FFA8B5',
        borderRadius: 35,
        marginHorizontal: 'auto',
        elevation: 15,
    },
    card2: {
        width: '100%',
        height: 100,
        backgroundColor: '#FFA8B5',
        borderRadius: 35,
        marginHorizontal: 'auto',
        elevation: 15,
        marginBottom: 20
    },
    botPart: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    valueWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    value: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        fontWeight: '600',
        marginLeft: 6
    },
    mapContainer: {
        marginTop: 8,
        width: Dimensions.get("window").width * 0.94,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        marginLeft: Dimensions.get("window").width * 0.03,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden',
    }
})

export default Home;