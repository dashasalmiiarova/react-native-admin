import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { signin, signup } from '../auth';
import { auth } from '../firebase';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import ButtonMain from './ButtonMain';
import Spinner from './Spinner';
import SignUpButton from './SignUpButton';
import firebase from 'firebase';

let customFonts = {
    'Avenir_Medium': require('../assets/fonts/Avenir/Avenir-Medium-09.ttf'),
    'Proxima Nova': require('../assets/fonts/Proxima_nova/Mark-Simonson-Proxima-Nova-Alt-Condensed-Regular.ttf'),
}

export default class SignIn extends React.Component{
    state={
        fontsLoaded: false,
        email: '',
        password: '',
        error: null,
        userData: { }
    }
    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    componentDidMount(){
        this._loadFontsAsync();
    }
    getHandler = key => val => {
        this.setState({ [key]: val })
    }
    handleSignin = e => {
        e.preventDefault();
        this.setState({ error: '' });
        try{
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            // localStorage.setItem( auth().currentUser)
            this.setState({ 
                email: '',
                password: '', })
            this.props.navigation.replace("Ekran początkowy");
            
        } catch(error) {
            this.setState({ error: error.message });
        }
    }
    // handleSignup = e => {
    //     e.preventDefault();
    //     this.setState({ error: '' });
    //     try{
    //         signup(this.state.email, this.state.password);
    //         this.setState({ 
    //             email: '',
    //             password: '', })
    //         this.props.navigation.replace("Ekran początkowy");
    //     } catch(error) {
    //         this.setState({ error: error.message });
    //     }
    // }
    render(){
        if(this.state.fontsLoaded){
            return(
                <KeyboardAvoidingView behavior="padding" style={styles.container} ref="scroller" keyboardShouldPersistTaps={true} >
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                        <View style={styles.contentContainer}>
                            <Text style={styles.mainText}>Zaloguj się </Text>
                            <TextInput style={styles.input} placeholder='Email' value={this.state.email} onChangeText={ this.getHandler('email') } keyboardType='email-address' placeholderTextColor="#43425D" />
                            <TextInput style={styles.input} placeholder='Hasło' secureTextEntry={true} autoCorrect={false} value={this.state.password} onChangeText={ this.getHandler('password') } keyboardType='default' placeholderTextColor="#43425D" />
                                { this.state.error ? <Text style={styles.danger}>{ this.state.error }</Text> : null }
                            <ButtonMain style={styles.buttonSubmit} title="Zaloguj się" onPress={ this.handleSignin } />
                            {/* <SignUpButton style={styles.buttonSubmit} title="Zarejestruj się" onPress={ this.handleSignup } /> */}
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )
        } else{
            return <Spinner />
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FAF8',
    },
    contentContainer: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    mainText: {
        fontFamily: 'Avenir_Medium',
        fontSize: 15,
        color: '#9FA5AA',
    },
    danger: {
        color: 'red'
    },
    input: {
        margin: 20,
        padding: 7,
        marginTop: 10,
        width: '80%',
        borderBottomColor: '#646D82',
        borderBottomWidth: 1,
    },
    checkBox: {
        padding: 5,
    },
    buttonSubmit: {
        width: '80%',
    },
    buttonSubmitView:{
        marginBottom: 40,
    }
})