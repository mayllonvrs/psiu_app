import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import api from '../services/api';
import { Icon } from 'react-native-elements';

class Projetos extends Component{
  constructor(props){
    super(props)
    this.state = { 
      proposta: this.props.route.params?.response.morador.proposta,
      projetos: this.props.route.params?.response.morador.comunidade.projetos,
      morador: this.props.route.params?.response.morador,
      comunidade: this.props.route.params?.response.morador.comunidade,
      navigation: this.props.navigation,
    }
  } 

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getDataFromServer()
    });
  }

  setIcons(){
    this.state.projetos.map(function(projeto) {
      projeto.icon = 'radio-button-off'
    })
    if(this.state.proposta){
      let projetosComPropostas = []
      this.state.proposta.map(function(proposta) {
          projetosComPropostas.push(proposta.projeto_id)
      })
      this.state.projetos.map(function(projeto) {
          if(projetosComPropostas.indexOf(projeto.id) >= 0){
            projeto.icon = 'checkmark-circle-outline'
          }
      })
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getDataFromServer(){
    this.setState({
      spinner: true
    })
    
    const response = await api.get('morador/'+this.state.morador.id)
    this.setState({
      morador: response.data,
      comunidade: response.data.comunidade,
      proposta: response.data.proposta,
      spinner: false
    })
  }

  render(){
    {this.setIcons()}
    return(
      <SafeAreaView style={styles.container}>
        <Spinner
            visible={this.state.spinner}
            textContent={'Carregando...'}
            textStyle={styles.spinnerTextStyle}
        />
          <Text style={styles.title}>
            Selecione um ambiente
          </Text>
          <FlatList style={styles.list}
            data={this.state.projetos}
            keyExtractor={item => item.id.toString()}
            renderItem={
              ({item}) => 
              <TouchableOpacity
                style={styles.item}
                onPress={() => this.state.navigation.navigate("Home", { morador: this.state.morador, 
                                                                        projeto: item, 
                                                                        comunidade: this.state.comunidade,
                                                                        proposta: this.state.proposta
                })}
              >
                  <Text style={styles.itemText}>
                      {item.nome_projeto}
                  </Text>
                  <Icon
                    style={styles.icon}
                    name= {item.icon}
                    type='ionicon'
                    color='#4B615B'
                    size={30}
                  />
              </TouchableOpacity>
            }
          />
      </SafeAreaView>
    )
  }


}

export default Projetos;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#F89D5B',
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
    elevation: 3,
    marginBottom: 20,
    paddingVertical: 25,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemText: {
    fontSize: 18,
    color: '#4B615B',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    color: '#4B615B',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  list:{
    margin: 15
  },
  icon: {
    alignSelf: 'flex-end',
  }
});
