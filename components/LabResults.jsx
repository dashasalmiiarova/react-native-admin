import { shift } from 'core-js/fn/array';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, LogBox } from 'react-native';
import { VictoryGroup, VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryLegend, VictoryPie, VictoryLabel } from 'victory-native';

import { db } from '../firebase';
export default class LabResults extends React.Component{
    state = {
        date_u: [],
        age: [],
        oddzial: {},
        speed_true: 0,
        speed_false: 0, 
        count: 0,
        test: {},
        men: 0,
        woman: 0,
        plec: {}
    }
    componentDidMount(){
        LogBox.ignoreLogs(['Warning: ...']);
        LogBox.ignoreAllLogs();
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
               
            });
            
            lab = lab[0];
            lab.map(item => {
                item.speed === false ? speed_false++ : item.speed === true ? speed_true++ : undefined_t++
                item.plec === 'Mężczyzna' ? men++ : item.plec === 'Kobieta' ? woman++ : undefined_t++
                oddzial.push(item.oddzial)
                test.push(item.test) 
                date_u.push(item.date_u)
                age.push(item.age)
                test.push(test.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
                oddzial.push(oddzial.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
            })
           
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
        delete this.state.test["[object Object]"];
        delete this.state.oddzial["[object Object]"];
        const data = {
            mens: [{ x: this.state.date_u[0], y: this.state.men }],
            woman: [{ x: this.state.date_u[0], y: this.state.woman }],
            first: [{ x:"Pierwszy raz", y: this.state.first_time_true },
                    { x:"Kolejny raz", y: this.state.first_time_false }]
        }

        return(
            <ScrollView >
                <View style={styles.container}>
                    <Text style={ styles.mainText }>Ostatnie raporty</Text>
                        <View>
                            <Text style={ styles.plainText }>Plec</Text>
                            <VictoryChart  width={350}  theme={VictoryTheme.material}>
                                <VictoryAxis label="Data" style={{ axisLabel: {  padding: 30 } }} />
                                <VictoryAxis dependentAxis label="Ilość" style={{ axisLabel: {  padding: 35 } }}  />
                                <VictoryGroup offset={1} >
                                    <VictoryBar alignment="start" data={data.mens} style={{ data: { fill: '#15386a', } }} />
                                    <VictoryBar alignment="end" data={data.woman} style={{ data: { fill: '#f2c1b7', } }} />
                                </VictoryGroup>
                                <VictoryLegend 
                                    centerTitle
                                    orientation="horizontal"
                                    gutter={20}
                                    data={[ { name: 'Kobiety', symbol: { fill: '#f2c1b7', }, },  { name: 'Mężczyźni', symbol: { fill: '#15386a', }, }, ]}
                                />
                            </VictoryChart>
                        </View>
                        <View>
                        <Text style={ styles.plainText }>Szybkie badanie</Text>
                        <VictoryPie width={350} height={350}
                            labelComponent={<VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 20, fill: "white" }}
                            />}
                            style={{ labelComponent: { fontSize: 20, fill: "white" } }}
                            innerRadius={68} labelRadius={100}
                            colorScale={["#7EE8B8", "#2CD889" ]}
                         data={[
                            { x: this.state.speed_true, y: this.state.speed_true },
                            { x: this.state.speed_false, y: this.state.speed_false },
                        ]} />
                         <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                height={50}
                                data={[ { name: 'Normalny', symbol: { fill: '#2CD889', }, },  { name: 'Szybki test', symbol: { fill: '#7EE8B8', }, }, ]}
                            />
                    </View>
                    <View style={ styles.viewBad }>
                        <Text style={ styles.plainText }>Badania</Text>
                        <View style={ styles.badanieList }>
                            {
                                Object.entries(this.state.test).map(item => (
                                    <Text>{ item[0] }: { item[1] }</Text>
                                ))
                            }
                        </View>
                        <Text style={ styles.plainText }>Oddziały</Text>
                        <View style={ styles.oddzialList }>
                        {
                            Object.entries(this.state.oddzial).map(item => (
                                <Text> { item[0] }: {item[1]} </Text>
                            ))
                        }
                        </View>
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
    },
    viewBad: {
        width: '80%'
    },
    badanieList: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 3,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#f2c1b7",
        color: "#20232a",
    },
    mainText: {
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 20
    },
    plainText: {
        paddingLeft: 20,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '600'
    },
    justText: {
        fontSize: 15,
    },
    oddzialList: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 3,
        borderColor: "#20232a",
        borderRadius: 6,
        color: "#20232a",
        backgroundColor: '#f3e2d1',
    }
})