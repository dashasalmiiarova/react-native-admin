import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container } from 'native-base';
import Spinner from './Spinner';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import ButtonMain from './ButtonMain';

const UserScreen = () => {
    const navigation = useNavigation();
    const { height: screenHeight } = Dimensions.get('window');
    let [fontsLoaded] = useFonts({
      'Avenir_Black': require('../assets/fonts/Avenir/Avenir-Black-03.ttf'),
      'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
    });
    if (!fontsLoaded) {
      return <Spinner />;
    } else {
      return (
          <Container>
            <View style={ { flex: 3, height: screenHeight, justifyContent: 'center', alignItems: 'center', } } >
              <Text style={styles.mainText}>Wybierz oddział</Text>
              <ButtonMain title="Laboratorium" onPress={() => navigation.navigate('Laboratorium')  } />
              <ButtonMain title="Doktorze" onPress={() => navigation.navigate('Doktorze')  } />
            </View>
          </Container>
      );
    }
  };
  
  export default UserScreen;
  
  const styles = StyleSheet.create({
      container:{
        backgroundColor: '#F0FAF8',
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      // mainCon:{
      //   flex: 1,
      //   height: screenHeight,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // },
      mainText:{
          fontFamily: 'Avenir_Black',
          fontSize: 25,
      },
  });