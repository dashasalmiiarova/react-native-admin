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
        badanieCount: 0,
        count: 0,
        odzial: [],
    }
    componentDidMount(){
        let data = [];
        let diagnoz = []
        let badanie = []
        let badanieName =[]
        let odzial = []
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
               odzial.push(item.odzial)
               badanieName.push(badanieName.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
               diagnoz.push(diagnoz.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
               odzial.push(odzial.reduce((map, val) => { map[val] = (map[val] || 0) + 1; return map }, {} ))
            })
    
            this.setState({ diagnoz: diagnoz[diagnoz.length - 1]  })
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
            this.setState({ odzial: odzial[odzial.length - 1] })
            this.setState({ badanieCount: badanieName[badanieName.length - 1] })
        })
    }

    render(){
        let r = Object.keys(this.state.badanieCount).reduce((o,c,i) => {o[c] = o[c] ? o[c] + ", " + Object.values(this.state.badanieCount)[i]:Object.values(this.state.badanieCount)[i]; return o;}, {})
        delete r["[object Object]"];
        delete r[""],
        delete this.state.diagnoz["[object Object]"];
        delete this.state.odzial["[object Object]"];
        const data = {
            mens: [{ x: this.state.date_u[0], y: this.state.men }],
            woman: [{ x: this.state.date_u[0], y: this.state.woman }],
            first: [{ x:"Pierwszy raz", y: this.state.first_time_true },
                    { x:"Kolejny raz", y: this.state.first_time_false }],
            stac: [{ x: "Stacjonarnie", y:this.state.sp_stac }],
            tel: [{ x: "Telefonicznie", y: this.state.sp_phone }],
            home: [{ x: "Zdalnie", y: this.state.sp_home }],
        }
       
        return(
            <ScrollView >
                <View style={styles.container}>
                    <Text style={ styles.mainText }>Ostatnie raporty</Text>
                    <View>
                        <Text style={ styles.plainText }>Plec</Text>
                        <VictoryChart  width={350}  theme={VictoryTheme.material}>
                            <VictoryAxis label="Data" style={{ axisLabel: {  padding: 30, fontSize: 14, fontWeight: '600' } }} />
                            <VictoryAxis dependentAxis label="Ilość" style={{ axisLabel: {  padding: 35, fontSize: 14, fontWeight: '600' } }}  />
                            <VictoryGroup offset={1} >
                                <VictoryBar alignment="start" data={data.mens} style={{ data: { fill: '#15386a', } }} />
                                <VictoryBar alignment="end" data={data.woman} style={{ data: { fill: '#f2c1b7', } }} />
                            </VictoryGroup>
                            <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                data={[ { name: 'Kobiety', symbol: { fill: '#f2c1b7', }, }, { name: 'Mężczyźni', symbol: { fill: '#15386a', }, },  ]}
                            />
                        </VictoryChart>
                    </View>
                    <View>
                        <Text style={ styles.plainText }>Skąd pacjent</Text>
                        <VictoryPie width={350} height={350}
                            labelComponent={<VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 20, fill: "white" }}
                            />}
                            style={{ labelComponent: { fontSize: 20, fill: "white" } }}
                            innerRadius={68} labelRadius={100}
                            colorScale={["#7EE8B8", "#2CD889" ]}
                            data={[
                                { x: this.state.placeCity, y: this.state.placeCity },
                                { x: this.state.placeVillage, y: this.state.placeVillage },
                        ]} />
                         <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                height={50}
                                data={[ { name: 'Wieś', symbol: { fill: '#2CD889', }, }, { name: 'Miasto', symbol: { fill: '#7EE8B8', }, },   ]}
                            />
                    </View>
                    <View>
                        <Text style={ styles.plainText }>Pierwszy raz</Text>
                        <VictoryPie width={350} height={350}
                        labelComponent={<VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 20, fill: "white" }}
                            />}
                            style={{ labelComponent: { fontSize: 20, fill: "white" } }}
                            innerRadius={68} labelRadius={100}
                            colorScale={["#eeaf93", "#96a980" ]}
                         data={[
                            { x: this.state.first_time_true, y: this.state.first_time_true },
                            { x: this.state.first_time_false, y: this.state.first_time_false },
                        ]} />
                         <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                height={50}
                                data={[ { name: 'Kolejny raz', symbol: { fill: '#96a980', }, }, { name: 'Pierwszy raz', symbol: { fill: '#eeaf93', }, },  ]}
                            />
                    </View>
                    <View style={ styles.viewBad } >
                        <Text style={ styles.plainText }>Badania</Text>
                            <View style={ styles.badanieList }>
                                <Text style={ styles.justText }>Skierowano na badanie: { this.state.badanie_true }</Text>
                                {Object.entries(r).map(item => (
                                    <Text style={ styles.justText }> { item[0] }: { item[1] } </Text>
                                ))}
                            </View>
                    </View>
                    
                    <View>
                        <Text style={ styles.plainText }>Kontakt</Text>
                        <VictoryChart  width={350}  theme={VictoryTheme.material}>
                            <VictoryAxis label="Sposób" style={{ axisLabel: {  padding: 30, fontSize: 14, fontWeight: '600', display: 'none' } }} />
                            <VictoryAxis dependentAxis label="Ilość" style={{ axisLabel: {  padding: 35, fontSize: 14, fontWeight: '600' } }}  />
                            <VictoryGroup offset={1} >
                                <VictoryBar alignment="start" data={data.tel} style={{ data: { fill: '#8d7cf6', } }} />
                                <VictoryBar alignment="start" data={data.stac} style={{ data: { fill: '#7357cc', } }} />
                                <VictoryBar alignment="start" data={data.home} style={{ data: { fill: '#8994e5', } }} />
                            </VictoryGroup>
                        </VictoryChart>
                    </View>
                    <View>
                        <Text style={ styles.plainText }>Hospitalizacja</Text>
                        <VictoryPie width={350} height={350}
                            colorScale={["#2ec4b6", "#cbf3f0" ]}
                            data={[
                                { x: this.state.hospital_second, y:this.state.hospital_second },
                                { x: this.state.hospital_false, y: this.state.hospital_false },
                        ]} />
                         <VictoryLegend 
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                height={50}
                                data={[ { name: 'Nie skierowano', symbol: { fill: '#cbf3f0', }, }, { name: 'Skierowanoe', symbol: { fill: '#2ec4b6', }, }, ]}
                            />
                    </View>
                    <View style={ styles.viewBad }>
                        <Text style={ styles.plainText }>Diagnozy</Text>
                        <View style={ styles.diagnozList }>
                            {
                                Object.entries(this.state.diagnoz).map(item => (
                                    <Text style={ styles.justText }>{ item[0] }: { item[1] }</Text>
                                ))
                            }
                        </View>
                        <Text style={ styles.plainText }>Ilość pacjętów</Text>
                        <View style={ styles.oddzialList }>
                        {
                            Object.entries(this.state.odzial).map(item => (
                                <Text style={ styles.justText }> { item[0] }: {item[1]} </Text>
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
        alignItems: 'center',
        backgroundColor: '#F0FAF8',
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
        backgroundColor: "white",
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
        marginBottom: 5,
    },
    diagnozList: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 3,
        borderColor: "#20232a",
        borderRadius: 6,
        color: "#20232a",
        backgroundColor: '#ffddce',
    },
    oddzialList: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 3,
        borderColor: "#20232a",
        borderRadius: 6,
        color: "#20232a",
        backgroundColor: '#f3e2d1',
    },
})