import React from 'react';
import 'localstorage-polyfill'; 
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LabResults from './components/LabResults'
import DokResults from './components/DokResults';
import SignIn from './components/SignIn';
import Admin from './components/Admin'

const Stack = createStackNavigator()

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ekran logowania" screenOptions={{ headerBackTitle: 'Wstecz' }} >
          <Stack.Screen name="Ekran logowania" component={SignIn} />
          <Stack.Screen name="Ekran początkowy" component={ Admin } options={{ headerShown: false }} />
          <Stack.Screen name="Laboratorium" component={LabResults} />
          <Stack.Screen name="Doktorze" component={DokResults} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}
