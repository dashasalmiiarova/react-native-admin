import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class LabResults extends React.Component{
    state = {
        date_u: [],
        age: [],
        plec: [],
        oddzial: [],
        speed: [], 
        count: 0,
    }
    componentDidMount(){
        let date_u = []
        let age = []
        let plec = []
        let oddzial = []
        let speed = []

        db.ref('lab').once('value').then((snapshot) => {
        
            snapshot.forEach(snap => {
                data.push(snap.val());
                this.setState({ count: data.length })
            });

            data.map(item => {
                oddzial.push(item.oddzial)
                speed.push(item.speed)
               plec.push(item.plec)
               date_u.push(item.date_u)
               age.push(item.age)
            })
            
            // this.setState({ dok: data })
            this.setState({ oddzial: oddzial })
            this.setState({ speed: speed })
            this.setState({ plec: plec })
            this.setState({ date_u: date_u })
            this.setState({ age: age })
        })
    }
    render(){
        console.log("Lab:", this.state.lab);
        return(
            <View style={styles.container}>
                <Text>LabResults</Text>
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})