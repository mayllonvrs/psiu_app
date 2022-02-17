import React, { Component } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default class TipoCadastro extends Component{

    constructor(props){
        super(props)
        this.state = { 
          navigation: this.props.navigation
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.buttons} >
                <Pressable 
                    style={styles.button} 
                    onPress={() => this.state.navigation.navigate('Cadastro')}
                    >
                    <Text style={styles.textButton}>Cadastro Novo</Text>
                </Pressable>
                <Pressable 
                    style={styles.button} 
                    onPress={() => this.state.navigation.navigate('Cadastro', {cadastrado: true})}
                    >
                    <Text style={styles.textButton}>Já fiz o cadastro</Text>
                </Pressable>
              </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 25,
        elevation: 3,
        backgroundColor: '#F89D5B',
        width: 350,
        marginTop: 5,
        height: 60,
        alignSelf: "center"
    },
    textButton: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#4B615B',
      },
    text: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 30
      },
      container: {
        flex: 1,
          padding: 20,
          alignItems: "center",
          alignContent: "center"
      },
      buttons: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }
  });