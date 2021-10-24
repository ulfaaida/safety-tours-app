import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View><Image
                    source={require('../../assets/images/logggo.png')}
                    style={styles.imagelogo}
                />
                </View>
            <Image
                    source={require('../../assets/images/welcome.png')}
                    style={styles.image}
                />
                <Text style={styles.welcome}>Welcome to Safety Tours </Text>
            <View> 
            
                <Text style={styles.greeting}>Getting ready to travel in the new normal?  It's time to go!</Text>
            </View>
            <TouchableOpacity
                        style={styles.signinBtn} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signinText}>
                            SIGN IN
                    </Text>
                    </TouchableOpacity>
        <View><TouchableOpacity
                        style={styles.signupBtn} onPress={() => navigation.navigate('Register')}>    
                        <Text style={styles.signinText}>
                            SIGN UP
                    </Text>
                    </TouchableOpacity>
                    </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    imagelogo: {
        width: 148, 
        height:46,
        marginLeft: -170,
        marginTop: 5
    },
    image: {
        width: 215, 
        height:140,
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center"
    },
    welcome: {
        fontSize: 30,
        textAlign: "center", 
        fontWeight:'bold'
    },
    greeting: {
        fontSize: 18,
        textAlign: "center",
        color: "#717171",
        marginTop: 10, 
        fontWeight:'bold'
    },
    signinBtn: {
        height: 55,
        backgroundColor: "#F6566F",
        borderRadius: 35,
        marginTop: 60,
        width: 250,
        alignItems: "center",
        justifyContent: "center"
    },
    signupBtn: {
        height: 55,
        backgroundColor: "#F6566F",
        borderRadius: 35,
        marginTop: 40,
        width: 250,
        alignItems: "center",
        justifyContent: "center"
    },
    signinText: {
        fontFamily: "Sulphur Point",
        color: "#fff",
        fontSize: 20,
        fontWeight:'bold',
        textAlign: "center",
        fontWeight: "600"
    }
    
})
