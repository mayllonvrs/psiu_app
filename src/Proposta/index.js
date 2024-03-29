import React, { Component } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Image, Modal, Alert, ToastAndroid } from "react-native";
import Item from "./Item"
import { Icon } from "react-native-elements/dist/icons/Icon";
import api from "../services/api";
import uri from "../services/server";
import Spinner from "react-native-loading-spinner-overlay";


var height = Dimensions.get('window').height;

export default class Proposta extends Component{
    constructor(props){
        super(props)
        this.state = {
            proposta: this.props.route.params?.proposta,
            numItems: 8, 
            modalVisible: false,
            morador: this.props.route.params?.morador,
            itens: [],
            data: [],
            nextItem: 0,
            projeto: this.props.route.params?.projeto,
            propostaExists: this.props.route.params?.propostaExists,
            pontosProjeto: this.props.route.params?.projeto.pontuacao,
            pontosUtilizados: 0,
            spinner: false
        }


        if(this.state.propostaExists){
            const itens = this.mapItens(this.state.proposta.itens)
            for (let i = 0; i < itens.length; i++) {
                this.state.data.push(itens[i])
            }
        }
    }

    mapItens(itens){
        return itens.map(function(item){
            return {
                id: item.id, 
                nome: item.item_nome, 
                image: uri+"/../storage/app/public/item/"+item.imagem, 
                pontos: item.pivot.pontuacao_item, 
                descricao: item.description
            }
        })
    }

    async componentDidMount(){
        this.setState({
            spinner: true
        })
        const response = await api.get('itens/'+this.state.projeto.id)
        this.setState({
            itens: this.mapItens(response.data),
            spinner: false
        })
    }

    insertItem(item){
        if(this.state.pontosUtilizados + item.pontos > this.state.pontosProjeto){
            Alert.alert("Pontos insuficientes", "Para inserir este item, primeiro exclua um outro.")
        }else{
            this.state.data.push(item)
            this.setState({pontosUtilizados: this.state.pontosUtilizados + item.pontos})
            this.setModalVisible(false)
        }
    }

    removeItem(item){
        var items = this.state.data
        for (let i = 0; i < items.length; i++) {
            if(items[i].id == item.id){
                items.splice(i, 1)
                this.setState({pontosUtilizados: this.state.pontosUtilizados - item.pontos})
            }
            
        }
        this.setState({data: items})
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }



    setItem = (item) => {
        if(item.nome != ""){
            return(
                <>
                    {
                        !this.state.propostaExists
                        &&
                        <View style={styles.showRemoveIcon}>
                            <Icon style={styles.buttonRemove}
                                name='times'
                                type='font-awesome'
                                color='firebrick'
                                onPress={() => this.removeItem(item)}
                            />
                        </View>
                    }
                    <Image
                        style={styles.imageTable}
                        source={{
                            uri: item.image,
                        }}
                    />
                    <Text style={styles.itemHead}>{item.nome}</Text>
                </>
            )
        }else{
            return(
                <View>
                        
                </View>
            )
        }
    }

    modalItem = (item) => {
        
        return(
            <>
                <View style={styles.modalTop}>
                    <Text style={styles.headerModal}> {item.nome.toUpperCase()}</Text>
                    <Text style={styles.pointsModal}> {item.pontos} PONTOS</Text>
                </View>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
                
                <Text style={styles.text}>{item.descricao}</Text>
            </>
        )
    }

    onSend = () => {
        const numItens = this.state.data.length
        if(numItens > 0){
            this.setState({
                spinner: true
            })
            var itens = ""
            this.state.data.forEach(function(item, i) {
                itens += item.id
                if(numItens - 1 > i)
                    itens += ","
            })
    
            var body = new FormData()
            body.append('morador_id', this.state.morador.id)
            body.append('projeto_id', this.state.projeto.id)
            body.append('itens', itens)
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                  }
            };
            
