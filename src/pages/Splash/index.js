import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout( () => {
            navigation.replace('Welcome');
        }, 3000)
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
             source={require('../../assets/images/logggo.png')}
             style={styles.imagelogo}
             />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9D9DE'
    },
    imagelogo: {
        width: 259, 
        height:80,
        alignSelf: "center",
        marginBottom: 35,
    },
    
})
