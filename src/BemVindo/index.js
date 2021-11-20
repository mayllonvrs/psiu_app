import React, { Component } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default class BemVindo extends Component{

    constructor(props){
        super(props)
        this.state = { 
            morador: this.props.route.params?.response.morador,
            navigation: this.props.navigation
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.bemVindo}>
                    BEM VINDO {"\n"}AO PSIU!
                </Text>
                <ScrollView >
                    <Text style={styles.text}>
                    
                    O PSIU busca incentivar a escuta da comunidade para colaborar no desenvolvimento de políticas públicas habitacionais, assim como no fluxo e troca de informações que venham a fortalecer projetos sobre habitação de interesse social a partir da ocupação urbana planejada. Acreditamos que é por meio da participação colaborativa da população com a aproximação virtual, devido à pandemia do Covid-19, que podemos flexibilizar a participação social para tomadas de decisões nas políticas públicas habitacionais.
                    {"\n"}{"\n"}Este aplicativo parte de um planejamento que culmina na promoção de um evento, contribuindo para a construção da leitura territorial na medida em que as etapas são desenvolvidas e submetidas à população, como forma de construção coletiva, para os planos urbanísticos e modelagens com a contribuição dos desejos e demandas trazidas pelo cidadão sobre o território

                    </Text>
                    <Pressable 
                        style={styles.button} 
                        onPress={() => this.state.navigation.navigate('Home', {morador: this.state.morador})}
                        >
                        <Text style={styles.textButton}>Avançar</Text>
                    </Pressable>
                </ScrollView>
            </View>
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
        height: 40,
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
      },
      bemVindo:{
          fontSize: 50,
      }
  });