            var self = this;
            const response = api.post(
                'proposta', body
                , config
            )
            .then(() => Alert.alert("Proposta enviada", "O cadastro da sua proposta foi realizado com sucesso"))
            .then(() => {
                this.props.navigation.navigate("Projetos")
            })
            .catch(function(error) {
                console.log(error.message)
            })
        }else{
            Alert.alert("Por favor, selecione pelo menos um item.")
        }
    }

    render(){
        const { modalVisible } = this.state;
        const showConfirmDialog = () => {
            return Alert.alert(
              "Enviar Proposta",
              "Deseja fechar e enviar sua proposta?\n\nNão será possivel alterar a proposta após o envio.",
              [
                  {
                    text: " Cancelar",
                  },
                {
                  text: "Enviar ",
                  onPress: () => {
                    this.onSend();
                  },
                },
              ]
            );
          };

        return(
            <SafeAreaView style={styles.tabuleiro}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Carregando...'}
                    textStyle={styles.spinnerTextStyle}
                />
                {
                    !this.state.propostaExists
                    &&
                    <View>
                        <Text style={styles.header}>Pontos disponíveis: {this.state.pontosProjeto - this.state.pontosUtilizados}</Text>
                    </View>
                }
                <View style={styles.itens}>
                <FlatList
                    data={this.state.data}
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
                </View>
                <View style={styles.centeredView}>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Você não selecionou um item");
                        this.setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>ESCOLHA UM ITEM</Text>
                            <FlatList
                                data={this.state.itens}
                                keyExtractor={item => item.id.toString()}
                                numColumns={1}
                                renderItem={({ item }) => {
                                    if(!this.state.data.find( i => i.id === item.id)){
                                        return (
                                        <Pressable 
                                            style={styles.itemModal}
                                            onPress={() => this.insertItem(item)}
                                        >
                                            {this.modalItem(item)}
                                        </Pressable>
                                        );
                                    }
                                }}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                    </Modal>
                    {
                        !this.state.propostaExists
                        &&
                        <View style={styles.buttons}>
                            <View style={styles.actionAdd}>
                                <Icon style={styles.buttonAdd}
                                    reverse
                                    name='plus'
                                    type='font-awesome'
                                    color='#F89D5B'
                                    onPress={() => this.setModalVisible(true)}
                                />
                                <Text>Adicionar item</Text>
                            </View>
                            <View style={styles.actionAdd}>
                                <Icon style={styles.buttonAdd}
                                    reverse
                                    name='check'
                                    type='font-awesome'
                                    color='#F89D5B'
                                    onPress={() => showConfirmDialog()}
                                />
                                <Text>Enviar proposta</Text>
                            </View>
                        </View>
                    }
                </View>
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
        flex: 2
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
        height: height / 4.2,
        backgroundColor: '#F5FCFA',
        elevation: 3,
        marginTop: 10
      },
      itemHead: {
          fontWeight: "bold"
      },
      modalTop: {
        flex: 1,
        alignSelf: "flex-start",
    },
    itemModal: {
        alignItems: "center",
        margin: 4,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'white',
        elevation: 1
      },
      headerModal: {
          fontWeight: "bold",
          fontSize: 15,
          color: '#707070'
      },
      pointsModal:{
        marginBottom: -10,
        fontSize: 12,
        color: '#707070'
      },
      text: {
        color: "#333333"
      },
      actionAdd: {
          alignItems: "center",
          marginBottom: 40,
          flex: 1,
          color: '#4B615B'
      },
      header: {
        paddingTop: 15,
        paddingLeft: 25,
        fontWeight: "bold",
        fontSize: 16
      },
      image: {
        width: height / 3,
        height: height / 3,
        marginTop: 10
      },
      imageTable: {
        width: height / 6,
        height: height / 6,
        marginTop: 8
      },
      centeredView: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
      },
      modalView: {
        marginBottom: 50,
        marginTop: 140,
        backgroundColor: "#EFEFEF",
        borderRadius: 30,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 20,
          height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300
      },
      buttons: {
        flexDirection: "row",
        alignContent: 'stretch'
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
      },
      buttonAdd: {
        backgroundColor: "#F89D5B",
        marginBottom: 20,
        flex: 1
      },
      buttonClose: {
        backgroundColor: "firebrick",
        marginTop: 5
      },
      showRemoveIcon: {
        alignSelf: "flex-end",
        marginHorizontal: 10,
        marginBottom: -12,
        marginTop: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})