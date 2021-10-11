import React, { Component } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Image, Modal, Alert } from "react-native";
import Item from "./Item"
import { Icon } from "react-native-elements/dist/icons/Icon";


var height = Dimensions.get('window').height;

export default class Proposta extends Component{
    constructor(props){
        super(props)
        this.state = {
            numItems: 8, 
            modalVisible: false,
            morador: this.props.route.params?.morador,
            itens: [
                {id: 2, nome: "Ginásio", image: "https://i.ibb.co/9Txq98W/ginasio.png", pontos: 45, descricao: "O Ginásio Lorem ipsum Dolor Sit amet"},
                {id: 4, nome: "Parquinho", image: "https://i.ibb.co/YjKyxQ8/parquinho.png", pontos: 35, descricao: "O parquinho Lorem ipsum Dolor Sit amet"},
                {id: 5, nome: "Creche", image: "https://i.ibb.co/K91JDxc/creche.png", pontos: 40, descricao: "A Creche anderia Lorem ipsum Dolor Sit amet"},
                {id: 6, nome: "Lavanderia", image: "https://i.ibb.co/grPy7m0/elemento-1.png", pontos: 20, descricao: "A Lavanderia Lorem ipsum Dolor Sit amet"},
            ],
            data: [],
            nextItem: 0,
            pontosProjeto: this.props.route.params?.morador.comunidade.projetos[0].pontuacao,
            pontosUtilizados: 0
        }
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
                    <View style={styles.showRemoveIcon}>
                        <Icon style={styles.buttonRemove}
                            name='times'
                            type='font-awesome'
                            color='firebrick'
                            onPress={() => this.removeItem(item)}
                        />
                    </View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.image,
                        }}
                    />
                    <Text style={styles.itemHead}>{item.nome}</Text>
                    <Text style={styles.text}> {item.pontos} pontos</Text>
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
                <Text style={styles.pointsModal}> {item.pontos} pontos</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
                <Text style={styles.headerModal}> {item.nome}</Text>
                <Text style={styles.text}>{item.descricao}</Text>
            </>
        )
    }

    render(){
        const { modalVisible } = this.state;
        return(
            <SafeAreaView style={styles.tabuleiro}>
                <View>
                    <Text style={styles.header}>Pontos disponíveis: {this.state.pontosProjeto - this.state.pontosUtilizados}</Text>
                </View>
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
                            <Text style={styles.modalText}>Selecione um item</Text>
                            <FlatList
                                data={this.state.itens}
                                keyExtractor={item => item.id}
                                numColumns={1}
                                renderItem={({ item }) => {
                                    if(!this.state.data.find( i => i.id === item.id )){
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
                    <View style={styles.actionAdd}>
                        <Icon style={styles.buttonAdd}
                            reverse
                            name='plus'
                            type='font-awesome'
                            color='cornflowerblue'
                            onPress={() => this.setModalVisible(true)}
                        />
                        <Text>Adicionar item</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    tabuleiro: {
        backgroundColor: 'darkseagreen',
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
        borderColor: 'darkolivegreen',
        borderWidth: 1,
        height: height / 4.5

      },
      itemHead: {
          fontWeight: "bold"
      },
    itemModal: {
        alignItems: "center",
        margin: 4,
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,

      },
      headerModal: {
          fontWeight: "bold",
          fontSize: 15,
      },
      pointsModal:{
        marginBottom: -10,
        alignSelf: "flex-end",
        fontSize: 12
      },
      text: {
        color: "#333333"
      },
      actionAdd: {
          alignItems: "center",
          marginBottom: 40,
      },
      header: {
        paddingTop: 15,
        paddingLeft: 25,
        fontWeight: "bold",
        fontSize: 16
      },
      image: {
        width: height / 6,
        height: height / 6,
      },
      centeredView: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
      },
      modalView: {
        marginBottom: 50,
        marginTop: 140,
        backgroundColor: "white",
        borderRadius: 10,
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
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
      },
      buttonAdd: {
        backgroundColor: "blue",
        marginBottom: 20
      },
      buttonClose: {
        backgroundColor: "firebrick",
        marginTop: 5
      },
      showRemoveIcon: {
        alignSelf: "flex-end",
        marginHorizontal: 10,
        marginBottom: -30,
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