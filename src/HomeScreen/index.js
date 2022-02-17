import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import api from '../services/api';
import minha_proposta from '../../assets/minha_proposta.png'
import andamento_projeto from '../../assets/andamento_projeto.png'
import avisos from '../../assets/avisos.png'
import tabuleiro_medio from '../../assets/tabuleiro_medio.png'

var screenWidth = Dimensions.get('window').width;

export default class Home extends Component{

  constructor(props){
    super(props)
    this.state = { 
      morador: this.props.route.params?.morador,
      projeto: this.props.route.params?.projeto,
      proposta: this.props.route.params?.proposta,
      navigation: this.props.navigation,
      propostaExists: false
    }
    if(this.state.proposta != undefined){
      this.state.proposta.forEach(element => {
        if(element.projeto_id === this.state.projeto.id){
          this.state.propostaExists = true
          this.state.proposta = element
        }
      });
    }
  }


  render(){
    const textoProposta = this.state.propostaExists ? "Visualizar minha Proposta" : "Cadastar minha Proposta"
    const BUTTONS = [
      {
          id: 1,
          title: textoProposta,
          image: minha_proposta,
          link: 'Proposta',
          params: {morador: this.state.morador, projeto: this.state.projeto, propostaExists: this.state.propostaExists, proposta: this.state.proposta}
      },
      {
          id: 2,
          title: 'Escolhas da Comunidade',
          image: tabuleiro_medio,
          link: 'TabuleiroMedio',
          params: {morador: this.state.morador, projeto: this.state.projeto}
      },
      {
          id: 3,
          title: 'Andamento do Projeto',
          image: andamento_projeto,
          link: 'Andamento',
          params: {projeto: this.state.projeto.id}
      },
      {
          id: 4,
          title: 'Avisos',
          image: avisos,
          link: 'Informes',
          params: {projeto: this.state.projeto.id}
      },
    ];
    return (
      <>
          <View style={styles.headerItem}>
            <Text style={styles.title}> {this.state.projeto.nome_projeto} </Text>
          </View>
        <View style={styles.menu}>
          <FlatList
            data={BUTTONS}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <Pressable 
                  style={styles.button} 
                  onPress={() => this.state.navigation.navigate(item.link, item.params)}
                >
                  <View style={styles.roundImage} >
                    <Image style={styles.image} source={item.image} />
                  </View>
                  <Text style={styles.text}>{item.title}</Text>
                </Pressable>
              );
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#5E7771',
    borderBottomWidth: 1,
    width: screenWidth*0.9,
    alignSelf: 'center'
  },
  menu: { 
    flex: 6, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  headerItem: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    width: screenWidth/2.2,
    margin: 5,
    width: screenWidth/2.2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#5E7771',
    textAlign: 'center',
    marginTop: 5
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5E7771',
    textAlign: 'center'
  },
  image: {
    flex: 1,
    width: screenWidth/3.5,
    resizeMode: 'contain',
  },
  roundImage: {
    backgroundColor: 'white',
    height: screenWidth/2.3,
    width: screenWidth/2.3,
    alignItems: 'center',
    borderRadius: 300,
    elevation: 10

  }
});