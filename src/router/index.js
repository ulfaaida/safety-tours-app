import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Splash, Welcome, Register, Login, Dashboard, Account, UploadPhoto } from '../pages';
import { BottomNavigation } from '../components';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
<Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
  )
}


const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options= {{headerShown: false }}/>
        <Stack.Screen name="Welcome" component={Welcome} options= {{headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options= {{headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options= {{headerShown: false }}/>
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} options= {{headerShown: false }}/>
        <Stack.Screen name="MainApp" component={MainApp} options= {{headerShown: false }}/>
      </Stack.Navigator>
    )          
}


export default Router

const styles = StyleSheet.create({})
