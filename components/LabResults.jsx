import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { VictoryGroup, VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryLegend, VictoryPie, VictoryLabel } from 'victory-native';

import { db } from '../firebase';
export default class LabResults extends React.Component{
    state = {
        date_u: [],
        age: [],
        oddzial: [],
        speed_true: 0,
        speed_false: 0, 
        count: 0,
        test: [],
        men: 0,
        woman: 0,
        plec: []
    }
    componentDidMount(){
        let lab = [];
        let date_u = []
        let age = []
        let men = 0
        let woman = 0
        let oddzial = []
        let speed_true = 0
        let speed_false= 0
        let undefined_t = 0
        let test = []

        db.ref('lab').once('value').then((snapshot) => {
        
            snapshot.forEach(snap => {
                lab.push(snap.val());
                this.setState({ count: lab.length })
            });
            // data = data[0];
            lab.map(item => {
                item.speed === false ? speed_false++ : item.speed === true ? speed_true++ : undefined_t++
                item.plec === 'Mężczyzna' ? men++ : item.plec === 'Kobieta' ? woman++ : undefined_t++
                oddzial.push(item.oddzial)
                test.push(item.test) 
                date_u.push(item.date_u)
                age.push(item.age)
                test.push(test.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
                // oddzial.push(test.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
            })
            console.log(oddzial);
            // this.setState({ dok: data })
            this.setState({ oddzial: oddzial[oddzial.length - 1] })
            this.setState({ test: test[test.length - 1]  })
            this.setState({ date_u: date_u })
            this.setState({ speed_true: speed_true })
            this.setState({ speed_false: speed_false })
            this.setState({ age: age })
            this.setState({ men: men })
            this.setState({ woman: woman })
        })
    }
    render(){
        // let r = Object.keys(this.state.badanieCount).reduce((o,c,i) => {o[c] = o[c] ? o[c] + ", " + Object.values(this.state.badanieCount)[i]:Object.values(this.state.badanieCount)[i]; return o;}, {})
    
        delete this.state.test["[object Object]"];
        // delete this.state.oddzial["[object Object]"];

        // console.log(this.state.test);
        const data = {
            mens: [{ x: this.state.date_u[0], y: this.state.men }],
            woman: [{ x: this.state.date_u[0], y: this.state.woman }],
            first: [{ x:"Pierwszy raz", y: this.state.first_time_true },
                    { x:"Kolejny raz", y: this.state.first_time_false }]
        }

        return(
            <ScrollView >
                <View style={styles.container}>
                    <Text>Ostatnie raporty</Text>
                        <View>
                            <Text>Plec</Text>
                            <VictoryChart  width={350}  theme={VictoryTheme.material}>
                                <VictoryAxis label="Data" style={{ axisLabel: {  padding: 30 } }} />
                                <VictoryAxis dependentAxis label="Ilość" style={{ axisLabel: {  padding: 35 } }}  />
                                <VictoryGroup offset={1} >
                                    <VictoryBar alignment="start" data={data.mens} style={{ data: { fill: 'blue', } }} />
                                    <VictoryBar alignment="end" data={data.woman} style={{ data: { fill: 'orange', } }} />
                                </VictoryGroup>
                                <VictoryLegend 
                                    centerTitle
                                    orientation="horizontal"
                                    gutter={20}
                                    data={[ { name: 'Mężczyźni', symbol: { fill: 'blue', }, }, { name: 'Kobiety', symbol: { fill: 'orange', }, },  ]}
                                />
                            </VictoryChart>
                        </View>
                        <View>
                        <Text>Szybkie badanie</Text>
                        <VictoryPie width={350} height={350}
                        labelComponent={<VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 20, fill: "white" }}
                            />}
                            style={{ labelComponent: { fontSize: 20, fill: "white" } }}
                            innerRadius={68} labelRadius={100}
                         data={[
                            { x: this.state.speed_true, y: this.state.speed_true },
                            { x: this.state.speed_false, y: this.state.speed_false },
                        ]} />
                         <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                height={50}
                                data={[ { name: 'Szybki test', symbol: { fill: 'blue', }, }, { name: 'Normalny', symbol: { fill: 'orange', }, },  ]}
                            />
                    </View>
                </View>
            </ScrollView>
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