import React, { Component } from "react";
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import RNPickerSelect from "react-native-picker-select";
import api from '../services/api';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Spinner from "react-native-loading-spinner-overlay";


var width = Dimensions.get('window').width;

class Morador extends Component{

    constructor(props){
        super(props)
        this.state = { 
            cpf: "",
            dateSelected: false,
            date: new Date(12312312323),
            mode: 'date',
            show: false,
            estado_civil: "",
            raca: "",
            bairro_comunidade: "",
            comunidades: [],
            morador: {},
            spinner: false
            
        }
        const { navigation } = this.props;
    }
    

    async componentDidMount(){
        this.setState({
            spinner: true
        })
        const response = await api.get('comunidades')
        this.setState({
          comunidades: response.data,
          spinner: false
        })
        
      }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show: Platform.OS === 'ios'})
        this.setState({date: currentDate})
        this.setState({dateSelected: true})
    };

    showMode = (currentMode) => {
        this.setState({show: true})
        this.setState({mode: currentMode})
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showDate = () => {
        if(this.state.dateSelected == true){
            return format(this.state.date, "dd/MM/yyyy");
        }else { return "Selecione a sua data de nascimento" } 
    }

    handleCpf = (text) => {
        this.setState({cpf: text})
    }

    onSend = () => {
        this.setState({spinner: true})
        var data = new FormData()
        data.append('cpf', this.state.cpf)
        data.append('estado_civil', this.state.estado_civil)
        data.append('data_nascimento', format(this.state.date, "yyyy-MM-dd"))
        data.append('raca', this.state.raca)
        data.append('bairro_comunidade', this.state.bairro_comunidade)

        const config = {
            headers: {
                'Content-Type': 'application/json'
              }
        };
          
        var self = this;
        const response = api.post(
            'morador', data
            , config
        ).then(
            response => this.setState({morador: response.data}))
        .then(() => this.props.navigation.navigate("BemVindo", {response: this.state.morador}))
        .catch(function(error) {
            ToastAndroid.showWithGravity(   
                "Não foi possível realizar o cadastro", 
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        })
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Text style={styles.labelInput} >CPF</Text>
                <View style={styles.input}>
                    <TextInput 
                        keyboardType = 'numeric'
                        placeholder = 'Digite seu CPF'
                        onChangeText = {this.handleCpf}
                    />
                </View>
                <Text style={styles.labelInput} onPress={this.showDatepicker}>Data de Nascimento</Text>
                <View style={[{flexDirection:"row", alignItems: "baseline"}, styles.input]}>
                    <View style={{flex:7}}>
                        <Text style={styles.inputText}>{ this.showDate() }</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Pressable style={styles.calendar} onPress={this.showDatepicker}>
                            <Icon
                                name='calendar-outline'
                                type='ionicon'
                            />
                        </Pressable>
                    </View>
                </View>
                {this.state.show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    display="default"
                    onChange={this.onChange}
                    />
                )}
                <Text style={styles.labelInput}>Estado Civil</Text>
                <View style={styles.input}>
                    <RNPickerSelect  
                        placeholder={{ label: "Selecione seu estado civil", value: null }}
                        onValueChange={(value) => this.setState({ estado_civil: value })}
                        items={[
                            { label: "Solteiro(a)", value: "Solteiro" },
                            { label: "Casado(a)", value: "Casado(a)" },
                            { label: "União Estável", value: "União Estável" },
                            { label: "Divorciado(a)", value: "Divorciado(a)" },
                            { label: "Viúvo(a)", value: "Viúvo(a)" },

                        ]}
                        style={{
                            inputAndroid: {
                            color: 'black'
                            },
                        }}
                    />
                </View>
                <Text style={styles.labelInput}>Raça</Text>
                <View style={styles.input}>
                    <RNPickerSelect 
                        placeholder={{ label: "Selecione sua raça", value: null }}
                        onValueChange={(value) => this.setState({raca: value})}
                        items={[
                            { label: "Amarela", value: "Amarela" },
                            { label: "Branca", value: "Branca" },
                            { label: "Indígena", value: "Indígena" },
                            { label: "Parda", value: "Parda" },
                            { label: "Preta", value: "Preta" },
                        ]}
                        style={{
                            inputAndroid: {
                            color: 'black'
                            },
                        }}
                    />
                </View>
                <Text style={styles.labelInput}>Bairro / Comunidade</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        placeholder={{ label: "Selecione seu bairro ou comunidade", value: null }}
                        onValueChange={(value) => this.setState({bairro_comunidade: value})}
                        items={
                            this.state.comunidades.map((item) => ({label: item.name, value: item.id}))
                        }
                        style={{
                            inputAndroid: {
                            color: 'black'
                            },
                        }}
                    />
                </View>
                <Pressable style={styles.button} onPress={this.onSend}>
                    <Text style={styles.text}>Entrar</Text>
                </Pressable>
            </SafeAreaView>
        )
    }
}

export default Morador;

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container : {
        padding         : 15,
        flex            : 1,
        backgroundColor : "#fff",
        alignItems      : "flex-start",
        justifyContent  : "space-evenly",
        width           : width,
    },
    labelInput:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    inputText:{
        fontSize: 15,
        color: "silver" 
    },
    input:{
        borderColor: "lightgray",
        borderWidth: 1,
        width: width*0.9,
        height: 50,
        borderRadius: 20,
        paddingLeft:10,
        paddingTop: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        elevation: 3,
        backgroundColor: '#F89D5B',
        width: width*0.90,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#435256',
      },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
      },
      inputContainer: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
});