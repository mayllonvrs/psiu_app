import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";



var height = Dimensions.get('window').height;

export default class Item extends Component{

    constructor(props){
        super(props)
        this.state = { 
          item: this.props.item
        }
    }

    selectItem(item){
        console.log(item)
    }

    render(){
        if(this.props.item.item_id != 0){
            return(
                <>
                    <Text style={styles.reader}> pontos</Text>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "item.image",
                        }}
                    />
                    <Text style={styles.text}>nome</Text>
                </>
            )
        }else{
            return(
                <View style={styles.item}>
                        <Icon
                            reverse
                            name='plus'
                            type='font-awesome'
                            color='gray'
                            onPress={() => this.selectItem(this.state.item)} 
                        />
                        <Text style={styles.text}>Adicione um item</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    
      text: {
        color: "#333333"
      },
      header: {
        paddingTop: 15,
        paddingLeft: 25
      },
      image: {
        width: height / 6,
        height: height / 6,
      },
      item: {
          flex: 1,
          alignItems: 'center', 
          alignContent: 'flex-end',
          paddingTop: 40
      }
})