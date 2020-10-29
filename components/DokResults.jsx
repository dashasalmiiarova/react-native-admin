import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { db } from '../firebase';
import { VictoryGroup, VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryLegend, VictoryPie, VictoryLabel } from 'victory-native';

export default class DokResults extends React.Component{
    state = {
        dok: [],
        badanieName: {},
        diagnoz: {},
        date_u: {},
        men: 0,
        age: {},
        woman: 0,
        badanie_false: 0,
        badanie_true: 0,
        hospital_false: 0,
        hospital_second: 0,
        placeCity: 0,
        placeVillage: 0,
        sp_stac: 0,
        sp_home: 0,
        sp_phone: 0,
        first_time_true: 0,
        first_time_false: 0,
        count: 0,
    }
    componentDidMount(){
        let data = [];
        let diagnoz = []
        let badanie = []
        let badanieName =[]
        let first = []
        let hospital = []
        let place =[]
        let plec = []
        let spotkanie =[]
        let age = []
        let date_u = []
        let men = 0
        let woman = 0
        let badanie_false = 0
        let badanie_true = 0
        let hospital_false = 0
        let hospital_second = 0
        let undefined_t = 0
        let placeCity = 0
        let placeVillage = 0
        let sp_stac = 0
        let sp_home = 0
        let sp_phone = 0
        let first_time_true = 0
        let first_time_false = 0

        db.ref('dok').once('value').then((snapshot) => {
        
            snapshot.forEach(snap => {
                data.push(snap.val());
                this.setState({ count: data.length })
            });
            
            data = data[0];
            // console.log("Data:", data);
            data.map(item => {
                item.badanie === false ? badanie_false++ : item.badanie === true ? badanie_true++ : undefined_t++
                item.plec === 'Mężczyzna' ? men++ : item.plec === 'Kobieta' ? woman++ : undefined_t++
                item.hospital === false ? hospital_false++ : item.hospital === true ? hospital_second++ : undefined_t++
                item.place === 'Miasto' ? placeCity++ : item.place === 'Wieś' ? placeVillage++ : undefined_t++
                item.spotkanie === "Stacjonarie" ? sp_stac++ : item.spotkanie === "Telefonicznie" ? sp_phone++ : item.spotkanie === "Zdalnie" ? sp_home++ : undefined_t
                item.first === false ? first_time_false++ : item.first === true ? first_time_true++ : undefined_t++
               badanie.push(item.badanie)
               badanieName.push(item.badanieName)
               diagnoz.push(item.diagnoz)
               first.push(item.first)
               hospital.push(item.hospital)
               place.push(item.place)
               plec.push(item.plec)
               spotkanie.push(item.spotkanie)
               date_u.push(item.date_u)
               age.push(item.age)
            })

            this.setState({ diagnoz: diagnoz })
            // this.setState({ age: age })
            this.setState({ badanie: badanie })
            this.setState({ badanieName: badanieName })
            this.setState({ first: first })
            this.setState({ hospital: hospital })
            this.setState({ place: place })
            this.setState({ plec: plec })
            this.setState({ spotkanie: spotkanie })
            this.setState({ date_u: date_u })
            this.setState({ badanie_false: badanie_false })
            this.setState({ badanie_true: badanie_true })
            this.setState({ men: men })
            this.setState({ woman: woman })
            this.setState({ hospital_false: hospital_false })
            this.setState({ hospital_second: hospital_second })
            this.setState({ placeCity: placeCity })
            this.setState({ placeVillage: placeVillage })
            this.setState({ sp_stac: sp_stac })
            this.setState({ sp_phone: sp_phone })
            this.setState({ sp_home: sp_home })
            this.setState({ first_time_false: first_time_false })
            this.setState({ first_time_true: first_time_true })
        })
    }
    render(){
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
                        <Text>Pierwszy raz</Text>
                        <VictoryPie width={350}
                        labelComponent={<VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 20, fill: "white" }}
                            />}
                            style={{ labelComponent: { fontSize: 20, fill: "white" } }}
                            innerRadius={68} labelRadius={100}
                         data={[
                            { x: this.state.first_time_true, y: this.state.first_time_true },
                            { x: this.state.first_time_false, y: this.state.first_time_false },
                        ]} />
                         <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                data={[ { name: 'Pierwszy raz', symbol: { fill: 'blue', }, }, { name: 'Kolejny raz', symbol: { fill: 'orange', }, },  ]}
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