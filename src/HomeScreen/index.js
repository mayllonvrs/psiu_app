import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';

export default class Home extends Component{


  constructor(props){
    super(props)
    this.state = { 
      morador: this.props.route.params?.response.morador,
      navigation: this.props.navigation
      
    }
}

    render(){
      return (
        <>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Comunidade</Text>
            <Text tyle={styles.text}> {this.state.morador.comunidade.name} </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Projeto</Text>
            <Text tyle={styles.text}> {this.state.morador.comunidade.projetos[0]?.nome_projeto} </Text>
          </View>
          <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable 
              style={styles.button} 
              onPress={() => this.state.navigation.navigate('Proposta', {morador: this.state.morador})}
            >
              <Text style={styles.text}>Cadastrar minha proposta</Text>
            </Pressable>
            <Pressable 
              style={styles.button} 
              onPress={() => this.state.navigation.navigate('Informes')}
            >
              <Text style={styles.text}>Consultar tabuleiro médio</Text>
            </Pressable>
            <Pressable 
              style={styles.button} 
              onPress={() => this.state.navigation.navigate('Informes')}
            >
              <Text style={styles.text}>Consultar andamento das obras</Text>
            </Pressable>
            <Pressable 
              style={styles.button} 
              onPress={() => this.state.navigation.navigate('Informes')}
            >
              <Text style={styles.text}>Informes</Text>
            </Pressable>
          </View>
        </>
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      width: 350,
      marginTop: 10,
      height: 80,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  });