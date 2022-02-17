import React, { Component } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default class Consentimento extends Component{

    constructor(props){
        super(props)
        this.state = { 
          navigation: this.props.navigation
        }
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.text}>
                
                Concordo com a concessão de dados pessoais para obter acesso ao aplicativo PSIU – Planejamento Social para Intervenções Urbanas – desenvolvido pela Agência Recife para Inovação e Estratégia (ARIES) em parceria com o Cesar School. Sei que poderei contatar/consultar a instituição a qualquer momento pelo endereço eletrônico contato@aries.org.br .

                {"\n"}{"\n"}Todos os dados pessoais informados serão tratados de acordo com os princípios previstos na Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e não serão utilizados para outras finalidades.
                {"\n"}{"\n"}O preenchimento de inscrição para acesso ao aplicativo é voluntário. Ao preenchê-lo e enviá-lo, você consente com o tratamento de seus dados pessoais pela ARIES, Núcleo de Gestão do Porto Digital e Cesar School para as finalidades acima.

                </Text>
                <Pressable 
                    style={styles.button} 
                    onPress={() => this.state.navigation.navigate('TipoCadastro')}
                    >
                    <Text style={styles.textButton}>Aceito o termo</Text>
                </Pressable>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 50,
        borderRadius: 25,
        elevation: 3,
        backgroundColor: '#F89D5B',
        width: 350,
        marginTop: 10,
        height: 60,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#4B615B',
      },
    text: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 30
      },
      container:{
          padding: 20,
      }
  });