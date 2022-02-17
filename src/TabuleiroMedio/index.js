import React, { Component } from "react";
import { Alert, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../services/api";
import uri from "../services/server";

var height = Dimensions.get('window').height;

export default class Proposta extends Component{

    constructor(props){
        super(props)
        this.state = {
            itens: [],
            morador: this.props.route.params?.morador,
            projeto: this.props.route.params?.projeto,
            pontosProjeto: this.props.route.params?.projeto.pontuacao,
            spinner: false
        }
    }

    mapItens(itens){
        return itens.map(function(item){
            return {
                nome: item.item_nome, 
                image: uri+"/../storage/app/public/item/"+item.imagem, 
                pontos: item.pontuacao_item, 
                descricao: item.description,
                quantidade: item.quantidade,
            }
        })
    }
    
    async componentDidMount(){
        this.setState({
            spinner: true
          })
        try{
            const response = await api.get('tabuleiro/'+this.state.projeto.id)
            this.setState({
                itens: this.mapItens(response.data),
                spinner: false
            })
        }catch(e){
            this.props.navigation.goBack()
          }finally{
            this.setState({
              spinner: false
            })
          }
    }

    setItem = (item) => {
        if(item.nome != ""){
            return(
                <>
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.image,
                        }}
                    />
                    <Text style={styles.itemHead}>{item.nome}</Text>
                    <Text style={styles.text}> {item.quantidade} votos</Text>
                </>
            )
        }else{
            return(
                <View>
                        
                </View>
            )
        }
    }
    
    render(){
        return(
            <SafeAreaView style={styles.tabuleiro}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <FlatList
                    data={this.state.itens}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                        <View style={styles.item}>
                            {this.setItem(item)}
                        </View>
                        );
                    }}
                    />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
      }, 
    tabuleiro: {
        backgroundColor: '#F5FCFA',
        flex: 2,
        padding: 10,
    },
    itens: {
        flex: 10,
        padding: 10,
        
    },
    item: {
        alignItems: "center",
        flexGrow: 1,
        margin: 4,
        padding: 0,
        flexBasis: 0,
        borderRadius: 15,
        height: height / 4.5,
        backgroundColor: '#F5FCFA',
        elevation: 3

      },
      image: {
        width: height / 6,
        height: height / 6,
      },
})